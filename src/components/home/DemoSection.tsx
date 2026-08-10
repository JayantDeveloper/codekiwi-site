"use client";

import React from "react";

interface Props {
  // Kept for page.tsx compatibility; the section is now static.
  isVisible?: boolean;
}

function CodeLine({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="w-5 shrink-0 select-none pr-2 text-right text-[#4b5563]">
        {n}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

/* ── Student view: synced slide + live code editor ──────────────────────── */
function StudentDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-[#1a1a1a] shadow-2xl">
      <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="ml-2 text-[11px] font-semibold text-white/90">
          codekiwi.app · Session 4821
        </span>
      </div>

      <div className="grid grid-cols-2">
        {/* slide */}
        <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f2557] p-4">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-[#a8d05f]">
            Slide 3 · Coding question
          </p>
          <h4 className="mt-2 text-base font-bold leading-snug text-white">
            Speed Checker
          </h4>
          <p className="mt-3 text-[11px] text-white/80">Write a program that:</p>
          <ol className="mt-1.5 list-inside list-decimal space-y-1 text-[11px] text-white/70">
            <li>
              Sets <span className="text-[#a8d05f]">speed = 72</span>
            </li>
            <li>Prints &ldquo;Slow down!&rdquo; if over 65</li>
            <li>Otherwise, a safe message</li>
          </ol>
        </div>

        {/* editor + terminal */}
        <div className="flex flex-col border-l border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="text-[10px] font-semibold text-white/50">
              main.py
            </span>
            <span className="flex items-center gap-1 rounded-md bg-[#6b8f2b] px-2 py-0.5 text-[10px] font-bold text-white">
              ▸ Run
            </span>
          </div>
          <div className="flex-1 px-3 py-3 font-mono text-[11px] leading-relaxed text-[#e5e7eb]">
            <CodeLine n={1}>
              <span className="text-[#7dd3fc]">speed</span> ={" "}
              <span className="text-[#fbbf24]">72</span>
            </CodeLine>
            <CodeLine n={2}>
              <span className="text-[#c084fc]">if</span> speed &gt;{" "}
              <span className="text-[#fbbf24]">65</span>:
            </CodeLine>
            <CodeLine n={3}>
              {"  "}
              <span className="text-[#7dd3fc]">print</span>(
              <span className="text-[#a8d05f]">&quot;Slow down!&quot;</span>)
            </CodeLine>
            <CodeLine n={4}>
              <span className="text-[#c084fc]">else</span>:
            </CodeLine>
            <CodeLine n={5}>
              {"  "}
              <span className="text-[#7dd3fc]">print</span>(
              <span className="text-[#a8d05f]">&quot;Drive safely.&quot;</span>)
            </CodeLine>
          </div>
          <div className="border-t border-white/10 bg-black/40 px-3 py-2 font-mono text-[11px] text-white/80">
            <span className="text-[#a8d05f]">$</span> Slow down!
            <div className="text-[#6b8f2b]">✔ Done</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Teacher dashboard: every student's code, live ──────────────────────── */
const STATUS: Record<
  string,
  { pill: string; dot: string; label: string }
> = {
  done: { pill: "bg-[#dcfce7] text-[#166534]", dot: "bg-[#22c55e]", label: "Done" },
  coding: { pill: "bg-[#fef9c3] text-[#854d0e]", dot: "bg-[#eab308]", label: "Coding" },
  help: { pill: "bg-[#fee2e2] text-[#991b1b]", dot: "bg-[#ef4444]", label: "Needs help" },
};

function StudentCard({
  initials,
  name,
  status,
  color,
  code,
}: {
  initials: string;
  name: string;
  status: keyof typeof STATUS;
  color: string;
  code: string;
}) {
  const s = STATUS[status];
  return (
    <div className="rounded-xl border border-[#e5e7eb] bg-white p-2.5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
            style={{ background: color }}
          >
            {initials}
          </span>
          <span className="truncate text-[11px] font-semibold text-[#1a1a1a]">
            {name}
          </span>
        </div>
        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${s.pill}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </div>
      <pre className="mt-2 overflow-hidden whitespace-pre rounded-md bg-[#1a1a1a] px-2 py-1.5 font-mono text-[9.5px] leading-relaxed text-[#e5e7eb]">
        {code}
      </pre>
    </div>
  );
}

function TeacherDemo() {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#a8d05f]/60 bg-[#f0f7e6] shadow-2xl">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a] px-4 py-2.5">
        <span className="text-[11px] font-semibold text-white">
          Teacher Dashboard
        </span>
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-white/90">
          <span className="rounded-full bg-white/20 px-2 py-0.5">Session 4821</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5">5 students</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-3.5">
        <StudentCard
          initials="AP"
          name="Aiden P."
          status="done"
          color="#60a5fa"
          code={"speed = 72\nif speed > 65:"}
        />
        <StudentCard
          initials="BO"
          name="Bea O."
          status="done"
          color="#f472b6"
          code={'print("Slow down!")'}
        />
        <StudentCard
          initials="CT"
          name="Casey T."
          status="coding"
          color="#fb923c"
          code={"if speed > 65|"}
        />
        <StudentCard
          initials="DA"
          name="Diego A."
          status="help"
          color="#a78bfa"
          code={'prin("Slow down)'}
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
        className="py-20 bg-gradient-to-b from-[#daf0c0] via-[#e8f5d8] to-[#daf0c0]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-8 md:px-12">
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1a1a1a] sm:text-5xl">
              One lesson, two live views
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-medium text-[#1a1a1a]/80">
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
