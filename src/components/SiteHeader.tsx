"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/features", label: "Features", hide: "sm" },
  { href: "/pricing", label: "Pricing", hide: "sm" },
  { href: "/docs", label: "Docs", hide: "md" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-gradient-to-r from-[#6b8f2b] via-[#7da332] to-[#8fb73a] sticky top-0 z-50 shadow-lg">
      <div className="flex h-16 items-center py-4 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-1 items-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-white">CodeKiwi</span>
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {NAV_LINKS.map(({ href, label, hide }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  hide === "md" ? "hidden md:inline" : "hidden sm:inline"
                } ${
                  active
                    ? "text-white underline underline-offset-8 decoration-2"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link href="/signin">
            <Button
              variant="outline"
              size="sm"
              className="text-white border-white/80 hover:bg-white hover:text-[#6b8f2b] bg-transparent transition-all duration-300"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
