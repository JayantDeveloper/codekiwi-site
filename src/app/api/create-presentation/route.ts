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
      console.error("No user email in session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accessToken = session.accessToken as string | undefined;

    if (!accessToken) {
      console.error("No access token found in session");
      return NextResponse.json(
        {
          error:
            "No Google access token found. Please sign out and sign in with Google again.",
        },
        { status: 403 }
      );
    }

    console.log(
      "Access token found (first 20 chars):",
      accessToken.substring(0, 20) + "..."
    );

    // Check what scopes this token has
    try {
      const tokenInfoResponse = await fetch(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
      const tokenInfo = await tokenInfoResponse.json();
      console.log("Token info:", tokenInfo);
      console.log("Scopes:", tokenInfo.scope);
    } catch (e) {
      console.log("Couldn't get token info");
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: accessToken });

    const drive = google.drive({ version: "v3", auth });

    // Try to list some files to see if Drive API works at all
    try {
      console.log("Testing Drive API access...");
      const filesList = await drive.files.list({
        pageSize: 5,
        fields: "files(id, name)",
      });
      console.log(
        "Drive API works! Found files:",
        filesList.data.files?.length
      );
    } catch (e) {
      const error = e as GaxiosError;
      console.error("Drive API test failed:", error.message);
      return NextResponse.json(
        {
          error: "Cannot access Google Drive",
          details:
            "Your access token doesn't have Drive permissions. Sign out completely and sign back in with Google.",
        },
        { status: 403 }
      );
    }

    // Now try to copy the template
    console.log(`Attempting to copy template: ${TEMPLATE_PRESENTATION_ID}`);

    const copiedFile = await drive.files.copy({
      fileId: TEMPLATE_PRESENTATION_ID,
      requestBody: {
        name: `CodeKiwi Session - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      },
      fields: "id, name, webViewLink",
      supportsAllDrives: true, // Try to access shared drives too
    });

    console.log("Copy successful:", copiedFile.data);

    const presentationId = copiedFile.data.id;

    if (!presentationId) {
      throw new Error("Failed to copy presentation - no ID returned");
    }

    const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

    console.log("Presentation created successfully:", presentationUrl);

    return NextResponse.json({
      presentationId,
      presentationUrl,
      title: copiedFile.data.name,
    });
  } catch (error) {
    const err = error as GaxiosError;
    console.error("Detailed error:", {
      message: err.message,
      code: err.code,
      errors: (err.response?.data as { errors?: unknown })?.errors,
    });

    return NextResponse.json(
      {
        error: "Failed to create presentation",
        details: err.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
