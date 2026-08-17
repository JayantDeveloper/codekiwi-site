import React from "react";
import Link from "next/link";
import { Presentation, BadgeCheck, Hand, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  isVisible: boolean;
}

export const FeaturesSection = React.forwardRef<HTMLElement, Props>(
  ({ isVisible }, ref) => (
    <section
      id="features-section"
      ref={ref}
      className="py-20 bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]"
    >
      <div className="px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Why Teachers Choose CodeKiwi
          </h2>
          <p className="text-lg text-[#a8d05f] max-w-2xl mx-auto font-medium">
            Built for high school CS classrooms. Keep your lesson, add live coding, and see who needs you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<Presentation className="h-8 w-8 text-white" />}
            title="Your slides, made live"
            description="Keep the deck you already teach from. CodeKiwi drops a code editor right beside it. Live-code a demo that every student mirrors in real time, then hand it back so they try it themselves."
          />
          <FeatureCard
            icon={<BadgeCheck className="h-8 w-8 text-white" />}
            title="Auto-graded in the moment"
            description="Set an expected answer on any coding slide. Students see correct or not-quite the instant they run, and you get a running score for each one."
          />
          <FeatureCard
            icon={<Hand className="h-8 w-8 text-white" />}
            title="See who's stuck, live"
            description="One dashboard shows every student's code and status, and flags the moment someone raises their hand or gets stuck, so you can walk straight to them."
          />
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
  )
);
FeaturesSection.displayName = "FeaturesSection";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="group flex flex-col items-center space-y-4 rounded-2xl border-2 border-[#a8d05f] bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 shadow-lg hover:shadow-2xl hover:border-[#6b8f2b] hover:bg-gradient-to-br hover:from-[#2a2a2a] hover:to-[#1a1a1a] transition-all duration-300 hover:-translate-y-2">
      <div className="rounded-2xl bg-gradient-to-br from-[#6b8f2b] to-[#8fb73a] p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <p className="text-center text-[#a8d05f] leading-relaxed font-medium">{description}</p>
    </div>
  );
}
