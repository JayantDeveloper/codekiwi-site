"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

// Words rendered in the brand gradient once fully typed.
const ACCENT = new Set(["live", "coding", "classroom."]);

const STATEMENT =
  "Every slide becomes a live coding classroom. Students write, run, and learn together in real time.";

const TYPE_MS = 1600;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const clampInt = (v: number, max: number) => Math.min(max, Math.max(0, v));

export function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Fires once, the first time the section scrolls into view. Never toggles back.
  const inView = useInView(ref, { once: true, amount: 0.35 });

  const words = STATEMENT.split(" ");
  const total = STATEMENT.length;
  // Character start index of each word within STATEMENT (single-space joined).
  const starts: number[] = [];
  {
    let idx = 0;
    for (const w of words) {
      starts.push(idx);
      idx += w.length + 1;
    }
  }

  // Starts empty; types in ONCE when scrolled into view; scrolling back up never erases it.
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(total);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = clamp01((now - start) / TYPE_MS);
      setCount(Math.round(t * total));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduceMotion, total]);

  // The word currently being typed (first not fully revealed); -1 when complete.
  let activeWord = -1;
  if (count < total) {
    for (let i = 0; i < words.length; i++) {
      if (count < starts[i] + words[i].length) {
        activeWord = i;
        break;
      }
    }
  }

  return (
    <section ref={ref} className="bg-[#161616] py-24 md:py-32">
      {/* Full text for SEO + screen readers; the animated version below is decorative. */}
      <span className="sr-only">{STATEMENT}</span>
      <p
        aria-hidden="true"
        className="mx-auto flex max-w-4xl flex-wrap px-6 text-4xl font-bold leading-tight tracking-tight sm:px-8 md:text-5xl lg:text-6xl"
      >
        {words.map((word, i) => {
          const revealed = clampInt(count - starts[i], word.length);
          const accent = ACCENT.has(word.toLowerCase());
          const fully = revealed >= word.length;
          return (
            <span
              key={i}
              className={`mr-[0.32em] inline-block whitespace-nowrap ${
                fully && accent
                  ? "bg-gradient-to-r from-[#a8d05f] to-[#7da332] bg-clip-text text-transparent"
                  : "text-white"
              }`}
            >
              <span>{word.slice(0, revealed)}</span>
              {/* keeps layout stable so nothing reflows as it types */}
              <span className="opacity-0">{word.slice(revealed)}</span>
              {activeWord === i && (
                <span className="ck-type-caret text-[#a8d05f]">▌</span>
              )}
            </span>
          );
        })}
      </p>
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
