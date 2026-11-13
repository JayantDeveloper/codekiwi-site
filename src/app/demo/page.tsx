import type { Metadata } from "next";
import { Suspense } from "react";
import { Presentation, Eye, CheckCircle2 } from "lucide-react";
import { MARKETPLACE_LISTING_URL } from "@/lib/marketplace";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MarketplaceBadge } from "@/components/MarketplaceBadge";
import { DemoForm } from "@/components/demo/DemoForm";

export const metadata: Metadata = {
  title: "Contact | CodeKiwi",
  description:
    "Questions about CodeKiwi, bug reports, or wanting to try it with a class. Jayant built it and answers his own email.",
};

const POINTS = [
  {
    icon: Presentation,
    title: "Teaching questions",
    body: "Whether it fits your course, which languages it runs, how it behaves on Chromebooks, or what students need to join a session.",
  },
  {
    icon: Eye,
    title: "Bugs and requests",
    body: "If something breaks in a real lesson, tell me and it goes to the front of the queue. Most fixes ship within days.",
  },
  {
    icon: CheckCircle2,
    title: "Running it with a class",
    body: "Tell me which class and when, and I will keep an eye on your first session so anything that goes wrong gets fixed the same week.",
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
              Contact
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight text-[#1E2A14] sm:text-5xl">
              Talk to the person who built it
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#55604A]">
              I built every part of CodeKiwi, the Slides add-on, both apps, the
              sync server and the code sandbox. There is no support queue in
              between. Whatever you send here comes straight to me.
            </p>
            <p className="mt-4 max-w-xl text-[#6F7A62]">
              You do not need to wait on a reply to get going. CodeKiwi is free
              and{" "}
              <a
                href={MARKETPLACE_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#2F4A1C] underline underline-offset-4"
              >
                installs from the Marketplace
              </a>{" "}
              in about a minute.
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
