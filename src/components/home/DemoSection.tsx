"use client";

import React from "react";
import Image from "next/image";

interface Props {
  // Kept for page.tsx compatibility; the section is now static.
  isVisible?: boolean;
}

export const DemoSection = React.forwardRef<HTMLElement, Props>(
  (_props, ref) => {
    return (
      <section
        id="demo-section"
        ref={ref}
        className="py-20 bg-gradient-to-b from-[#daf0c0] via-[#e8f5d8] to-[#daf0c0]"
      >
        <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl mb-4">
              One lesson, two live views
            </h2>
            <p className="text-lg text-[#1a1a1a]/80 mx-auto max-w-2xl font-medium">
              Students code right beside your slide. You watch every student&apos;s
              work update in real time.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Student view */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-[#6b8f2b] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Students
                </span>
                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  Slides + a live code editor
                </h3>
              </div>
              <div className="overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-white shadow-2xl">
                <Image
                  src="/gallery/student-view.png"
                  alt="CodeKiwi student view: the synced slide beside a live code editor"
                  width={1280}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-3 text-sm text-[#1a1a1a]/70">
                The slide the teacher is on, with a code editor beside it. Students
                write and run code without leaving the lesson.
              </p>
            </div>

            {/* Teacher dashboard */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-full bg-[#1a1a1a] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#a8d05f]">
                  Teachers
                </span>
                <h3 className="text-xl font-bold text-[#1a1a1a]">
                  Every student, coding live
                </h3>
              </div>
              <div className="overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-white shadow-2xl">
                <Image
                  src="/gallery/teacher-dashboard.png"
                  alt="CodeKiwi teacher dashboard: every student's code and run status, live"
                  width={1280}
                  height={800}
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-3 text-sm text-[#1a1a1a]/70">
                See everyone&apos;s code and run status at a glance, so you can spot
                who&apos;s stuck without walking the room.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DemoSection.displayName = "DemoSection";
