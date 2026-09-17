import { prisma } from "@/lib/prisma";

const BACKEND_URL =
  process.env.CODEKIWI_BACKEND_URL || "https://codekiwi-app-backend.onrender.com";

// The app backend keeps every slide of a live session as PNGs under
// /slides/<code>/slide-N.png for 7 days after the session ends. Slide 1 is the
// thumbnail we want for the home grid.
const MAX_BYTES = 3 * 1024 * 1024;

export type Thumb = { data: Buffer; mime: string };

async function fetchBackendSlide(sessionCode: string): Promise<Thumb | null> {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(sessionCode)) return null;
  try {
    const r = await fetch(`${BACKEND_URL}/slides/${sessionCode}/slide-1.png`, {
      signal: AbortSignal.timeout(15_000),
    });
    if (!r.ok) return null;
    const mime = r.headers.get("content-type")?.split(";")[0].trim() || "";
    if (!mime.startsWith("image/")) return null;
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length === 0 || buf.length > MAX_BYTES) return null;
    return { data: buf, mime };
  } catch (e) {
    console.warn("thumbnail fetch failed:", sessionCode, (e as Error).message);
    return null;
  }
}

// Return the stored thumbnail for a session, fetching and persisting it from
// the backend the first time. Null when neither the DB nor the backend has it
// (older sessions whose slides were already cleaned up).
export async function ensureSessionThumbnail(sessionId: string, sessionCode: string): Promise<Thumb | null> {
  const stored = await prisma.session.findUnique({
    where: { id: sessionId },
    select: { thumbnail: true, thumbnailMime: true },
  });
  if (stored?.thumbnail && stored.thumbnailMime) {
    return { data: Buffer.from(stored.thumbnail), mime: stored.thumbnailMime };
  }
  const fetched = await fetchBackendSlide(sessionCode);
  if (!fetched) return null;
  await prisma.session.update({
    where: { id: sessionId },
    data: { thumbnail: fetched.data, thumbnailMime: fetched.mime },
  });
  return fetched;
}
