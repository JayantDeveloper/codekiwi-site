import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { google } from "googleapis";
import { GaxiosError } from "gaxios";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { presentationId, title } = await req.json();
  if (!presentationId) {
    return NextResponse.json({ error: "Missing presentationId" }, { status: 400 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });
  const drive = google.drive({ version: "v3", auth });

  let fileBase64: string;
  try {
    const exportRes = await drive.files.export(
      { fileId: presentationId, mimeType: "application/pdf" },
      { responseType: "arraybuffer" }
    );
    const raw = exportRes.data;
    const pdfBuffer = Buffer.isBuffer(raw) ? raw : Buffer.from(raw as ArrayBuffer);
    fileBase64 = pdfBuffer.toString("base64");
  } catch (e) {
    const err = e as GaxiosError;
    console.error("PDF export failed:", err.message);
    return NextResponse.json(
      { error: "Failed to export presentation as PDF", details: err.message },
      { status: 500 }
    );
  }

  const slidesUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;

  let backendData: { sessionCode?: string; [key: string]: unknown };
  try {
    const backendRes = await fetch(
      `${process.env.CODEKIWI_BACKEND_URL}/api/sessions/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-codekiwi-secret": process.env.CODEKIWI_BACKEND_SECRET!,
        },
        body: JSON.stringify({
          presentationId,
          title: title || "CodeKiwi Session",
          notes: [],
          slidesUrl,
          fileBase64,
        }),
      }
    );

    if (!backendRes.ok) {
      const text = await backendRes.text();
      console.error("Backend returned error:", backendRes.status, text);
      return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
    }

    backendData = await backendRes.json();
  } catch (e) {
    console.error("Backend unreachable:", (e as Error).message);
    return NextResponse.json(
      { error: "Session backend is unavailable. Please try again shortly." },
      { status: 503 }
    );
  }

  if (!backendData.sessionCode) {
    console.error("Backend upload missing sessionCode:", backendData);
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }

  const sessionCode = backendData.sessionCode as string;

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user!.email! },
    select: { id: true },
  });
  if (dbUser) {
    await prisma.session.create({
      data: {
        userId: dbUser.id,
        sessionCode,
        title: title || "CodeKiwi Session",
        presentationId: presentationId ?? null,
      },
    });
  }

  return NextResponse.json({ sessionCode });
}
