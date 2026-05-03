import React from "react";

interface Props {
  isVisible: boolean;
}

export const DemoSection = React.forwardRef<HTMLElement, Props>(
  ({ isVisible }, ref) => (
    <section
      id="demo-section"
      ref={ref}
      className="py-20 bg-gradient-to-b from-[#daf0c0] via-[#e8f5d8] to-[#daf0c0]"
    >
      <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl mb-4">
            The Student Experience
          </h2>
          <p className="text-lg text-[#1a1a1a]/80 max-w-2xl mx-auto font-medium">
            Watch how students interact with slides and code side-by-side in real-time
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/40 to-[#6b8f2b]/40 blur-3xl transform scale-105" />

          <div className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl border-2 border-[#a8d05f]/50 overflow-hidden">
            {/* Browser chrome */}
            <div className="bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-3 border-b border-[#a8d05f] flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white px-4 py-1 rounded-md text-xs text-[#6b8f2b] font-medium border border-[#a8d05f] max-w-xs truncate">
                  codekiwi.app/session/live-demo
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 divide-x divide-[#a8d05f]/30">
              {/* Slides pane */}
              <div className="bg-[#f1f3f4] min-h-[500px] flex flex-col">
                <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2">
                  <SlidesIcon />
                  <span className="text-[11px] text-gray-700 font-medium flex-1 truncate">
                    Python Lesson
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#6b8f2b] flex items-center justify-center text-white text-[9px] font-bold">
                    T
                  </div>
                </div>

                <div
                  className={`flex-1 flex flex-col justify-center transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div className="mx-4 my-2 aspect-video bg-white rounded border border-gray-300 shadow-md overflow-hidden flex flex-col p-4">
                    <div className={isVisible ? "slide-reveal-0" : "opacity-0"}>
                      <h3 className="text-base font-bold text-[#1a1a1a] mb-1">Python Functions</h3>
                      <div className="w-10 h-0.5 bg-gradient-to-r from-[#6b8f2b] to-[#a8d05f] rounded-full mb-3" />
                    </div>
                    <div className="space-y-2 flex-1">
                      {[
                        { delay: "slide-reveal-1", num: "1", text: "Functions are reusable blocks of code" },
                        { delay: "slide-reveal-2", num: "2", text: <>Use <code className="px-1 bg-gray-100 rounded font-mono text-[10px] text-[#6b8f2b]">def</code> keyword to define</> },
                        { delay: "slide-reveal-3", num: "3", text: "Parameters go inside parentheses" },
                      ].map(({ delay, num, text }) => (
                        <div key={num} className={`flex items-start gap-2 ${isVisible ? delay : "opacity-0"}`}>
                          <div className="min-w-[18px] h-[18px] rounded-full bg-[#6b8f2b] flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0 mt-0.5">
                            {num}
                          </div>
                          <p className="text-[11px] text-gray-700 leading-relaxed">{text}</p>
                        </div>
                      ))}
                    </div>
                    <div className={`bg-gray-50 border-l-4 border-[#6b8f2b] px-3 py-2 rounded-r mt-2 ${isVisible ? "slide-reveal-4" : "opacity-0"}`}>
                      <div className="flex items-start gap-1.5">
                        <LightbulbIcon />
                        <div>
                          <p className="text-[10px] font-bold text-gray-700 mb-0.5">Tip</p>
                          <p className="text-[10px] text-gray-600 leading-relaxed">
                            Try creating a function that prints a personalized message!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-t border-gray-200 px-4 py-1.5 flex items-center justify-center gap-3">
                  <ChevronLeftIcon />
                  <span className="text-[11px] text-gray-500">3 / 8</span>
                  <ChevronRightIcon />
                </div>
              </div>

              {/* Editor pane */}
              <div className="bg-[#1e1e1e] min-h-[500px] flex flex-col">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#252526] border-b border-[#3e3e42]">
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] rounded-t">
                    <CodeIcon />
                    <span className="text-xs text-gray-300 font-medium">main.py</span>
                  </div>
                </div>

                <div className="flex-[7] p-4 font-mono text-sm overflow-hidden">
                  <div className="space-y-1">
                    {[
                      { cls: "typing-line-1", content: <><span className="text-[#c586c0]">def</span><span className="text-[#dcdcaa]"> greet</span><span className="text-gray-300">(</span><span className="text-[#9cdcfe]">name</span><span className="text-gray-300">):</span></> },
                      { cls: "typing-line-2", content: <><span className="text-gray-300"> </span><span className="text-gray-600"># Prints a greeting message</span></> },
                      { cls: "typing-line-3", content: <><span className="text-gray-300"> </span><span className="text-[#dcdcaa]">print</span><span className="text-gray-300">(</span><span className="text-[#ce9178]">f&quot;Hello, </span><span className="text-gray-300">{"{"}</span><span className="text-[#9cdcfe]">name</span><span className="text-gray-300">{"}"}</span><span className="text-[#ce9178]">!&quot;</span><span className="text-gray-300">)</span></> },
                      { cls: "typing-line-4", content: null },
                      { cls: "typing-line-5", content: <span className="text-gray-600"># Call the function</span> },
                      { cls: "typing-line-6", content: <><span className="text-[#dcdcaa]">greet</span><span className="text-gray-300">(</span><span className="text-[#ce9178]">&quot;Student&quot;</span><span className="text-gray-300">)</span></> },
                    ].map(({ cls, content }, i) => (
                      <div key={i} className="flex">
                        <span className="inline-block w-10 text-right pr-4 text-gray-600 select-none">{i + 1}</span>
                        <span className={`code-line ${isVisible ? cls : ""}`}>{content}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`code-line ${isVisible ? "typing-cursor" : ""}`}>
                    <span className="inline-block w-10" />
                    <span className="inline-block w-2 h-5 bg-white animate-pulse" />
                  </div>
                </div>

                <div className="flex-[3] border-t border-[#3e3e42] bg-[#181818] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                      <polyline points="8 9 13 12 8 15" />
                      <line x1="13" y1="15" x2="18" y2="15" />
                    </svg>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Output</span>
                  </div>
                  <div className={`font-mono text-sm text-[#a8d05f] ${isVisible ? "typing-output" : "opacity-0"}`}>
                    Hello, Student!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
);
DemoSection.displayName = "DemoSection";

function SlidesIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" fill="none">
      <rect x="6" y="6" width="36" height="36" rx="3" fill="#FBBC04" />
      <rect x="12" y="13" width="24" height="22" rx="1" fill="white" />
      <rect x="16" y="17" width="16" height="2" rx="1" fill="#BDC1C6" />
      <rect x="16" y="21" width="16" height="2" rx="1" fill="#BDC1C6" />
      <rect x="16" y="25" width="10" height="2" rx="1" fill="#BDC1C6" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg className="w-3 h-3 text-gray-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-4 h-4 text-[#3b82f6]" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
    </svg>
  );
}
