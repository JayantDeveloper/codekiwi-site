import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="flex h-16 items-center py-4 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-1 items-center gap-2">
          <span className="text-2xl font-bold text-[#6b8f2b]">CodeKiwi</span>
          <span className="text-2xl">🥝</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link
            href="/features"
            className="text-sm font-medium text-[#6b8f2b] hover:underline"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-[#6b8f2b] hover:underline"
          >
            Pricing
          </Link>
          <Link
            href="/docs"
            className="text-sm font-medium text-[#6b8f2b] hover:underline"
          >
            Docs
          </Link>
          <Link href="/signin">
            <Button
              variant="outline"
              size="sm"
              className="border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#6b8f2b]/10 bg-transparent"
            >
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-[#a8d05f]/10 to-white"></div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-12 py-16 text-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter text-[#6b8f2b] sm:text-5xl md:text-6xl">
                Teach coding with slides — live and interactive.
              </h1>
              <p className="mx-auto max-w-[700px] text-[#6b8f2b]/80 md:text-xl">
                Sync Google Slides with a live code editor. Monitor student
                progress in real-time and make coding lessons engaging.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md"
              >
                <a
                  href="/api/auth/signin/google?callbackUrl=/dashboard"
                  aria-label="Sign in with Google"
                >
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Sign in with Google
                </a>
              </Button>
              <Link href="/signin?method=email">
                <Button
                  variant="outline"
                  className="border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#6b8f2b]/10 shadow-sm bg-transparent"
                >
                  Sign in with CodeKiwi Account
                </Button>
              </Link>
            </div>

            <div className="mt-8 w-full max-w-4xl rounded-xl bg-white p-4 shadow-lg">
              <img
                src="/placeholder.svg?height=400&width=800"
                alt="CodeKiwi platform demonstration"
                className="w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#cfc6b8]/10">
          <div className="space-y-8 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-[#6b8f2b] sm:text-4xl">
                How it works
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[#6b8f2b]/80">
                CodeKiwi makes teaching coding simple and interactive
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-[#d6c49f]/30 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#a8d05f]/20 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#6b8f2b]"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#6b8f2b]">
                  Create Slides
                </h3>
                <p className="text-center text-[#6b8f2b]/70">
                  Prepare your lessons using Google Slides with coding exercises
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-[#d6c49f]/30 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#a8d05f]/20 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#6b8f2b]"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#6b8f2b]">
                  Launch Session
                </h3>
                <p className="text-center text-[#6b8f2b]/70">
                  Start an interactive session with your class in one click
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-xl border border-[#d6c49f]/30 bg-white p-6 shadow-sm">
                <div className="rounded-full bg-[#a8d05f]/20 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#6b8f2b]"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#6b8f2b]">
                  Monitor Progress
                </h3>
                <p className="text-center text-[#6b8f2b]/70">
                  View student code in real-time and provide instant feedback
                </p>
              </div>
            </div>
            <div className="flex justify-center pt-8">
              <Button className="group bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white shadow-md">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#d6c49f]/30 py-8 bg-[#cfc6b8]/5">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <span className="text-xl">🥝</span>
          </div>
          <p className="text-sm text-[#6b8f2b]/70">
            © 2024 CodeKiwi. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/terms#acceptable-use"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy#data-collection"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="mailto:support@codekiwi.tech"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
