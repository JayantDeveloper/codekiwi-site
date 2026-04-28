import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });
  const drive = google.drive({ version: "v3", auth });

  const file = await drive.files.get({
    fileId: id,
    fields: "name,thumbnailLink,webViewLink",
  });

  return NextResponse.json({
    name: file.data.name,
    thumbnailLink: file.data.thumbnailLink,
    webViewLink: file.data.webViewLink,
  });
}
