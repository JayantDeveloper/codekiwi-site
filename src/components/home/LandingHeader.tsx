import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="w-full bg-gradient-to-r from-[#6b8f2b] via-[#7da332] to-[#8fb73a] sticky top-0 z-50 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="flex h-16 items-center py-4 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-2xl font-bold text-white">CodeKiwi</span>
          <Image
            src="https://www.codekiwi.app/codekiwilogo.png"
            alt="CodeKiwi Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/features"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:inline"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:inline"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden md:inline"
          >
            Docs
          </Link>
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
