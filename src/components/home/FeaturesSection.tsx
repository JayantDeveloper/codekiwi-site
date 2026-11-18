import React from "react";
import { Blob, KiwiSlice } from "@/components/home/Decor";

import { Presentation, BadgeCheck, Hand } from "lucide-react";

interface Props {
  isVisible: boolean;
}

export const FeaturesSection = React.forwardRef<HTMLElement, Props>(
  ({ isVisible }, ref) => (
    <section
      id="features-section"
      ref={ref}
      className="relative overflow-hidden py-20 bg-[#E7F2D4]"
    >
      <Blob className="left-[7%] top-[14%] h-28 w-28 rotate-[45deg]" color="#D7E8B4" />
      <KiwiSlice className="-right-40 top-[30%] h-[24rem] w-[24rem] rotate-[-14deg]" rind="#CBDFA4" flesh="#DCEBC2" core="#EDF5DE" seed="#B6CF90" />
      <div className="relative z-10 px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-[#1E2A14] sm:text-5xl mb-4">
            Why Teachers Choose CodeKiwi
          </h2>
          <p className="text-lg text-[#55604A] max-w-4xl mx-auto font-medium">
            Built for high school CS classrooms. Keep your lesson, add live coding, and see who needs you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Presentation className="h-8 w-8 text-white" aria-hidden="true" />}
            title="Your slides, made live"
            description="Live-code a demo that every student mirrors as you type, then hand it back so they can try it themselves."
          />
          <FeatureCard
            icon={<BadgeCheck className="h-8 w-8 text-white" />}
            title="Auto-graded in the moment"
            description="Add test cases to any slide. Students see how many pass the moment they run, and you get a live score."
          />
          <FeatureCard
            icon={<Hand className="h-8 w-8 text-white" />}
            title="See who's stuck, live"
            description="One dashboard shows every student's code and status, and flags who is stuck so you can go straight to them."
          />
        </div>

      </div>
    </section>
  )
);
FeaturesSection.displayName = "FeaturesSection";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group flex flex-col items-center space-y-4 rounded-2xl border border-[#1E2A14]/10 bg-white p-8 shadow-[0_18px_40px_-24px_rgba(60,70,40,0.45)] transition-transform duration-300 hover:-translate-y-1">
      <div className="rounded-2xl bg-[#6b8f2b] p-4 transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <h3 className="text-center text-2xl font-bold text-[#1E2A14]">{title}</h3>
      <p className="text-center text-[#4C5742] leading-relaxed font-medium">{description}</p>
    </div>
  );
}
