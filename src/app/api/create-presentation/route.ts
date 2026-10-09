import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";
import { buildBlankDeck, buildStarterDeck, slideRequests } from "@/lib/starterDeck";
import { STARTER_LANGUAGES, LANGUAGE_LABEL, type StarterLanguage } from "@/lib/starterExercises";

// ── route ─────────────────────────────────────────────────────────────────
// Creates a CodeKiwi deck in the teacher's Drive. Two kinds:
//   { kind: "blank" }        one getting-started slide; the teacher adds their own
//   { language: "python" }   the starter deck: title, eight exercise slides (each
//                            with auto-graded tests in its notes), closing slide
// The layout lives in src/lib/starterDeck.ts, shared with the local HTML preview.

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const accessToken = session.accessToken as string | undefined;
    if (!accessToken)
      return NextResponse.json(
        { error: "No Google access token. Please sign out and sign back in with Google." },
        { status: 403 }
      );

    let language: StarterLanguage = "python";
    let blank = false;
    try {
      const body = await req.json();
      blank = body?.kind === "blank";
      if (STARTER_LANGUAGES.includes(body?.language)) language = body.language;
    } catch {
      // no body: starter deck in the default language
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });
    const title = blank ? "Untitled CodeKiwi Lesson" : `CodeKiwi Starter: ${LANGUAGE_LABEL[language]} Warm-Ups`;
    const created = await drive.files.create({
      requestBody: { name: title, mimeType: "application/vnd.google-apps.presentation" },
      fields: "id, name",
    });

    const presentationId = created.data.id;
    if (!presentationId) throw new Error("Failed to create presentation — no ID returned");

    const slidesApi = google.slides({ version: "v1", auth });
    const deck = blank ? buildBlankDeck() : buildStarterDeck(language);

    // A new presentation has one title slide: remove it and add blank slides.
    const pres = await slidesApi.presentations.get({ presentationId });
    const firstId = pres.data.slides?.[0]?.objectId;
    const slideIds = deck.map((_, i) => `ck_s${i}`);
    await slidesApi.presentations.batchUpdate({
      presentationId,
      requestBody: {
        requests: [
          ...slideIds.map((objectId, i) => ({
            createSlide: { objectId, insertionIndex: i, slideLayoutReference: { predefinedLayout: "BLANK" } },
          })),
          ...(firstId ? [{ deleteObject: { objectId: firstId } }] : []),
        ],
      },
    });

    // Draw each slide (one request batch per slide keeps payloads small).
    for (let i = 0; i < deck.length; i++) {
      await slidesApi.presentations.batchUpdate({
        presentationId,
        requestBody: { requests: slideRequests(slideIds[i], deck[i]) },
      });
    }

    // Speaker notes: each slide's notes placeholder only exists once created.
    const built = await slidesApi.presentations.get({ presentationId });
    const noteRequests: object[] = [];
    built.data.slides?.forEach((slide) => {
      const i = slideIds.indexOf(slide.objectId || "");
      const notesId = slide.slideProperties?.notesPage?.pageElements?.find(
        (el) => el.shape?.placeholder?.type === "BODY"
      )?.objectId;
      if (i >= 0 && notesId) noteRequests.push({ insertText: { objectId: notesId, text: deck[i].notes, insertionIndex: 0 } });
    });
    if (noteRequests.length) {
      await slidesApi.presentations.batchUpdate({ presentationId, requestBody: { requests: noteRequests } });
    }

    return NextResponse.json({
      presentationId,
      presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
      title: created.data.name,
      ...(blank ? {} : { language }),
    });
  } catch (error) {
    const err = error as GaxiosError;
    console.error("create-presentation error:", err.message);
    return NextResponse.json(
      { error: "Failed to create presentation", details: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
