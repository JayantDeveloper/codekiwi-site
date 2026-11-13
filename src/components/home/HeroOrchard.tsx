"use client";

/**
 * Warm split hero: copy on the left, animated mascot on the right, over a cream
 * ground with tonal kiwi slices at three depths.
 *
 * Depth comes from scroll parallax, not from blur. Each background layer
 * translates at a different rate as the hero scrolls away: the farthest lags
 * most, the nearest barely moves. The copy and mascot drift the other way,
 * slightly faster than the page, which reads as "nearest to the viewer".
 *
 * Everything is a flat fill. No blur, no gradient wash, no canvas.
 */

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { MarketplaceBadge } from "@/components/MarketplaceBadge";
import { KiwiSlice } from "@/components/home/Decor";
import { KiwiSprite } from "@/components/home/KiwiSprite";
import GoogleIcon from "@/components/GoogleIcon";


export function HeroOrchard() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // 0 while the hero fills the viewport, 1 once it has scrolled fully out.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const d = (px: number) => (reduce ? 0 : px);
  const yFar = useTransform(scrollYProgress, [0, 1], [0, d(150)]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, d(62)]);
  const yNear = useTransform(scrollYProgress, [0, 1], [0, d(22)]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, d(-70)]);
  const copyFade = useTransform(scrollYProgress, [0, 0.55, 1], [1, 1, 0.35]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[86vh] items-center overflow-hidden bg-[#FBF7EC] py-20 md:py-28"
    >
      {/* Background: kiwi slices at two depths plus one plain blob, so the
          motif repeats without becoming wallpaper. All tonal, all cropped. */}
      <motion.div
        aria-hidden="true"
        style={{ y: yFar }}
        className="pointer-events-none absolute -right-36 -top-44 h-[32rem] w-[32rem]"
      >
        <KiwiSlice
          className="inset-0 h-full w-full"
          rind="#EFE6D2"
          flesh="#F4EFE0"
          core="#FAF6EC"
          seed="#E6DCC6"
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={{ y: yMid }}
        className="pointer-events-none absolute -left-52 -bottom-72 h-[36rem] w-[36rem] rotate-[18deg] rounded-[62%_38%_55%_45%/50%_62%_38%_50%] bg-[#EEF3E3]"
      />

      <motion.div
        aria-hidden="true"
        style={{ y: yNear }}
        className="pointer-events-none absolute -left-16 top-[14%] hidden h-[11rem] w-[11rem] rotate-[-12deg] lg:block"
      >
        <KiwiSlice
          className="inset-0 h-full w-full"
          rind="#DCE8C4"
          flesh="#E8F1D6"
          core="#F3F8E9"
          seed="#CBDCAC"
        />
      </motion.div>

      <motion.div
        style={{ y: yCopy, opacity: copyFade }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-8 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10"
      >
        {/* left: the words */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[#1E2A14] sm:text-5xl md:text-6xl">
            Turn your slides into{" "}
            <span className="text-[#5A7A23]">live coding lessons</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#55604A] lg:mx-0">
            Sync Google Slides with a live code editor. Watch every
            student&apos;s work update in real time and see who is stuck while
            there is still time to help.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-[#2F4A1C] px-8 text-base text-white transition-colors duration-200 hover:bg-[#243915]"
            >
              <Link href="/signup">
                <GoogleIcon className="mr-2 h-5 w-5" />
                Get Started with Google
              </Link>
            </Button>
            <Link
              href="/demo"
              className="rounded-full border border-[#1E2A14]/20 bg-white/70 px-8 py-3 text-base font-semibold text-[#1E2A14] transition-colors duration-200 hover:bg-white"
            >
              Book a demo
            </Link>
          </div>

          <div className="mt-6 flex justify-center lg:justify-start">
            <MarketplaceBadge height={38} />
          </div>

          <p className="mt-4 text-sm text-[#6F7A62]">
            <Link
              href="/features"
              className="font-semibold text-[#2F4A1C] underline-offset-4 hover:underline"
            >
              See how it works
            </Link>
            <span className="px-2 text-[#B5BFA6]">·</span>
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-semibold text-[#2F4A1C] underline-offset-4 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        {/* right: the mascot, as a real 8-frame sprite. See KiwiSprite. */}
        <div className="flex justify-center lg:justify-end">
          <KiwiSprite className="w-[300px] sm:w-[360px] lg:w-[420px]" />
        </div>
      </motion.div>
    </section>
  );
}
