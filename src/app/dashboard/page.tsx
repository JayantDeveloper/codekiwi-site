import { auth } from "../../auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "../../lib/signout";

function initials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    const i = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
    return i.toUpperCase() || "U";
  }
  return (email?.[0] ?? "U").toUpperCase();
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/signin");

  // Example static data (replace with your real “presentations” later)
  const presentations = [
    {
      id: "1",
      title: "Introduction to JavaScript",
      lastModified: "2 days ago",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "2",
      title: "Python Basics",
      lastModified: "1 week ago",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "3",
      title: "HTML & CSS Fundamentals",
      lastModified: "3 days ago",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "4",
      title: "Data Structures",
      lastModified: "Yesterday",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "5",
      title: "Algorithms Workshop",
      lastModified: "4 days ago",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
    {
      id: "6",
      title: "React for Beginners",
      lastModified: "2 weeks ago",
      thumbnail: "/placeholder.svg?height=150&width=250",
    },
  ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-[#d6c49f]/30 bg-white px-4">
          <h1 className="text-xl font-semibold text-[#6b8f2b]">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/launch-session" target="_blank">
              <Button className="flex items-center gap-2 bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md">
                <Plus className="h-4 w-4" />
                Launch Session
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 rounded-full p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt={session.user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-[#a8d05f]/20 text-[#6b8f2b]">
                      {initials(session.user.name, session.user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-[#d6c49f]/30">
                <DropdownMenuItem asChild>
                  <Link href="/settings">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={signOutAction}>
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full text-left">
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="w-full px-4 sm:px-8 md:px-12 py-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-[#6b8f2b]">
              My Presentations
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
            >
              Sort by
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {presentations.map((p) => (
              <div
                key={p.id}
                className="group overflow-hidden rounded-xl border border-[#d6c49f]/30 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="aspect-video overflow-hidden bg-[#cfc6b8]/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.thumbnail || "/placeholder.svg"}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#6b8f2b]">{p.title}</h3>
                  <p className="text-sm text-[#6b8f2b]/70">
                    Modified {p.lastModified}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#d6c49f]/30 text-[#6b8f2b] hover:bg-[#a8d05f]/10 bg-transparent"
                    >
                      Edit
                    </Button>
                    <Link href="/launch-session" target="_blank">
                      <Button
                        size="sm"
                        className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white"
                      >
                        Launch
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

/**
 * Tiny server action to sign out.
 * Create file: src/lib/signout.ts
 */
