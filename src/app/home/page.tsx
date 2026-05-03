import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function fetchThumbnails(
  presentationIds: string[],
  accessToken: string
): Promise<Record<string, string>> {
  const results = await Promise.allSettled(
    presentationIds.map(async (id) => {
      const res = await fetch(
        `https://www.googleapis.com/drive/v3/files/${id}?fields=thumbnailLink`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!res.ok) return [id, null] as const;
      const data = await res.json();
      // Replace the small size token with a larger one
      const url: string | null = data.thumbnailLink
        ? (data.thumbnailLink as string).replace(/=s\d+$/, "=s800")
        : null;
      return [id, url] as const;
    })
  );
  const map: Record<string, string> = {};
  for (const r of results) {
    if (r.status === "fulfilled" && r.value[1]) {
      map[r.value[0]] = r.value[1];
    }
  }
  return map;
}

export default async function HomePage() {
  const session = await getServerSession();

  const dbUser = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
    : null;

  const sessions = dbUser
    ? await prisma.session.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const accessToken = session?.accessToken as string | undefined;
  const presentationIds = sessions
    .map((s) => s.presentationId)
    .filter((id): id is string => !!id);
  const thumbnails =
    accessToken && presentationIds.length > 0
      ? await fetchThumbnails(presentationIds, accessToken)
      : {};

  return (
    <main className="w-full px-4 sm:px-8 md:px-12 py-6 bg-gradient-to-b from-[#a8d05f]/5 to-[#f8faf5]">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#6b8f2b]">My Presentations</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 border-[#6b8f2b]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/20 bg-white"
        >
          Sort by
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sessions.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-[#6b8f2b] p-6 mb-4 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10" />
                <path d="M7 12h10" />
                <path d="M7 17h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#6b8f2b] mb-2">
              No presentations yet
            </h3>
            <p className="text-[#6b8f2b]/70 mb-6 max-w-md">
              Get started by launching your first coding session with Google Slides
            </p>
            <Link href="/launch-session" target="_blank">
              <Button className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                Launch Your First Session
              </Button>
            </Link>
          </div>
        ) : (
          sessions.map((s) => (
            <div
              key={s.id}
              className="group overflow-hidden rounded-xl border-2 border-[#a8d05f] bg-white shadow-md transition-all hover:shadow-xl hover:border-[#6b8f2b] hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div className="aspect-video relative overflow-hidden bg-[#f1f3f4]">
                {s.presentationId && thumbnails[s.presentationId] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnails[s.presentationId]}
                    alt={s.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="h-16 w-16 opacity-30" viewBox="0 0 48 48" fill="none">
                      <rect x="6" y="6" width="36" height="36" rx="3" fill="#FBBC04" />
                      <rect x="12" y="13" width="24" height="22" rx="1" fill="white" />
                      <rect x="16" y="17" width="16" height="2" rx="1" fill="#BDC1C6" />
                      <rect x="16" y="21" width="16" height="2" rx="1" fill="#BDC1C6" />
                      <rect x="16" y="25" width="10" height="2" rx="1" fill="#BDC1C6" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-0.5 truncate">{s.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {s.createdAt.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  {s.studentCount > 0 && ` · ${s.studentCount} student${s.studentCount === 1 ? "" : "s"}`}
                </p>
                <div className="flex items-center justify-between gap-2">
                  {s.presentationId ? (
                    <a
                      href={`https://docs.google.com/presentation/d/${s.presentationId}/edit`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[#6b8f2b]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/20 bg-white"
                      >
                        Open Slides
                      </Button>
                    </a>
                  ) : (
                    <div />
                  )}
                  <Link href="/launch-session" target="_blank">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white"
                    >
                      Launch Again
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
