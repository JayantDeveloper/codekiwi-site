"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MarketplaceBadge } from "@/components/MarketplaceBadge";

const NAV_LINKS = [
  { href: "/features", label: "Features", hide: "sm" },
  { href: "/pricing", label: "Pricing", hide: "sm" },
  { href: "/docs", label: "Docs", hide: "md" },
] as const;

export function SiteHeader({
  variant = "light",
}: {
  /** "light" (default) is the flat cream bar the whole site now uses.
   *  "brand" is the original green gradient bar, kept for anything that still
   *  wants it. */
  variant?: "brand" | "light";
} = {}) {
  const pathname = usePathname();
  const light = variant === "light";

  return (
    <header
      className={
        light
          ? "sticky top-0 z-50 w-full border-b border-[#1E2A14]/10 bg-[#FBF7EC]"
          : "w-full bg-gradient-to-r from-[#6b8f2b] via-[#7da332] to-[#8fb73a] sticky top-0 z-50 shadow-lg"
      }
    >
      <div className="flex h-16 items-center py-4 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-1 items-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span
              className={`text-2xl font-bold ${light ? "text-[#1E2A14]" : "text-white"}`}
            >
              CodeKiwi
            </span>
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
                  light
                    ? active
                      ? "text-[#1E2A14] underline underline-offset-8 decoration-2"
                      : "text-[#55604A] hover:text-[#1E2A14]"
                    : active
                      ? "text-white underline underline-offset-8 decoration-2"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <MarketplaceBadge height={28} className="hidden lg:inline-block" />
          {/* Kept visible at every width: this is the booth QR code's
              destination and the site's only lead capture. */}
          <Link href="/demo">
            <Button
              size="sm"
              className={
                light
                  ? "rounded-full bg-[#2F4A1C] text-white transition-colors duration-300 hover:bg-[#243915]"
                  : "rounded-full bg-white text-[#2F4A1C] transition-colors duration-300 hover:bg-[#E7F2D4]"
              }
            >
              Contact
            </Button>
          </Link>
          <Link href="/signin">
            <Button
              variant="outline"
              size="sm"
              className={
                light
                  ? "rounded-full border-[#1E2A14]/25 bg-transparent text-[#1E2A14] transition-all duration-300 hover:bg-[#2F4A1C] hover:text-white"
                  : "text-white border-white/80 hover:bg-white hover:text-[#6b8f2b] bg-transparent transition-all duration-300"
              }
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
