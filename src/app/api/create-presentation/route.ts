import { NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";

// Your template presentation ID
const TEMPLATE_PRESENTATION_ID = "1qrNle2kJBQvIIx92gBQ6qBTGENJ_gtWwx4Xjr19XdL4";

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

    const copiedFile = await drive.files.copy({
      fileId: TEMPLATE_PRESENTATION_ID,
      requestBody: {
        name: `CodeKiwi Session - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      },
      fields: "id, name, webViewLink",
    });

    const presentationId = copiedFile.data.id;

    if (!presentationId) {
      throw new Error("Failed to copy presentation - no ID returned");
    }

    const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

    return NextResponse.json({
      presentationId,
      presentationUrl,
      title: copiedFile.data.name,
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
