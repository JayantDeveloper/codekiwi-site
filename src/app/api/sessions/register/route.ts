import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const secret = process.env.CODEKIWI_BACKEND_SECRET;
  if (secret && req.headers.get("x-codekiwi-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionCode, teacherEmail, presentationId, title } = await req.json();
  if (!sessionCode || !teacherEmail) {
    return NextResponse.json({ error: "Missing sessionCode or teacherEmail" }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: teacherEmail },
    select: { id: true },
  });

  if (!dbUser) {
    // Teacher has no site account — skip silently
    return NextResponse.json({ success: true, registered: false });
  }

  // Avoid duplicate if the same session was somehow already registered
  const existing = await prisma.session.findUnique({ where: { sessionCode } });
  if (existing) {
    return NextResponse.json({ success: true, registered: false });
  }

  await prisma.session.create({
    data: {
      userId: dbUser.id,
      sessionCode,
      title: title || "CodeKiwi Session",
      presentationId: presentationId ?? null,
    },
  });

  return NextResponse.json({ success: true, registered: true });
}
