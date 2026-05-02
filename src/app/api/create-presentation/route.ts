import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";

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

    // Populate the default blank slide with CodeKiwi template content
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

    const requests: object[] = [];
    if (titleShape?.objectId) {
      requests.push({
        insertText: {
          objectId: titleShape.objectId,
          text: "Welcome to CodeKiwi!",
          insertionIndex: 0,
        },
      });
    }
    if (bodyShape?.objectId) {
      requests.push({
        insertText: {
          objectId: bodyShape.objectId,
          text: 'How to use this template:\n1. Replace this slide with your lesson content\n2. In Speaker Notes, add "Code Question:" at the top to mark a slide as a live coding exercise\n3. Open the CodeKiwi add-on in Google Slides and click Start Lesson',
          insertionIndex: 0,
        },
      });
    }
    if (requests.length > 0) {
      await slidesApi.presentations.batchUpdate({
        presentationId,
        requestBody: { requests },
      });
    }

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
