import Link from "next/link";
import { LayoutDashboard, Settings, Presentation } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      isActive: true,
    },
    {
      title: "Sessions",
      icon: Presentation,
      href: "/dashboard/sessions",
      isActive: false,
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      isActive: false,
    },
  ];

  return (
    <Sidebar className="border-r border-[#d6c49f]/30 bg-white">
      <SidebarHeader className="h-16 border-b border-[#d6c49f]/30">
        <div className="flex h-full items-center px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <span className="text-xl">🥝</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={item.isActive}
                className="text-[#6b8f2b] hover:bg-[#a8d05f]/10 hover:text-[#6b8f2b] data-[active=true]:bg-[#a8d05f]/20 data-[active=true]:text-[#6b8f2b]"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-3">
        <div className="p-4 text-xs text-[#6b8f2b]/70">
          <p>© 2024 CodeKiwi</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
