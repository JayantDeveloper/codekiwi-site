import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function SessionsPage() {
  // Sample sessions data
  const sessions = [
    {
      id: "1",
      title: "Introduction to JavaScript",
      date: "July 28, 2024",
      students: 24,
      status: "Completed",
    },
    {
      id: "2",
      title: "Python Basics",
      date: "July 25, 2024",
      students: 18,
      status: "Completed",
    },
    {
      id: "3",
      title: "HTML & CSS Fundamentals",
      date: "July 22, 2024",
      students: 21,
      status: "Completed",
    },
  ]

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
            <Button
              variant="outline"
              className="border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
            >
              Export Data
            </Button>
          </div>
          <div className="rounded-xl border border-[#d6c49f]/30 overflow-hidden shadow-sm">
            <div className="grid grid-cols-5 border-b border-[#d6c49f]/30 bg-[#cfc6b8]/10 p-4 font-medium text-[#6b8f2b]">
              <div className="col-span-2">Title</div>
              <div>Date</div>
              <div>Students</div>
              <div>Status</div>
            </div>
            {sessions.map((session) => (
              <div
                key={session.id}
                className="grid grid-cols-5 border-b border-[#d6c49f]/30 p-4 last:border-0 text-[#6b8f2b]/80"
              >
                <div className="col-span-2 font-medium text-[#6b8f2b]">{session.title}</div>
                <div>{session.date}</div>
                <div>{session.students}</div>
                <div>
                  <span className="inline-flex rounded-full bg-[#a8d05f]/20 px-2 py-1 text-xs font-medium text-[#6b8f2b]">
                    {session.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
