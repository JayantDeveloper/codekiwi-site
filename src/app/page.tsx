/* eslint-disable */
"use client";

import Link from "next/link";
import { ArrowRight, Code2, Users, Zap, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export default function LandingPage() {
  // Scroll animation state
  const [isVisible, setIsVisible] = useState({
    demo: false,
    features: false,
  });

  const demoRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2, // Trigger when 20% of element is visible
      rootMargin: "0px",
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement; // Cast to HTMLElement
          if (target.id === "demo-section") {
            setIsVisible((prev) => ({ ...prev, demo: true }));
          } else if (target.id === "features-section") {
            setIsVisible((prev) => ({ ...prev, features: true }));
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (demoRef.current) observer.observe(demoRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => {
      if (demoRef.current) observer.unobserve(demoRef.current);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

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
        <section
          id="demo-section"
          ref={demoRef}
          className="py-20 bg-gradient-to-b from-[#daf0c0] via-[#e8f5d8] to-[#daf0c0]"
        >
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

                {/* Split View Content */}
                <div className="grid md:grid-cols-2 divide-x divide-[#a8d05f]/30">
                  {/* Left Side - Google Slides */}
                  <div className="p-6 bg-white min-h-[500px] flex flex-col">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#6b8f2b]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#8fb73a]"></div>
                        <div className="w-2 h-2 rounded-full bg-[#a8d05f]"></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        Google Slides
                      </span>
                    </div>

                    <div
                      className={`flex-1 flex flex-col justify-center transition-all duration-1000 ${
                        isVisible.demo
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-8"
                      }`}
                    >
                      <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-inner">
                        <div>
                          <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2">
                            Python Functions
                          </h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-[#6b8f2b] to-[#a8d05f] rounded-full"></div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="min-w-[28px] h-7 rounded-full bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] flex items-center justify-center text-white text-xs font-bold shadow-md">
                              1
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed pt-1">
                              Functions are reusable blocks of code
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="min-w-[28px] h-7 rounded-full bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] flex items-center justify-center text-white text-xs font-bold shadow-md">
                              2
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed pt-1">
                              Use{" "}
                              <code className="px-2 py-0.5 bg-gray-200 rounded text-[#6b8f2b] font-mono text-xs">
                                def
                              </code>{" "}
                              keyword to define
                            </p>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="min-w-[28px] h-7 rounded-full bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] flex items-center justify-center text-white text-xs font-bold shadow-md">
                              3
                            </div>
                            <p className="text-sm text-gray-700 leading-relaxed pt-1">
                              Parameters go inside parentheses
                            </p>
                          </div>
                        </div>

                        {/* Tip Box */}
                        <div className="bg-[#daf0c0] border-l-4 border-[#6b8f2b] p-4 rounded-r-lg shadow-sm">
                          <div className="flex items-start gap-2">
                            <svg
                              className="w-5 h-5 text-[#6b8f2b] flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div>
                              <p className="text-xs font-bold text-[#6b8f2b] mb-1">
                                💡 Tip
                              </p>
                              <p className="text-xs text-gray-700 leading-relaxed">
                                Try creating a function that takes your name and
                                prints a personalized message!
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Code Editor with VSCode styling */}
                  <div className="bg-[#1e1e1e] min-h-[500px] flex flex-col">
                    {/* Editor Header */}
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
                      <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] rounded-t">
                        <svg
                          className="w-4 h-4 text-[#3b82f6]"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        </svg>
                        <span className="text-xs text-gray-300 font-medium">
                          main.py
                        </span>
                      </div>
                    </div>

                    {/* Code Editor Content - 70% */}
                    <div className="flex-[7] p-4 font-mono text-sm overflow-hidden">
                      <div className="space-y-1">
                        {/* Line 1 */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            1
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-1" : ""
                            }`}
                          >
                            <span className="text-[#c586c0]">def</span>
                            <span className="text-[#dcdcaa]"> greet</span>
                            <span className="text-gray-300">(</span>
                            <span className="text-[#9cdcfe]">name</span>
                            <span className="text-gray-300">):</span>
                          </span>
                        </div>

                        {/* Line 2 */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            2
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-2" : ""
                            }`}
                          >
                            <span className="text-gray-300"> </span>
                            <span className="text-gray-600">
                              # Prints a greeting message
                            </span>
                          </span>
                        </div>

                        {/* Line 3 */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            3
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-3" : ""
                            }`}
                          >
                            <span className="text-gray-300"> </span>
                            <span className="text-[#dcdcaa]">print</span>
                            <span className="text-gray-300">(</span>
                            <span className="text-[#ce9178]">
                              f&quot;Hello,{" "}
                            </span>
                            <span className="text-gray-300">{"{"}</span>
                            <span className="text-[#9cdcfe]">name</span>
                            <span className="text-gray-300">{"}"}</span>
                            <span className="text-[#ce9178]">!&quot;</span>
                            <span className="text-gray-300">)</span>
                          </span>
                        </div>

                        {/* Line 4 - Empty */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            4
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-4" : ""
                            }`}
                          ></span>
                        </div>

                        {/* Line 5 */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            5
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-5" : ""
                            }`}
                          >
                            <span className="text-gray-600">
                              # Call the function
                            </span>
                          </span>
                        </div>

                        {/* Line 6 */}
                        <div className="flex">
                          <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">
                            6
                          </span>
                          <span
                            className={`code-line ${
                              isVisible.demo ? "typing-line-6" : ""
                            }`}
                          >
                            <span className="text-[#dcdcaa]">greet</span>
                            <span className="text-gray-300">(</span>
                            <span className="text-[#ce9178]">
                              &quot;Student&quot;
                            </span>
                            <span className="text-gray-300">)</span>
                          </span>
                        </div>
                      </div>

                      {/* Cursor */}
                      <div
                        className={`code-line ${
                          isVisible.demo ? "typing-cursor" : ""
                        }`}
                      >
                        <span className="inline-block w-10"></span>
                        <span className="inline-block w-2 h-5 bg-white animate-pulse"></span>
                      </div>
                    </div>

                    {/* Output Terminal - 30% */}
                    <div className="flex-[3] border-t border-[#3e3e42] bg-[#181818] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Play className="w-3 h-3 text-[#a8d05f]" />
                        <span className="text-xs text-gray-400 font-medium">
                          Output
                        </span>
                      </div>
                      <div
                        className={`font-mono text-sm text-[#a8d05f] ${
                          isVisible.demo ? "typing-output" : "opacity-0"
                        }`}
                      >
                        Hello, Student!
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Sync Indicator */}
              <div
                className={`absolute -bottom-6 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
                  isVisible.demo
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-6 py-2 rounded-full shadow-lg border-2 border-white flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-white text-sm font-bold">
                    Live Sync Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features-section"
          ref={featuresRef}
          className="py-20 bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]"
        >
          <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                Why Teachers Choose CodeKiwi
              </h2>
              <p className="text-lg text-[#a8d05f] max-w-2xl mx-auto font-medium">
                Everything you need to teach coding effectively in one platform
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#a8d05f] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 shadow-lg hover:shadow-2xl hover:border-[#6b8f2b] hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#6b8f2b] to-[#8fb73a] p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Code2 className="h-8 w-8 text-white" />
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
                  See every student&#39;s code in real-time and provide instant,
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
              href="mailto:jaymaheshwari2603@gmail.com"
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

        @keyframes typing {
          from {
            opacity: 1; /* changed from 0 to 1 */
            max-width: 0;
          }
          to {
            opacity: 1;
            max-width: 100%;
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

        .code-line {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          opacity: 1; /* changed from 0 to 1 */
          max-width: 0;
        }

        .typing-line-1 {
          animation: typing 3.5s steps(30) 0.3s forwards; /* was 2.0s */
        }

        .typing-line-2 {
          animation: typing 2s steps(30) 1.1s forwards; /* was 2.0s */
        }

        .typing-line-3 {
          animation: typing 3s steps(40) 1.9s forwards; /* was 1.5s */
        }

        .typing-line-4 {
          animation: typing 3.5s steps(5) 2.9s forwards; /* was 2.0s */
        }

        .typing-line-5 {
          animation: typing 2s steps(30) 3.2s forwards; /* was 2.0s */
        }

        .typing-line-6 {
          animation: typing 3.5s steps(30) 4s forwards; /* was 2.0s */
        }

        .typing-cursor {
          animation: fade-in 0.3s ease-out 4.8s forwards;
          opacity: 0;
        }

        .typing-output {
          animation: fade-in 0.5s ease-out 5.2s forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
