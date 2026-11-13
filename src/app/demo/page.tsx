import type { Metadata } from "next";
import { Suspense } from "react";
import { Presentation, Eye, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MarketplaceBadge } from "@/components/MarketplaceBadge";
import { DemoForm } from "@/components/demo/DemoForm";

export const metadata: Metadata = {
  title: "Book a demo | CodeKiwi",
  description:
    "See CodeKiwi running in a real lesson. Students code beside your slide while you watch every student's work update live.",
};

const POINTS = [
  {
    icon: Presentation,
    title: "Keep the lessons you already have",
    body: "Mark any slide in your existing Google Slides deck as a coding question. Nothing gets rebuilt.",
  },
  {
    icon: Eye,
    title: "See who is stuck, while it still helps",
    body: "The dashboard shows every student's code and run status live, so you reach them before the period ends.",
  },
  {
    icon: CheckCircle2,
    title: "Grading that already happened",
    body: "Every run is checked against your test cases the moment it runs. No stack of 30 programs to take home.",
  },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[#FBF7EC]">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-8 md:px-12 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Left: the reason to bother */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-[#5A7A23]">
              Book a demo
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-[#1E2A14] sm:text-5xl">
              See it running in a real lesson
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#55604A]">
              Fifteen minutes, your own slides, no setup on your end. Tell us what
              you teach and we will walk through exactly how a class period would
              run.
            </p>

            <ul className="mt-10 flex flex-col gap-7">
              {POINTS.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E7F2D4]">
                    <Icon className="h-5 w-5 text-[#2F4A1C]" />
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-semibold text-[#1E2A14]">{title}</h2>
                    <p className="mt-1 text-[#55604A]">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <MarketplaceBadge height={38} />
            </div>
          </div>

          {/* Right: the form */}
          <div className="rounded-3xl border border-[#1E2A14]/10 bg-white p-6 shadow-sm sm:p-9">
            <Suspense
              fallback={
                <div className="h-[520px] animate-pulse rounded-2xl bg-[#F2EEE2]" />
              }
            >
              <DemoForm />
            </Suspense>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
