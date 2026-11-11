import React from "react";
import { Blob, KiwiSlice } from "@/components/home/Decor";

import { GraduationCap, Presentation } from "lucide-react";

interface Step {
  n: number;
  text: string;
}

const STUDENT_STEPS: Step[] = [
  { n: 1, text: "Open the link your teacher shares and type your name. No account, no install." },
  { n: 2, text: "Follow along on the same slide, with a code editor right beside it." },
  { n: 3, text: "Write and run code, see instantly if your answer is right, and raise a hand if you're stuck." },
];

const TEACHER_STEPS: Step[] = [
  { n: 1, text: "Open the CodeKiwi add-on in the Google Slides deck you already teach from." },
  { n: 2, text: "Mark any slide as a coding question and set the answer it should be graded against." },
  { n: 3, text: "Start the lesson and watch every student's code, score, and who needs help, live." },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24 bg-[#FBF7EC]">
      <Blob className="-right-28 -bottom-16 h-[24rem] w-[24rem]" color="#F1E7D4" />
      <KiwiSlice className="left-[9%] top-[13%] h-28 w-28 rotate-[18deg]" rind="#EADDC6" flesh="#F3EBDB" core="#FAF5EA" seed="#DFD2B8" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 md:px-12">
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-[#1E2A14] sm:text-5xl">
            From slides to running code in minutes
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-[#55604A]">
            Here is what it looks like on both sides of the room.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <StepColumn
            badge="Students"
            icon={<GraduationCap className="h-5 w-5" />}
            heading="Join and start coding"
            steps={STUDENT_STEPS}
          />
          <StepColumn
            badge="Teachers"
            icon={<Presentation className="h-5 w-5" />}
            heading="Run your classroom"
            steps={TEACHER_STEPS}
          />
        </div>
      </div>
    </section>
  );
}

function StepColumn({
  badge,
  icon,
  heading,
  steps,
}: {
  badge: string;
  icon: React.ReactNode;
  heading: string;
  steps: Step[];
}) {
  return (
    <div className="rounded-3xl border border-[#1E2A14]/10 bg-white p-7 shadow-[0_18px_40px_-24px_rgba(60,70,40,0.45)] sm:p-9">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6b8f2b] text-white">
          {icon}
        </span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#6b8f2b]">
            {badge}
          </span>
          <h3 className="text-xl font-bold text-[#1E2A14]">{heading}</h3>
        </div>
      </div>

      <ol className="space-y-5">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6b8f2b] text-sm font-bold text-white">
              {s.n}
            </span>
            <p className="pt-1 text-[15px] font-medium leading-relaxed text-[#4C5742]">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
