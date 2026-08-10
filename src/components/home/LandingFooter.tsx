import Link from "next/link";
import Image from "next/image";
import { GoogleTrademarkNotice } from "@/components/GoogleTrademarkNotice";

export function LandingFooter() {
  return (
    <footer className="border-t-2 border-[#6b8f2b] bg-gradient-to-b from-[#6b8f2b] via-[#7da332] to-[#8fb73a] py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:px-8 md:px-12">
        {/* Brand + nav */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi logo"
              width={30}
              height={30}
              className="rounded-lg object-contain"
            />
            <span className="text-xl font-bold text-white">CodeKiwi</span>
          </div>
          <nav className="flex gap-8">
            <Link
              href="/terms#acceptable-use"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy#data-collection"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="/support"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white hover:underline"
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="border-t border-white/20" />

        {/* Legal — full width, room to breathe */}
        <div className="space-y-1.5 text-center md:text-left">
          <p className="text-sm font-medium text-white/90">
            © 2025 CodeKiwi. All rights reserved.
          </p>
          <GoogleTrademarkNotice className="block max-w-4xl text-xs font-normal leading-relaxed text-white/70 mx-auto md:mx-0" />
        </div>
      </div>
    </footer>
  );
}
