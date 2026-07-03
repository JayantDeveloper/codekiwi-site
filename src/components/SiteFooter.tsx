import Link from "next/link";
import Image from "next/image";
import { GoogleTrademarkNotice } from "@/components/GoogleTrademarkNotice";

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={`border-t border-[#d6c49f]/30 py-8 bg-white${className ? ` ${className}` : ""}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi Logo"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-[#6b8f2b]/70 text-center md:text-left">
            © 2025 CodeKiwi. All rights reserved.
            <br />
            <GoogleTrademarkNotice className="text-xs text-[#6b8f2b]/60" />
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
              Privacy
            </Link>
            <Link href="/support" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
