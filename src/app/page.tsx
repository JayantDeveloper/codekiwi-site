"use client";

import Link from "next/link";
import { ArrowRight, Code2, Users, Zap, Play } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-[#f8faf5] to-white overscroll-none">
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
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 bg-gradient-to-br from-[#a8d05f]/10 via-white to-[#6b8f2b]/5"></div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#a8d05f]/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6b8f2b]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '700ms' }}></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="space-y-6 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a8d05f]/20 border border-[#6b8f2b]/20 mb-4 animate-fade-in">
                <Zap className="w-4 h-4 text-[#6b8f2b]" />
                <span className="text-sm font-medium text-[#6b8f2b]">Live Interactive Coding</span>
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-[#6b8f2b] sm:text-6xl md:text-7xl leading-tight animate-fade-in" style={{ animationDelay: '100ms' }}>
                Teach coding with slides —{" "}
                <span className="bg-gradient-to-r from-[#6b8f2b] to-[#a8d05f] bg-clip-text text-transparent">
                  live and interactive
                </span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-[#6b8f2b]/70 md:text-xl leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                Sync Google Slides with a live code editor. Monitor student
                progress in real-time and make coding lessons engaging.
              </p>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row animate-fade-in" style={{ animationDelay: '300ms' }}>
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
                  className="border-2 border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#6b8f2b] hover:text-white shadow-md hover:shadow-lg transition-all duration-300 bg-white text-base px-8"
                >
                  Create Account
                </Button>
              </Link>
            </div>

            <p className="text-sm text-[#6b8f2b]/60 animate-fade-in" style={{ animationDelay: '400ms' }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-[#6b8f2b] hover:underline transition-colors"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </section>

        {/* Animated Demo Section */}
        <section className="py-20 bg-gradient-to-b from-white to-[#f8faf5]">
          <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#a8d05f]/20 border border-[#6b8f2b]/20 mb-4">
                <Play className="w-4 h-4 text-[#6b8f2b]" />
                <span className="text-sm font-medium text-[#6b8f2b]">See It In Action</span>
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-[#6b8f2b] sm:text-5xl mb-4">
                The Student Experience
              </h2>
              <p className="text-lg text-[#6b8f2b]/70 max-w-2xl mx-auto">
                Watch how students interact with slides and code side-by-side in real-time
              </p>
            </div>

            {/* Demo Container */}
            <div className="relative max-w-6xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6b8f2b]/20 to-[#a8d05f]/20 blur-3xl transform scale-105"></div>
              
              <div className="relative bg-white rounded-2xl shadow-2xl border border-[#d6c49f]/30 overflow-hidden">
                {/* Browser Chrome */}
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white px-4 py-1 rounded-md text-xs text-gray-500 border border-gray-200 max-w-xs truncate">
                      codekiwi.app/session/live-demo
                    </div>
                  </div>
                </div>

                {/* Split View Demo */}
                <div className="grid md:grid-cols-2 gap-0 min-h-[500px]">
                  {/* Slides Panel */}
                  <div className="bg-gradient-to-br from-[#6b8f2b]/5 to-[#a8d05f]/5 p-6 md:p-8 border-r border-gray-200">
                    <div className="bg-white rounded-lg shadow-lg p-6 h-full animate-slide-in-left">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="w-2 h-2 rounded-full bg-[#6b8f2b] animate-pulse"></div>
                          <span className="text-xs font-medium text-[#6b8f2b]">LIVE PRESENTATION</span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-[#6b8f2b] mb-4">Introduction to Variables</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
                            <div className="w-6 h-6 rounded-full bg-[#a8d05f]/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-[#6b8f2b]">1</span>
                            </div>
                            <p className="text-sm text-gray-700">Variables store data values</p>
                          </div>
                          
                          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: '700ms' }}>
                            <div className="w-6 h-6 rounded-full bg-[#a8d05f]/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-[#6b8f2b]">2</span>
                            </div>
                            <p className="text-sm text-gray-700">Use <code className="bg-gray-100 px-2 py-0.5 rounded text-xs font-mono">let</code> to declare variables</p>
                          </div>
                          
                          <div className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: '900ms' }}>
                            <div className="w-6 h-6 rounded-full bg-[#a8d05f]/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-[#6b8f2b]">3</span>
                            </div>
                            <p className="text-sm text-gray-700">Try it yourself! →</p>
                          </div>
                        </div>

                        <div className="mt-8 p-4 bg-[#a8d05f]/10 rounded-lg border border-[#6b8f2b]/20 animate-fade-in" style={{ animationDelay: '1100ms' }}>
                          <p className="text-xs font-medium text-[#6b8f2b] mb-2">📝 Exercise:</p>
                          <p className="text-sm text-gray-700">Create a variable called <code className="bg-white px-2 py-0.5 rounded text-xs font-mono">name</code> and assign it your name</p>
                        </div>

                        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '1300ms' }}>
                          <div className="flex -space-x-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                            <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-medium">+21</div>
                          </div>
                          <span>24 students viewing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Code Editor Panel */}
                  <div className="bg-[#1e1e1e] p-6 md:p-8">
                    <div className="h-full flex flex-col animate-slide-in-right">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-[#a8d05f]" />
                          <span className="text-xs font-medium text-gray-400">CODE EDITOR</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-gray-400">Connected</span>
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-[#252526] rounded-lg p-4 font-mono text-sm overflow-hidden">
                        <div className="space-y-2">
                          <div className="flex">
                            <span className="text-gray-500 w-8 select-none">1</span>
                            <span className="text-gray-500">// Create your variable here</span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-8 select-none">2</span>
                            <span className="typing-animation inline-block">
                              <span className="text-[#569cd6]">let</span>
                              <span className="text-gray-300"> name </span>
                              <span className="text-[#d4d4d4]">=</span>
                              <span className="text-[#ce9178]"> "Alex"</span>
                              <span className="text-gray-300">;</span>
                            </span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-8 select-none">3</span>
                            <span className="text-gray-400"></span>
                          </div>
                          <div className="flex">
                            <span className="text-gray-500 w-8 select-none">4</span>
                            <span className="text-gray-500">// Print the variable</span>
                          </div>
                          <div className="flex typing-animation-delayed">
                            <span className="text-gray-500 w-8 select-none">5</span>
                            <span>
                              <span className="text-[#dcdcaa]">console</span>
                              <span className="text-gray-300">.</span>
                              <span className="text-[#dcdcaa]">log</span>
                              <span className="text-gray-300">(name);</span>
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-gray-700 typing-animation-delayed-2">
                          <div className="text-xs text-gray-500 mb-2">OUTPUT:</div>
                          <div className="text-[#a8d05f] flex items-center gap-2">
                            <span>→</span>
                            <span className="animate-fade-in">Alex</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between p-3 bg-[#252526] rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[#a8d05f]" />
                          <span className="text-xs text-gray-400">Real-time sync active</span>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-[#a8d05f] to-[#8fb73a] hover:from-[#8fb73a] hover:to-[#7da332] text-white text-xs h-8 px-4 transition-all duration-300">
                          <Play className="w-3 h-3 mr-1" />
                          Run Code
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12 space-y-4">
              <p className="text-sm text-[#6b8f2b]/70">Students code along with your presentation in perfect sync</p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-[#6b8f2b] text-[#6b8f2b] hover:bg-[#6b8f2b] hover:text-white transition-all duration-300"
              >
                <Link href="/signup">
                  Start Teaching Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-b from-[#f8faf5] to-white">
          <div className="space-y-12 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-[#6b8f2b] sm:text-5xl mb-4">
                How it works
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-lg text-[#6b8f2b]/70">
                Three simple steps to transform your coding lessons
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-2xl hover:border-[#a8d05f]/50 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="h-8 w-8 text-[#6b8f2b]"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                    <path d="M13 2v7h7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#6b8f2b]">
                  Create Slides
                </h3>
                <p className="text-center text-[#6b8f2b]/70 leading-relaxed">
                  Design your lessons in Google Slides with coding exercises and examples
                </p>
              </div>
              
              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-2xl hover:border-[#a8d05f]/50 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="h-8 w-8 text-[#6b8f2b]"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#6b8f2b]">
                  Launch Session
                </h3>
                <p className="text-center text-[#6b8f2b]/70 leading-relaxed">
                  Share a link and start an interactive coding session with your class instantly
                </p>
              </div>
              
              <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#d6c49f]/30 bg-white p-8 shadow-lg hover:shadow-2xl hover:border-[#a8d05f]/50 transition-all duration-300 hover:-translate-y-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#a8d05f]/20 to-[#6b8f2b]/10 p-4 group-hover:scale-110 transition-transform duration-300">
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
                    className="h-8 w-8 text-[#6b8f2b]"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#6b8f2b]">
                  Monitor Progress
                </h3>
                <p className="text-center text-[#6b8f2b]/70 leading-relaxed">
                  See every student's code in real-time and provide instant, personalized feedback
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

      <footer className="border-t border-[#d6c49f]/30 py-12 bg-gradient-to-b from-white to-[#f8faf5]">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row px-4 sm:px-8 md:px-12 max-w-7xl mx-auto w-full">
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
          <p className="text-sm text-[#6b8f2b]/70">
            © 2024 CodeKiwi. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/terms#acceptable-use"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors hover:underline"
            >
              Terms
            </Link>
            <Link
              href="/privacy#data-collection"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="mailto:support@codekiwi.tech"
              className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors hover:underline"
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
          animation: typing 2s steps(40) 0.5s forwards, blink 0.75s step-end infinite;
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
          from, to {
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