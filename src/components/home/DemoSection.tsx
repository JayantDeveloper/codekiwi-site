"use client";

import React, { useEffect, useRef, useState } from "react";

/* Shared, tiny, and all gated on prefers-reduced-motion. The point is to make
   the mocks feel live without pulling attention off the headline, so nothing
   loops faster than ~1s and nothing moves position. */
function useReduced() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setR(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return r;
}

/** Fires once, the first time the element scrolls into view. */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

/** A terminal caret. One element, one keyframe, no layout shift. */
function Caret({ className }: { className?: string }) {
  return (
    <span className={`ck-caret inline-block ${className ?? ""}`}>
      <span className="inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-current" />
    </span>
  );
}
import { Blob, KiwiSlice } from "@/components/home/Decor";
import { TypingCode, SPEED_CHECKER, CASEY, FARAH, type Op } from "@/components/home/TypingCode";


interface Props {
  // Kept for page.tsx compatibility; the section is now static.
  isVisible?: boolean;
}


/* ── Student view: synced slide + live code editor ──────────────────────── */
function StudentDemo() {
  const reduce = useReduced();
  const { ref, seen } = useInView<HTMLDivElement>();
  const on = reduce || seen;
  // the terminal only fills in once the typist has finished the program
  const [ran, setRan] = useState(false);
  return (
    <div ref={ref} className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-[#1a1a1a] shadow-2xl md:aspect-[16/10]">
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="ml-2 text-[11px] font-semibold text-white/90">
          codekiwi.app · Session 4821
        </span>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-2">
        {/* slide */}
        <div className="bg-[#EDF4DE] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#6b8f2b]">
            Slide 3 · Coding question
          </p>
          <h4 className="mt-2 text-base font-bold leading-snug text-[#1E2A14]">
            Speed Checker
          </h4>
          <p className="mt-3 text-[11px] text-[#4C5742]">Write a program that:</p>
          <ol className="mt-1.5 list-inside list-decimal space-y-1 text-[11px] text-[#4C5742]">
            <li>
              Sets <span className="font-semibold text-[#5A7A23]">speed = 72</span>
            </li>
            <li>Prints &ldquo;Slow down!&rdquo; if over 65</li>
            <li>Otherwise, a safe message</li>
          </ol>
        </div>

        {/* editor + terminal */}
        <div className="flex flex-col border-l border-white/10">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-2">
            <span className="shrink-0 text-[10px] font-semibold text-white/50">
              main.py
            </span>
            <span className="flex items-center gap-1.5">
              <span
                aria-label="Raise hand"
                className="flex items-center gap-1 rounded-md border border-white/20 px-1.5 py-0.5 text-[9.5px] font-semibold text-white/70"
              >
                <HandIcon className="h-2.5 w-2.5" />
                {/* Icon-only on phones so the pill doesn't crowd main.py */}
                <span className="hidden sm:inline">Raise hand</span>
              </span>
              <span className={`flex items-center gap-1 rounded-md bg-[#6b8f2b] px-2 py-0.5 text-[10px] font-bold text-white ${on && !ran && !reduce ? "ck-pulse" : ""}`}>
                ▸ Run
              </span>
            </span>
          </div>
          <div className="flex-1 px-3 py-3 font-mono text-[11px] leading-relaxed text-[#e5e7eb]">
            <TypingCode script={SPEED_CHECKER} active={on} onDone={setRan} />
          </div>
          <div className="border-t border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] text-white/80">
            <span className="text-[#a8d05f]">$</span>{" "}
            <span
              className="transition-opacity duration-300"
              style={{ opacity: ran ? 1 : 0 }}
            >
              Slow down!
            </span>
            <div
              className="text-[#6b8f2b] transition-opacity duration-300"
              style={{ opacity: ran ? 1 : 0, transitionDelay: "180ms" }}
            >
              ✔ Done
            </div>
            {!ran && <Caret className="text-white/50" />}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Raised hand. Same mark in the student editor and on the teacher's card, so
 *  the connection between the two sides is obvious at a glance. */
function HandIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 11V6a1.6 1.6 0 0 0-3.2 0M14.8 10V4.2a1.6 1.6 0 0 0-3.2 0v1.6M11.6 10V6a1.6 1.6 0 0 0-3.2 0v7" />
      <path d="M18 8.4a1.6 1.6 0 1 1 3.2 0V14a8 8 0 0 1-8 8h-1.6c-2.2 0-3.6-.7-4.8-1.9l-2.9-2.9a1.6 1.6 0 0 1 2.3-2.3l2.2 1.7" />
    </svg>
  );
}

/* ── Teacher dashboard: every student's code, live ──────────────────────── */
const STATUS: Record<
  string,
  { pill: string; dot: string; label: string }
> = {
  done: { pill: "bg-[#dcfce7] text-[#166534]", dot: "bg-[#22c55e]", label: "Done" },
  // "Done" students show a complete, working solution. Showing them a
  // half-written snippet made the status look wrong, which undermines the
  // whole point of the dashboard.
  coding: { pill: "bg-[#fef9c3] text-[#854d0e]", dot: "bg-[#eab308]", label: "Coding" },
  help: { pill: "bg-[#fee2e2] text-[#991b1b]", dot: "bg-[#ef4444]", label: "Needs help" },
};

function StudentCard({
  initials,
  name,
  status,
  color,
  code,
  script,
  typing,
}: {
  initials: string;
  name: string;
  status: keyof typeof STATUS;
  color: string;
  code: string;
  script?: Op[];
  typing?: boolean;
}) {
  const s = STATUS[status];
  const live = status === "coding" || status === "help";
  return (
    <div className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-1.5 shadow-sm transition-colors duration-500">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold text-white"
            style={{ background: color }}
          >
            {initials}
          </span>
          <span className="truncate text-[10px] font-semibold text-[#1a1a1a]">
            {name}
          </span>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${s.pill}`}
        >
          {status === "help" ? (
            <HandIcon className="ck-wave h-2.5 w-2.5" />
          ) : (
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${live ? "ck-breathe" : ""}`} />
          )}
          {s.label}
        </span>
      </div>
      <pre className="mt-1 min-h-0 flex-1 overflow-hidden whitespace-pre rounded-md bg-[#1a1a1a] px-1.5 py-1 font-mono text-[8px] leading-[1.32] text-[#e5e7eb]">
        {script && typing ? (
          <TypingCode script={script} active showLineNumbers={false} className="min-h-[1.4em]" />
        ) : (
          <>
            {code}
            {live && <Caret className="ml-[1px] align-middle text-white/55" />}
          </>
        )}
      </pre>
    </div>
  );
}

function TeacherDemo() {
  const reduce = useReduced();
  const { ref, seen } = useInView<HTMLDivElement>();
  const [caseyDone, setCaseyDone] = useState(false);
  useEffect(() => {
    if (!seen || reduce) return;
    const t = setTimeout(() => setCaseyDone(true), 2600);
    return () => clearTimeout(t);
  }, [seen, reduce]);
  return (
    <div ref={ref} className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-[#f0f7e6] shadow-2xl md:aspect-[16/10]">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-2.5">
        <span className="text-[11px] font-semibold text-white">
          Teacher Dashboard
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/90">
          <span className="rounded-full bg-white/20 px-2 py-0.5">Session 4821</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5">6 students</span>
        </div>
      </div>
      <div className="grid min-h-0 flex-1 auto-rows-fr grid-cols-2 gap-2 p-2.5">
        <StudentCard
          initials="AP"
          name="Aiden P."
          status="done"
          color="#60a5fa"
          code={'if speed > 65:\n  print("Slow down!")\nelse:\n  print("Drive safely.")'}
        />
        <StudentCard
          initials="BO"
          name="Bea O."
          status="done"
          color="#f472b6"
          code={'if speed > 65:\n  print("Slow down!")\nelse:\n  print("Safe speed")'}
        />
        <StudentCard
          initials="CT"
          name="Casey T."
          status={caseyDone ? "done" : "coding"}
          color="#fb923c"
          code={'if speed > 65:\n  print("Slow down!")\nelse:\n  print("Drive safely.")'}
          script={CASEY}
          typing={seen && !reduce && !caseyDone}
        />
        <StudentCard
          initials="DA"
          name="Diego A."
          status="help"
          color="#a78bfa"
          code={'prin("Slow down)'}
        />
        <StudentCard
          initials="EC"
          name="Eleanor C."
          status="done"
          color="#2dd4bf"
          code={'if speed > 65:\n  print("Slow down!")\nelse:\n  print("Nice driving")'}
        />
        <StudentCard
          initials="FK"
          name="Farah K."
          status="coding"
          color="#fbbf24"
          code={"else:\n  print("}
          script={FARAH}
          typing={seen && !reduce}
        />
      </div>
    </div>
  );
}

export const DemoSection = React.forwardRef<HTMLElement, Props>(
  (_props, ref) => {
    return (
      <section
        id="demo-section"
        ref={ref}
        className="relative overflow-hidden py-20 bg-[#E7F2D4]"
      >
        <KiwiSlice className="-left-28 -top-16 h-[22rem] w-[22rem] rotate-[-10deg]" rind="#CBDFA4" flesh="#DCEBC2" core="#EDF5DE" seed="#B6CF90" />
        <Blob className="right-[9%] bottom-[8%] h-32 w-32 rotate-[115deg]" color="#D2E5AC" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 md:px-12">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
              One lesson, two live views
            </h2>
            <p className="mx-auto max-w-3xl text-balance text-lg font-medium text-[#1a1a1a]/80">
              Students code right beside your slide. You watch every
              student&apos;s work update in real time.
            </p>
          </div>

          <div className="grid items-start gap-10 md:grid-cols-2">
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
              <StudentDemo />
              <p className="mt-3 text-sm text-[#1a1a1a]/70">
                The slide the teacher is on, with a code editor beside it. Write
                and run code without leaving the lesson.
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
              <TeacherDemo />
              <p className="mt-3 text-sm text-[#1a1a1a]/70">
                See everyone&apos;s code and run status at a glance, so you can
                spot who&apos;s stuck without walking the room.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

DemoSection.displayName = "DemoSection";
