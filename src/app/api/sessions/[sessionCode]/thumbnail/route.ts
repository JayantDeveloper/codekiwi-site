import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ensureSessionThumbnail } from "@/lib/thumbnails";

// Owner-gated slide-1 image for a session card on /home. Lazily backfills
// from the app backend for sessions registered before thumbnails were stored.
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionCode: string }> }
) {
  const { sessionCode } = await params;
  const session = await getServerSession();
  const email = session?.user?.email;
  if (!email) return new NextResponse(null, { status: 401 });

  const dbUser = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  const record = await prisma.session.findUnique({
    where: { sessionCode },
    select: { id: true, userId: true },
  });
  if (!dbUser || !record || record.userId !== dbUser.id) {
    return new NextResponse(null, { status: 404 });
  }

  const thumb = await ensureSessionThumbnail(record.id, sessionCode);
  if (!thumb) return new NextResponse(null, { status: 404 });

  return new NextResponse(new Uint8Array(thumb.data), {
    headers: {
      "Content-Type": thumb.mime,
      "Cache-Control": "private, max-age=86400",
    },
  });
}
