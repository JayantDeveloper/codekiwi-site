import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, BookOpen, RefreshCw, FileSliders, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Support — CodeKiwi",
  description: "Get help with CodeKiwi. Contact us or browse common fixes.",
};

const commonFixes = [
  {
    icon: RefreshCw,
    title: "Add-on sidebar not loading",
    description: "Refresh the Google Slides page and reopen the CodeKiwi sidebar from Extensions → CodeKiwi.",
  },
  {
    icon: FileSliders,
    title: "Use a Google Slides file, not a PDF",
    description: "CodeKiwi syncs directly with Google Slides. Make sure your presentation is a .gslides file in your Drive.",
  },
  {
    icon: ShieldCheck,
    title: "Grant all requested permissions",
    description: "CodeKiwi needs access to your Google Slides presentations. Re-authorize in Extensions if you skipped any permission.",
  },
];

export default function SupportPage() {
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

      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#6b8f2b] mb-4">Support</h1>
          <p className="text-xl text-[#6b8f2b]/70">
            Need help? We&apos;re here for you.
          </p>
        </div>

        {/* Contact card */}
        <div className="rounded-2xl border-2 border-[#6b8f2b]/20 bg-white shadow-sm p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#6b8f2b]/10 flex items-center justify-center">
            <Mail className="w-7 h-7 text-[#6b8f2b]" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-[#6b8f2b] mb-1">Email us</h2>
            <p className="text-[#6b8f2b]/60 mb-3">
              We typically respond within 24 hours.
            </p>
            <a
              href="mailto:jaymaheshwari2603@gmail.com"
              className="inline-block text-[#6b8f2b] font-medium hover:underline"
            >
              jaymaheshwari2603@gmail.com
            </a>
          </div>
        </div>

        {/* Docs link */}
        <div className="rounded-2xl border-2 border-[#6b8f2b]/20 bg-white shadow-sm p-8 mb-12 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#6b8f2b]/10 flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-[#6b8f2b]" />
          </div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-xl font-semibold text-[#6b8f2b] mb-1">Browse the docs</h2>
            <p className="text-[#6b8f2b]/60 mb-3">
              Step-by-step guides for setting up sessions, using the add-on, and monitoring students.
            </p>
            <Link href="/docs">
              <Button variant="outline" size="sm" className="border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#6b8f2b]/5">
                View Documentation →
              </Button>
            </Link>
          </div>
        </div>

        {/* Common fixes */}
        <h2 className="text-2xl font-bold text-[#6b8f2b] mb-6">Common fixes</h2>
        <div className="space-y-4">
          {commonFixes.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-[#6b8f2b]/15 bg-white p-6 flex gap-4"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#6b8f2b]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#6b8f2b]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#6b8f2b] mb-1">{title}</h3>
                <p className="text-sm text-[#6b8f2b]/60">{description}</p>
              </div>
            </div>
          ))}
        </div>
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
