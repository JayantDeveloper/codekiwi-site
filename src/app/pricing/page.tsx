import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Pricing — CodeKiwi",
  description: "Simple, transparent pricing for CodeKiwi",
};

const features = [
  "Unlimited coding sessions",
  "Google Slides integration",
  "Real-time student monitoring",
  "Live code execution",
  "Session history",
  "Priority support",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf5]">
      <header className="border-b border-[#d6c49f]/30 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/features" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors">
              Features
            </Link>
            <Link href="/docs" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors">
              Docs
            </Link>
            <Link href="/signin">
              <Button size="sm" className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#6b8f2b] mb-4">Simple Pricing</h1>
          <p className="text-xl text-[#6b8f2b]/70 max-w-2xl mx-auto">
            CodeKiwi is free during our beta. No credit card required.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl border-2 border-[#6b8f2b] bg-white shadow-2xl p-8">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] text-white text-sm font-semibold px-4 py-1 rounded-full shadow">
                Free Beta
              </span>
            </div>

            <div className="text-center mb-8">
              <p className="text-5xl font-bold text-[#6b8f2b]">$0</p>
              <p className="text-[#6b8f2b]/60 mt-1">during beta · no card needed</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-[#6b8f2b]/80">
                  <Check className="h-5 w-5 text-[#6b8f2b] flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/signup">
              <Button className="w-full bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white text-base py-5">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-[#6b8f2b]/50 mt-10">
          Paid plans with advanced analytics and team management coming soon.{" "}
          <Link href="mailto:jaymaheshwari2603@gmail.com" className="text-[#6b8f2b] hover:underline">
            Contact us
          </Link>{" "}
          for early access.
        </p>
      </main>

      <footer className="border-t border-[#d6c49f]/30 py-8 bg-white mt-16">
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
            <p className="text-sm text-[#6b8f2b]/70">© 2024 CodeKiwi. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Terms</Link>
              <Link href="/privacy" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Privacy</Link>
              <Link href="/support" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
