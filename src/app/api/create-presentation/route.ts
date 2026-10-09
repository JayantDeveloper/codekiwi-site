import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";
import { buildStarterDeck, slideRequests } from "@/lib/starterDeck";
import { STARTER_LANGUAGES, LANGUAGE_LABEL, type StarterLanguage } from "@/lib/starterExercises";

// ── route ─────────────────────────────────────────────────────────────────
// Creates the CodeKiwi starter deck in the teacher's Drive: a title slide,
// eight exercise slides (each with auto-graded tests in its speaker notes),
// and a closing slide, styled for the chosen language. The layout lives in
// src/lib/starterDeck.ts, shared with the local HTML preview.

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
    try {
      const body = await req.json();
      if (STARTER_LANGUAGES.includes(body?.language)) language = body.language;
    } catch {
      // no body: default language
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });
    const title = `CodeKiwi Starter: ${LANGUAGE_LABEL[language]} Warm-Ups`;
    const created = await drive.files.create({
      requestBody: { name: title, mimeType: "application/vnd.google-apps.presentation" },
      fields: "id, name",
    });

    const presentationId = created.data.id;
    if (!presentationId) throw new Error("Failed to create presentation — no ID returned");

    const slidesApi = google.slides({ version: "v1", auth });
    const deck = buildStarterDeck(language);

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
      language,
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
