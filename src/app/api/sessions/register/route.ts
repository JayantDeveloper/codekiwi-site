import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rejectUnlessBackend } from "@/lib/backendSecret";
import { ensureSessionThumbnail } from "@/lib/thumbnails";

async function findOrCreateUser(email: string) {
  const found = await prisma.user.findFirst({
    where: { email: { equals: email, mode: "insensitive" } },
    select: { id: true },
  });
  if (found) return found;
  try {
    return await prisma.user.create({
      data: { email, settings: { create: {} } },
      select: { id: true },
    });
  } catch (e) {
    // Two registrations raced on the same new email: the other one created it.
    if ((e as { code?: string }).code !== "P2002") throw e;
    return prisma.user.findUniqueOrThrow({ where: { email }, select: { id: true } });
  }
}

export async function POST(req: NextRequest) {
  const rejected = rejectUnlessBackend(req);
  if (rejected) return rejected;

  const { sessionCode, teacherEmail, presentationId, title } = await req.json();
  if (!sessionCode || !teacherEmail) {
    return NextResponse.json({ error: "Missing sessionCode or teacherEmail" }, { status: 400 });
  }

  // The add-on sends the Google account email. A teacher who never signed up
  // on the site still gets their history: create the account now, keyed by
  // that email, and Google sign-in (which upserts by email) lands on it later.
  // No password is set, so only someone who can sign in as that Google
  // account can ever open it (see the signup route).
  const email = String(teacherEmail).trim().toLowerCase();
  const dbUser = await findOrCreateUser(email);

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
