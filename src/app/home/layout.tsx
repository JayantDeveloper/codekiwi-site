import { getServerSession } from "@/auth";
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
import { Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/lib/signout";

function initials(name?: string | null, email?: string | null) {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    const i = (parts[0]?.[0] ?? "") + (parts[parts.length - 1]?.[0] ?? "");
    return i.toUpperCase() || "U";
  }
  return (email?.[0] ?? "U").toUpperCase();
}

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) redirect("/signin");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gradient-to-b from-[#f8faf5] via-white to-[#f8faf5]">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b-2 border-[#6b8f2b]/20 bg-gradient-to-r from-[#a8d05f]/10 to-[#a8d05f]/5 px-4 shadow-sm backdrop-blur-sm">
          <div />
          <div className="flex items-center gap-4">
            <Link href="/launch-session">
              <Button className="flex items-center gap-2 bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-md">
                <Plus className="h-4 w-4" />
                Launch Session
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 rounded-full p-0 hover:bg-[#a8d05f]/20"
                >
                  <Avatar className="h-8 w-8 ring-2 ring-[#a8d05f]/30">
                    <AvatarImage
                      src={session.user.image ?? undefined}
                      alt={session.user.name ?? "User"}
                    />
                    <AvatarFallback className="bg-[#6b8f2b] text-white">
                      {initials(session.user.name, session.user.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-[#6b8f2b]/30 bg-white"
              >
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#a8d05f]/20 focus:bg-[#a8d05f]/20 text-[#6b8f2b]"
                >
                  <Link href="/home/settings">Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="hover:bg-[#a8d05f]/20 focus:bg-[#a8d05f]/20 text-[#6b8f2b]"
                >
                  <Link href="/home/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#6b8f2b]/20" />
                <form action={signOutAction}>
                  <DropdownMenuItem
                    asChild
                    className="hover:bg-[#a8d05f]/20 focus:bg-[#a8d05f]/20 text-[#6b8f2b]"
                  >
                    <button type="submit" className="w-full text-left">
                      Sign Out
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
