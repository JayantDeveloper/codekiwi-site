import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rejectUnlessBackend } from "@/lib/backendSecret";
import { ensureSessionThumbnail } from "@/lib/thumbnails";

export async function POST(req: NextRequest) {
  const rejected = rejectUnlessBackend(req);
  if (rejected) return rejected;

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

  const created = await prisma.session.create({
    data: {
      userId: dbUser.id,
      sessionCode,
      title: title || "CodeKiwi Session",
      presentationId: presentationId ?? null,
    },
  });

  // The add-on registers only after the backend upload succeeded, so slide 1
  // is already there. Best-effort: a missing thumbnail must not fail registration.
  try {
    await ensureSessionThumbnail(created.id, sessionCode);
  } catch (e) {
    console.warn("thumbnail capture failed:", sessionCode, (e as Error).message);
  }

  return NextResponse.json({ success: true, registered: true });
}
