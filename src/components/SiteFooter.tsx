import Link from "next/link";
import Image from "next/image";
import { GoogleTrademarkNotice } from "@/components/GoogleTrademarkNotice";
import { MarketplaceBadge } from "@/components/MarketplaceBadge";

const LINKS = [
  { href: "/demo", label: "Book a demo" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/changelog", label: "What's new" },
  { href: "/support", label: "Contact" },
] as const;

/**
 * Site-wide footer. Matches LandingFooter so every page closes the same way.
 *
 * Layout note: brand, badge and links share the top row; the legal text gets a
 * full-width row of its own underneath. Previously all four sat in one
 * `justify-between` row, and the trademark notice is long enough that it ran
 * into the wordmark at common widths.
 */
export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={`bg-[#1C2317] py-10${className ? ` ${className}` : ""}`}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi logo"
              width={28}
              height={28}
              className="rounded-lg object-contain"
            />
            <span className="text-xl font-bold text-[#F7F3E6]">CodeKiwi</span>
          </div>

          <MarketplaceBadge height={32} />

          <nav className="flex flex-wrap justify-center gap-6">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-[#D8DCCC] transition-colors hover:text-white hover:underline"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/12" />

        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-sm text-[#D8DCCC]">
            © 2025 CodeKiwi. All rights reserved.
          </p>
          <GoogleTrademarkNotice className="mx-auto block max-w-4xl text-xs leading-relaxed text-white/55 md:mx-0" />
        </div>
      </div>
    </footer>
  );
}
