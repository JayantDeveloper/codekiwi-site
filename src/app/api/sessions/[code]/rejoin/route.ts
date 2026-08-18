import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";

// Hand an authenticated teacher back into a session they navigated away from.
// The live teacher token lives only in the app backend's memory (never in our
// DB), so we verify ownership here, then fetch the token from the backend and
// redirect into the live teacher view. If the session is no longer live (ended,
// or the backend restarted), we fall back to the gradebook / home.

const BACKEND_URL =
  process.env.CODEKIWI_BACKEND_URL || "https://codekiwi-app-backend.onrender.com";
const TEACHER_APP = "https://www.codekiwi.app";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const session = await getServerSession();
  if (!session?.user?.email) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  const dbSession = dbUser
    ? await prisma.session.findUnique({ where: { sessionCode: code } })
    : null;

  // Must exist and belong to this teacher.
  if (!dbUser || !dbSession || dbSession.userId !== dbUser.id) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  // Already ended → the gradebook is what they want, not a dead live view.
  if (dbSession.endedAt) {
    return NextResponse.redirect(new URL(`/home/sessions/${code}`, req.url));
  }

  // Fetch the live teacher token from the backend.
  try {
    const secret = process.env.CODEKIWI_BACKEND_SECRET;
    const r = await fetch(`${BACKEND_URL}/api/sessions/${code}/teacher-token`, {
      headers: secret ? { "x-codekiwi-secret": secret } : {},
      cache: "no-store",
    });
    if (r.ok) {
      const { teacherToken } = (await r.json()) as { teacherToken?: string };
      if (teacherToken) {
        const url = `${TEACHER_APP}/teacher/${code}?t=${encodeURIComponent(
          teacherToken
        )}&live=1`;
        return NextResponse.redirect(url);
      }
    }
  } catch {
    // fall through to the not-live redirect
  }

  // Backend says it's not live anymore (restarted or auto-finalized).
  return NextResponse.redirect(new URL(`/home?rejoin=notlive`, req.url));
}
