"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

// Words 4+ render in the brand gradient once fully typed.
const WORDS = ["Turn", "Your", "Slides", "into", "Live", "Coding", "Lessons"];
const GRADIENT_FROM = 4;
const HEADLINE = WORDS.join(" ");

// Same typewriter pace as the scroll statement.
const PER_CHAR_MS = 38;
const TYPE_MS = HEADLINE.length * PER_CHAR_MS;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const clampInt = (v: number, max: number) => Math.min(max, Math.max(0, v));

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  // Character start index of each headline word (single-space joined).
  const starts: number[] = [];
  {
    let idx = 0;
    for (const w of WORDS) {
      starts.push(idx);
      idx += w.length + 1;
    }
  }
  const total = HEADLINE.length;

  // Types in on page load (hero is above the fold). Starts empty.
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (reduceMotion) {
      setCount(total);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / TYPE_MS);
      setCount(Math.round(t * total));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, total]);

  // The word currently being typed (first not fully revealed); -1 when complete.
  let activeWord = -1;
  if (count < total) {
    for (let i = 0; i < WORDS.length; i++) {
      if (count < starts[i] + WORDS[i].length) {
        activeWord = i;
        break;
      }
    }
  }

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${mouseX}% ${mouseY}%, rgba(168, 208, 95, 0.16), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-[#0d0d0d] via-[#1a1a1a] to-[#0d0d0d]"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: "radial-gradient(circle, #a8d05f 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#a8d05f]/30 rounded-full blur-3xl animate-aurora-1" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#6b8f2b]/30 rounded-full blur-3xl animate-aurora-2" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-[#8fb73a]/25 rounded-full blur-3xl animate-aurora-3" />
      </div>

      {!reduceMotion && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: spotlight }}
        />
      )}

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center px-4 sm:px-8 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-6 max-w-4xl">
          {/* Real heading for SEO + screen readers; the animated version is decorative. */}
          <h1 className="sr-only">{HEADLINE}</h1>
          <div
            aria-hidden="true"
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-tight"
          >
            {WORDS.map((word, i) => {
              const revealed = clampInt(count - starts[i], word.length);
              const fully = revealed >= word.length;
              const cls =
                fully && i >= GRADIENT_FROM
                  ? "bg-gradient-to-r from-[#a8d05f] via-[#d3ec9c] to-[#6b8f2b] bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]"
                  : "text-white";
              return (
                <span key={word}>
                  {i === GRADIENT_FROM && <br className="hidden sm:block" />}
                  <span
                    className={`inline-block whitespace-nowrap transition-colors duration-200 ${cls}`}
                  >
                    <span>{word.slice(0, revealed)}</span>
                    <span className="opacity-0">{word.slice(revealed)}</span>
                    {activeWord === i && (
                      <span className="ck-type-caret text-[#a8d05f]">▌</span>
                    )}
                  </span>
                  {i < WORDS.length - 1 ? " " : ""}
                </span>
              );
            })}
          </div>
          <p
            className="mx-auto max-w-[700px] text-lg text-[#a8d05f] md:text-xl leading-relaxed animate-fade-in font-medium"
            style={{ animationDelay: "800ms" }}
          >
            Sync Google Slides™ with a live code editor. Monitor student progress
            in real-time and make coding lessons engaging.
          </p>
        </div>

        <div
          className="flex flex-col gap-4 sm:flex-row animate-fade-in"
          style={{ animationDelay: "950ms" }}
        >
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 text-base px-8"
          >
            <Link href="/signup">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Get Started with Google
            </Link>
          </Button>
          <Link href="/signup">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#a8d05f] text-[#a8d05f] hover:bg-[#a8d05f] hover:text-[#1a1a1a] shadow-md hover:shadow-lg hover:scale-[1.03] transition-all duration-300 bg-transparent text-base px-8"
            >
              Create Account
            </Button>
          </Link>
        </div>

        <p
          className="text-sm text-[#a8d05f] animate-fade-in font-medium"
          style={{ animationDelay: "1100ms" }}
        >
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-bold text-white hover:text-[#a8d05f] transition-colors hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <style jsx>{`
        .ck-type-caret {
          animation: ckTypeBlink 1s steps(1, end) infinite;
        }
        @keyframes ckTypeBlink {
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
