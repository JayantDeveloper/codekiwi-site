import Link from "next/link";
import Image from "next/image";

export function LandingFooter() {
  return (
    <footer className="border-t-2 border-[#6b8f2b] py-12 bg-gradient-to-b from-[#6b8f2b] via-[#7da332] to-[#8fb73a]">
      <div className="flex flex-col items-center justify-between gap-6 md:flex-row px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-white">CodeKiwi</span>
          <Image
            src="https://www.codekiwi.app/codekiwilogo.png"
            alt="CodeKiwi Logo"
            width={28}
            height={28}
            className="object-contain"
          />
        </div>
        <p className="text-sm text-white/90 font-medium">
          © 2024 CodeKiwi. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link
            href="/terms#acceptable-use"
            className="text-sm text-white/90 hover:text-white transition-colors hover:underline font-medium"
          >
            Terms
          </Link>
          <Link
            href="/privacy#data-collection"
            className="text-sm text-white/90 hover:text-white transition-colors hover:underline font-medium"
          >
            Privacy
          </Link>
          <Link
            href="/support"
            className="text-sm text-white/90 hover:text-white transition-colors hover:underline font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
