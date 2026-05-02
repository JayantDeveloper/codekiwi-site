import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";

// #6b8f2b in 0–1 RGB
const GREEN = { red: 0.42, green: 0.561, blue: 0.169 };
const WHITE = { red: 1, green: 1, blue: 1 };

export async function POST() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = session.accessToken as string | undefined;

    if (!accessToken) {
      return NextResponse.json(
        { error: "No Google access token. Please sign out and sign back in with Google." },
        { status: 403 }
      );
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    const title = `CodeKiwi Session - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    const createdFile = await drive.files.create({
      requestBody: {
        name: title,
        mimeType: "application/vnd.google-apps.presentation",
      },
      fields: "id, name, webViewLink",
    });

    const presentationId = createdFile.data.id;

    if (!presentationId) {
      throw new Error("Failed to create presentation - no ID returned");
    }

    const slidesApi = google.slides({ version: "v1", auth });
    const pres = await slidesApi.presentations.get({ presentationId });
    const firstSlide = pres.data.slides?.[0];

    const titleShape = firstSlide?.pageElements?.find(
      (el) =>
        el.shape?.placeholder?.type === "CENTERED_TITLE" ||
        el.shape?.placeholder?.type === "TITLE"
    );
    const bodyShape = firstSlide?.pageElements?.find(
      (el) =>
        el.shape?.placeholder?.type === "BODY" ||
        el.shape?.placeholder?.type === "SUBTITLE"
    );

    // Speaker notes shape lives on the notes page
    const notesShape = firstSlide?.slideProperties?.notesPage?.pageElements?.find(
      (el) => el.shape?.placeholder?.type === "BODY"
    );

    if (!firstSlide?.objectId || !titleShape?.objectId || !bodyShape?.objectId) {
      throw new Error("Could not locate slide shapes");
    }

    const slideId = firstSlide.objectId;
    const titleId = titleShape.objectId;
    const bodyId = bodyShape.objectId;

    const requests: object[] = [
      // Green background
      {
        updatePageProperties: {
          objectId: slideId,
          pageProperties: {
            pageBackgroundFill: {
              solidFill: { color: { rgbColor: GREEN } },
            },
          },
          fields: "pageBackgroundFill",
        },
      },

      // Title text
      { insertText: { objectId: titleId, text: "Welcome to CodeKiwi!", insertionIndex: 0 } },
      {
        updateTextStyle: {
          objectId: titleId,
          textRange: { type: "ALL" },
          style: {
            foregroundColor: { opaqueColor: { rgbColor: WHITE } },
            fontFamily: "Google Sans",
            fontSize: { magnitude: 40, unit: "PT" },
            bold: true,
          },
          fields: "foregroundColor,fontFamily,fontSize,bold",
        },
      },
      {
        updateParagraphStyle: {
          objectId: titleId,
          textRange: { type: "ALL" },
          style: { alignment: "CENTER" },
          fields: "alignment",
        },
      },

      // Body text (concise so it fits)
      {
        insertText: {
          objectId: bodyId,
          text: "1. Add your lesson slides below this one\n2. To mark a coding slide: open Speaker Notes and type \"Code Question:\" at the very top\n3. Install the CodeKiwi add-on → click Start Lesson to go live",
          insertionIndex: 0,
        },
      },
      {
        updateTextStyle: {
          objectId: bodyId,
          textRange: { type: "ALL" },
          style: {
            foregroundColor: { opaqueColor: { rgbColor: WHITE } },
            fontFamily: "Google Sans",
            fontSize: { magnitude: 18, unit: "PT" },
          },
          fields: "foregroundColor,fontFamily,fontSize",
        },
      },
      {
        updateParagraphStyle: {
          objectId: bodyId,
          textRange: { type: "ALL" },
          style: { alignment: "CENTER" },
          fields: "alignment",
        },
      },
    ];

    // Speaker notes
    if (notesShape?.objectId) {
      requests.push({
        insertText: {
          objectId: notesShape.objectId,
          text: "Template slide — no coding question here.\n\nTo add a coding exercise to any other slide, type \"Code Question:\" at the very top of that slide's Speaker Notes. Students will see a live code editor alongside the slide.",
          insertionIndex: 0,
        },
      });
    }

    await slidesApi.presentations.batchUpdate({
      presentationId,
      requestBody: { requests },
    });

    const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

    return NextResponse.json({
      presentationId,
      presentationUrl,
      title: createdFile.data.name,
    });
  } catch (error) {
    const err = error as GaxiosError;
    console.error("create-presentation error:", err.message);

    return NextResponse.json(
      {
        error: "Failed to create presentation",
        details: err.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
