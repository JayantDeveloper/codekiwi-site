"use client";

import { useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  type MotionValue,
} from "framer-motion";

// Words rendered in the brand gradient once resolved.
const ACCENT = new Set(["live", "coding", "classroom."]);

const STATEMENT =
  "Every slide becomes a live coding classroom. Students write, run, and learn together in real time.";

const GLYPHS = "{}[]()<>/=+*#;:$&?%!01".split("");

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

function DecryptWord({
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
  // SSR renders the real word (SEO + no-JS); it scrambles after hydration.
  const [display, setDisplay] = useState(children);
  const [resolved, setResolved] = useState(true);

  const update = (v: number) => {
    const [start, end] = range;
    const t = clamp01((v - start) / (end - start));
    if (t >= 1) {
      setDisplay(children);
      setResolved(true);
      return;
    }
    setResolved(false);
    const chars = children.split("");
    const resolvedCount = Math.floor(t * chars.length);
    setDisplay(
      chars
        .map((c, i) => (i < resolvedCount ? c : randomGlyph()))
        .join("")
    );
  };

  useMotionValueEvent(progress, "change", update);

  // Initialize from current scroll position after hydration so
  // below-the-fold words start scrambled.
  useEffect(() => {
    update(progress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      className={`mr-[0.32em] inline-block whitespace-nowrap transition-colors duration-200 ${
        resolved
          ? accent
            ? "bg-gradient-to-r from-[#a8d05f] to-[#7da332] bg-clip-text text-transparent"
            : "text-white"
          : "text-[#8fb73a]/60"
      }`}
    >
      {display}
    </span>
  );
}

export function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.5"],
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
                <DecryptWord
                  key={i}
                  progress={scrollYProgress}
                  range={[start, end]}
                  accent={ACCENT.has(word.toLowerCase())}
                >
                  {word}
                </DecryptWord>
              );
            })}
      </p>
    </section>
  );
}
