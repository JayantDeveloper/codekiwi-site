import { prisma } from "@/lib/prisma";

const BACKEND_URL =
  process.env.CODEKIWI_BACKEND_URL || "https://codekiwi-app-backend.onrender.com";

// The backend tells the site when a session ends (explicit End, or the 30-min
// abandoned sweep), but that notify is best-effort: a Render restart or a
// dropped request leaves the site record "Active" forever, with Rejoin dead and
// the gradebook unreachable. Before rendering the home grid, ask the backend
// about every record still open and close the ones it no longer considers live.
// Backend down or slow → leave the record alone (never mark ended on a guess).
export async function reconcileOpenSessions<T extends { id: string; sessionCode: string; endedAt: Date | null }>(
  sessions: T[]
): Promise<T[]> {
  const open = sessions.filter((s) => !s.endedAt);
  if (open.length === 0) return sessions;

  const closed = new Set<string>();
  await Promise.all(
    open.map(async (s) => {
      try {
        const r = await fetch(`${BACKEND_URL}/api/sessions/${encodeURIComponent(s.sessionCode)}/exists`, {
          signal: AbortSignal.timeout(4_000),
          cache: "no-store",
        });
        if (!r.ok) return;
        const { active } = (await r.json()) as { exists?: boolean; active?: boolean };
        if (active === false) closed.add(s.id);
      } catch {
        /* backend unreachable: keep as-is */
      }
    })
  );
  if (closed.size === 0) return sessions;

  const endedAt = new Date();
  await prisma.session.updateMany({
    where: { id: { in: [...closed] }, endedAt: null },
    data: { endedAt },
  });
  return sessions.map((s) => (closed.has(s.id) ? { ...s, endedAt } : s));
}
