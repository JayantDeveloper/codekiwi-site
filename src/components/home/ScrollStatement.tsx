"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Words rendered in the brand gradient instead of white.
const ACCENT = new Set(["live", "coding", "classroom."]);

const STATEMENT =
  "Every slide becomes a live coding classroom. Students write, run, and learn together in real time.";

function Word({
  progress,
  range,
  children,
  accent,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: string;
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [18, 0]);

  return (
    <span className="relative mr-[0.32em] inline-block overflow-hidden pb-1">
      <motion.span
        style={{ opacity, y }}
        className={`inline-block ${
          accent
            ? "bg-gradient-to-r from-[#a8d05f] to-[#7da332] bg-clip-text text-transparent"
            : "text-white"
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  const words = STATEMENT.split(" ");

  return (
    <section ref={ref} className="bg-[#161616] py-24 md:py-32">
      <p className="mx-auto flex max-w-4xl flex-wrap px-6 text-4xl font-bold leading-tight tracking-tight sm:px-8 md:text-5xl lg:text-6xl">
        {reduceMotion
          ? words.map((word, i) => (
              <span
                key={i}
                className={`mr-[0.32em] inline-block ${
                  ACCENT.has(word.toLowerCase())
                    ? "bg-gradient-to-r from-[#a8d05f] to-[#7da332] bg-clip-text text-transparent"
                    : "text-white"
                }`}
              >
                {word}
              </span>
            ))
          : words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <Word
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  accent={ACCENT.has(word.toLowerCase())}
                >
                  {word}
                </Word>
              );
            })}
      </p>
    </section>
  );
}
