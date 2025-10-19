"use client";

import Link from "next/link";
import { ArrowRight, Code2, Users, Zap, Play } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#1a1a1a] via-[#a8d05f]/10 to-[#1a1a1a] overscroll-none">
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

      <main className="flex-1">
        {/* Hero Section - Metallic Black Background */}
        <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#a8d05f]/30 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#6b8f2b]/30 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "700ms" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#8fb73a]/25 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1400ms" }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="space-y-6 max-w-4xl">
              <h1
                className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight animate-fade-in"
                style={{ animationDelay: "100ms" }}
              >
                Teach coding with slides —{" "}
                <span className="bg-gradient-to-r from-[#a8d05f] to-[#6b8f2b] bg-clip-text text-transparent">
                  live and interactive
                </span>
              </h1>
              <p
                className="mx-auto max-w-[700px] text-lg text-[#a8d05f] md:text-xl leading-relaxed animate-fade-in font-medium"
                style={{ animationDelay: "200ms" }}
              >
                Sync Google Slides with a live code editor. Monitor student
                progress in real-time and make coding lessons engaging.
              </p>
            </div>

            <div
              className="flex flex-col gap-4 sm:flex-row animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8"
              >
                <Link href="/signup">
                  <GoogleIcon className="mr-2 h-5 w-5" />
                  Get Started with Google
                </Link>
              </Button>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#a8d05f] text-[#a8d05f] hover:bg-[#a8d05f] hover:text-[#1a1a1a] shadow-md hover:shadow-lg transition-all duration-300 bg-transparent text-base px-8"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <p
              className="text-sm text-[#a8d05f] animate-fade-in font-medium"
              style={{ animationDelay: "400ms" }}
            >
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-bold text-white hover:text-[#a8d05f] transition-colors hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </section>

        {/* Animated Demo Section - Light Green Background */}
        <section className="py-20 bg-gradient-to-b from-[#a8d05f]/15 via-[#a8d05f]/10 to-[#a8d05f]/15">
          <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl mb-4">
                The Student Experience
              </h2>
              <p className="text-lg text-[#1a1a1a]/80 max-w-2xl mx-auto font-medium">
                Watch how students interact with slides and code side-by-side in
                real-time
              </p>
            </div>

            {/* Demo Container */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/40 to-[#6b8f2b]/40 blur-3xl transform scale-105"></div>

              <div className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-[#a8d05f]/50 overflow-hidden">
                {/* Browser Chrome */}
                <div className="bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-3 border-b border-[#a8d05f] flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white px-4 py-1 rounded-md text-xs text-[#6b8f2b] font-medium border border-[#a8d05f] max-w-xs truncate">
                      codekiwi.app/session/live-demo
                    </div>
                  </div>
                </div>

                {/* Split View Demo */}
                <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                  {/* Slides Panel */}
                  <div className="bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/15 p-6 md:p-8 border-r-2 border-[#a8d05f]/30">
                    <div className="bg-white rounded-lg shadow-lg p-6 h-full animate-slide-in-left border-2 border-[#a8d05f]/30">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 rounded-full bg-[#6b8f2b] animate-pulse"></div>
                          <span className="text-xs font-medium text-[#6b8f2b]">
                            LIVE PRESENTATION
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
                          Introduction to Variables
                        </h3>

                        <div className="space-y-3">
                          <div
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: "500ms" }}
                          >
                            <div className="w-6 h-6 rounded-full bg-[#6b8f2b] flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-white">
                                1
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              Variables store data values
                            </p>
                          </div>

                          <div
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: "700ms" }}
                          >
                            <div className="w-6 h-6 rounded-full bg-[#6b8f2b] flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-white">
                                2
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              Use{" "}
                              <code className="bg-[#a8d05f]/30 px-2 py-0.5 rounded text-xs font-mono text-[#1a1a1a] font-medium">
                                let
                              </code>{" "}
                              to declare variables
                            </p>
                          </div>

                          <div
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: "900ms" }}
                          >
                            <div className="w-6 h-6 rounded-full bg-[#6b8f2b] flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-white">
                                3
                              </span>
                            </div>
                            <p className="text-sm text-gray-700">
                              Try the example on the right →
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 p-4 bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 rounded-lg border-2 border-[#a8d05f]/50">
                          <p className="text-xs font-semibold text-[#6b8f2b] mb-2">
                            💡 TIP
                          </p>
                          <p className="text-xs text-gray-700">
                            Variables can be updated with new values anytime!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor Panel */}
                  <div className="bg-[#0d0d0d] p-6 md:p-8">
                    <div className="bg-[#1e1e1e] rounded-lg shadow-lg h-full flex flex-col animate-slide-in-right border-2 border-[#a8d05f]/30">
                      {/* Editor Header */}
                      <div className="bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] px-4 py-2 rounded-t-lg flex items-center justify-between border-b-2 border-[#a8d05f]/50">
                        <span className="text-xs font-medium text-[#a8d05f]">
                          script.js
                        </span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#a8d05f]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#a8d05f]"></div>
                          <div className="w-2 h-2 rounded-full bg-[#a8d05f]"></div>
                        </div>
                      </div>

                      {/* Code Content */}
                      <div className="flex-1 p-4 font-mono text-sm overflow-auto">
                        <div className="space-y-2">
                          <div className="typing-animation">
                            <span className="text-[#569cd6]">let</span>
                            <span className="text-[#9cdcfe]"> studentName</span>
                            <span className="text-white"> = </span>
                            <span className="text-[#ce9178]">"Alex"</span>
                            <span className="text-white">;</span>
                          </div>

                          <div className="typing-animation-delayed">
                            <span className="text-[#569cd6]">let</span>
                            <span className="text-[#9cdcfe]"> grade</span>
                            <span className="text-white"> = </span>
                            <span className="text-[#b5cea8]">95</span>
                            <span className="text-white">;</span>
                          </div>

                          <div className="typing-animation-delayed-2">
                            <span className="text-[#dcdcaa]">console</span>
                            <span className="text-white">.</span>
                            <span className="text-[#dcdcaa]">log</span>
                            <span className="text-white">(studentName);</span>
                          </div>
                        </div>
                      </div>

                      {/* Console Output */}
                      <div className="bg-[#0d0d0d] px-4 py-3 rounded-b-lg border-t-2 border-[#a8d05f]/30">
                        <div className="text-xs font-medium text-[#a8d05f] mb-1">
                          Console Output:
                        </div>
                        <div className="text-sm font-mono text-[#a8d05f]">
                          {">"} Alex
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Metallic Black Background */}
        <section className="py-20 bg-gradient-to-b from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]">
          <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                Teaching Made Simple
              </h2>
              <p className="text-lg text-[#a8d05f] max-w-2xl mx-auto font-medium">
                Three easy steps to transform your coding lessons
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#a8d05f] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 shadow-lg hover:shadow-2xl hover:border-[#6b8f2b] hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#6b8f2b] to-[#8fb73a] p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                    className="h-8 w-8 text-white"
                  >
                    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="M10 9H8" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Sync Slides</h3>
                <p className="text-center text-[#a8d05f] leading-relaxed font-medium">
                  Connect your Google Slides presentation with CodeKiwi in
                  seconds
                </p>
              </div>

              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#a8d05f] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 shadow-lg hover:shadow-2xl hover:border-[#6b8f2b] hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#6b8f2b] to-[#8fb73a] p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                    className="h-8 w-8 text-white"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Launch Session
                </h3>
                <p className="text-center text-[#a8d05f] leading-relaxed font-medium">
                  Share a link and start an interactive coding session with your
                  class instantly
                </p>
              </div>

              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#a8d05f] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 shadow-lg hover:shadow-2xl hover:border-[#6b8f2b] hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#6b8f2b] to-[#8fb73a] p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
                    className="h-8 w-8 text-white"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Monitor Progress
                </h3>
                <p className="text-center text-[#a8d05f] leading-relaxed font-medium">
                  See every student's code in real-time and provide instant,
                  personalized feedback
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8"
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

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
              href="mailto:support@codekiwi.tech"
              className="text-sm text-white/90 hover:text-white transition-colors hover:underline font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
        }

        .typing-animation {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(40) 0.5s forwards,
            blink 0.75s step-end infinite;
          opacity: 0;
          max-width: 0;
        }

        .typing-animation-delayed {
          animation: typing 1.5s steps(30) 2.5s forwards;
          opacity: 0;
          max-width: 0;
          overflow: hidden;
          white-space: nowrap;
        }

        .typing-animation-delayed-2 {
          animation: fade-in 0.8s ease-out 4s forwards;
          opacity: 0;
        }

        @keyframes typing {
          from {
            max-width: 0;
            opacity: 1;
          }
          to {
            max-width: 100%;
            opacity: 1;
          }
        }

        @keyframes blink {
          from,
          to {
            border-right-color: transparent;
          }
          50% {
            border-right-color: #a8d05f;
          }
        }
      `}</style>
    </div>
  );
}
