import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SessionsPage() {
  const auth = await getServerSession();
  if (!auth?.user?.email) redirect("/signin");

  const dbUser = await prisma.user.findUnique({
    where: { email: auth.user.email },
    select: { id: true },
  });

  const sessions = dbUser
    ? await prisma.session.findMany({
        where: { userId: dbUser.id },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#d6c49f]/30 bg-white px-4">
          <h1 className="text-xl font-semibold text-[#6b8f2b]">Sessions</h1>
        </header>
        <main className="w-full px-4 sm:px-8 md:px-12 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#6b8f2b]">Past Sessions</h2>
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-xl border border-[#d6c49f]/30 p-12 text-center shadow-sm">
              <p className="text-[#6b8f2b]/60 text-sm mb-4">No sessions yet.</p>
              <Link
                href="/launch-session"
                className="inline-flex items-center gap-2 rounded-lg bg-[#6b8f2b] px-4 py-2 text-sm text-white hover:bg-[#6b8f2b]/90 transition-colors"
              >
                Launch your first session
              </Link>
            </div>
          ) : (
            <div className="rounded-xl border border-[#d6c49f]/30 overflow-hidden shadow-sm">
              <div className="grid grid-cols-5 border-b border-[#d6c49f]/30 bg-[#cfc6b8]/10 p-4 font-medium text-[#6b8f2b]">
                <div className="col-span-2">Title</div>
                <div>Date</div>
                <div>Session Code</div>
                <div>Status</div>
              </div>
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="grid grid-cols-5 border-b border-[#d6c49f]/30 p-4 last:border-0 text-[#6b8f2b]/80"
                >
                  <div className="col-span-2 font-medium text-[#6b8f2b] truncate pr-4">
                    {session.title}
                  </div>
                  <div className="text-sm">
                    {session.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div className="font-mono text-xs text-[#6b8f2b]/60">
                    {session.sessionCode}
                  </div>
                  <div>
                    <span className="inline-flex rounded-full bg-[#a8d05f]/20 px-2 py-1 text-xs font-medium text-[#6b8f2b]">
                      Completed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
