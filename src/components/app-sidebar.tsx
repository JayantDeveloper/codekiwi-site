"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Sessions",
      icon: Presentation,
      href: "/dashboard/sessions",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  return (
    <Sidebar className="border-r-2 border-[#a8d05f]/30 bg-gradient-to-b from-[#6b8f2b] via-[#7da332] to-[#a8d05f] [&_[data-sidebar=sidebar]]:bg-transparent">
      <SidebarHeader className="h-16 border-b-2 border-[#a8d05f]/30">
        <div className="flex h-full items-center px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">CodeKiwi</span>
            <Image 
              src="https://www.codekiwi.app/codekiwilogo.png" 
              alt="CodeKiwi Logo" 
              width={32} 
              height={32}
              className="object-contain"
            />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="text-white hover:bg-white/20 hover:text-white data-[active=true]:bg-white/30 data-[active=true]:text-white"
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-3 border-t-2 border-[#a8d05f]/30">
        <div className="p-4 text-xs text-white/70">
          <p>© 2024 CodeKiwi</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}