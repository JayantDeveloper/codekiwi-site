"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSection } from "@/components/home/HeroSection";
import { DemoSection } from "@/components/home/DemoSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ScrollStatement } from "@/components/home/ScrollStatement";
import { LandingFooter } from "@/components/home/LandingFooter";

const SECTION_KEYS = {
  "demo-section": "demo",
  "features-section": "features",
} as const;

type SectionKey = (typeof SECTION_KEYS)[keyof typeof SECTION_KEYS];

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState<Record<SectionKey, boolean>>({
    demo: false,
    features: false,
  });

  const demoRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = SECTION_KEYS[entry.target.id as keyof typeof SECTION_KEYS];
          if (key) setIsVisible((prev) => ({ ...prev, [key]: true }));
        });
      },
      { threshold: 0.2 }
    );

    if (demoRef.current) observer.observe(demoRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <ReactLenis root>
    <div className="flex min-h-screen flex-col bg-[#161616]">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <DemoSection ref={demoRef} isVisible={isVisible.demo} />
        <ScrollStatement />
        <FeaturesSection ref={featuresRef} isVisible={isVisible.features} />
      </main>
      <LandingFooter />
    </div>
    </ReactLenis>
  );
}
