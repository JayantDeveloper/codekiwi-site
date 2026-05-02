import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { presentationId, title, fileBase64 } = await req.json();
  if (!presentationId) {
    return NextResponse.json({ error: "Missing presentationId" }, { status: 400 });
  }
  if (!fileBase64) {
    return NextResponse.json({ error: "Missing presentation file data" }, { status: 400 });
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
