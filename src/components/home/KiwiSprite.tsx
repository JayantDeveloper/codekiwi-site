"use client";

/**
 * The logo as a 32-frame sprite.
 *
 * Sheet: /kiwi-sheet.png, 32 frames of 128x128 laid out horizontally.
 *
 *   0-7   typing, code glyphs streaming above the screen, one blink
 *   8-12  the laptop wobbles and settles (the code is running)
 *   13-17 it failed: red X above the lid, he deflates, then sets his jaw
 *   18-23 typing again
 *   24-27 wobble and settle again
 *   28-31 it passed: green check, he grins, then settles
 *
 * Everything that moves is a drawn frame. Nothing here is tweened, because
 * easing a transform resamples the pixel grid and turns the art to mush. The
 * only animated property is backgroundPosition, in whole-frame jumps.
 *
 * Three lessons are baked into the art pipeline that produced this sheet:
 *   - a part's mask must include the dark outline hugging it, or the outline
 *     stays behind when the part moves
 *   - the hole left by a moved part is refilled per row, not by neighbour
 *     averaging, which smeared backdrop and desk into a visible ghost
 *   - both eyes are drawn on an identical pale socket, otherwise the left eye
 *     straddles the core/flesh boundary and its white highlight reads green
 */

import { useEffect, useRef, useState } from "react";

/* The symbols above the lid are deliberately NOT part of the sprite. Drawn as
   pixels they were muddy at this size; as vectors they stay thick and crisp at
   any scale. They sit above the laptop lid, whose top edge is y=68 of 128. */
function Check() {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
      <path d="M6 17.5 L13 24.5 L26 8" stroke="#2F4A1C" strokeWidth="7.5"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
      <path d="M6 16.5 L13 23.5 L26 7" stroke="#6FA82B" strokeWidth="6"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg viewBox="0 0 32 32" className="h-full w-full" fill="none">
      <g stroke="#8E2F22" strokeWidth="7.5" strokeLinecap="round" opacity="0.25">
        <path d="M8 9 L24 25" /><path d="M24 9 L8 25" />
      </g>
      <g stroke="#D6513C" strokeWidth="6" strokeLinecap="round">
        <path d="M8 8 L24 24" /><path d="M24 8 L8 24" />
      </g>
    </svg>
  );
}

/* Code streaming off the keyboard: clean rounded bars, not pixels. */
const BARS = [
  [[0, 12], [16, 7], [8, 10]],
  [[10, 9], [4, 14], [14, 6]],
  [[6, 10], [12, 8], [2, 13]],
  [[14, 7], [8, 12], [11, 9]],
];
function CodeBars({ phase }: { phase: number }) {
  return (
    <svg viewBox="0 0 24 16" className="h-full w-full">
      {BARS[phase % BARS.length].map(([x, w], i) => (
        <rect key={i} x={x} y={i * 5.5 + 0.5} width={w} height="3.2" rx="1.6" fill="#6FA82B" />
      ))}
    </svg>
  );
}

const FRAMES = 32;

/** [frame index, milliseconds] */
type Step = [number, number];

const SEQ: Step[] = [
  // writing code. Deliberately the longest beat of the loop: he should read as
  // actually working, not as a slot machine cycling to a result.
  [0, 150], [1, 150], [2, 150], [3, 150], [4, 150], [6, 150], [7, 150],
  [5, 110],
  [0, 150], [1, 150], [2, 150], [3, 150], [4, 150], [6, 150], [7, 150],
  [2, 150], [3, 150],
  [5, 110],
  [0, 150], [1, 150], [2, 150], [4, 150], [6, 150], [7, 150],
  // run it: wobble, decaying, then still
  [8, 70], [9, 70], [8, 70], [9, 70], [10, 70], [11, 70], [10, 80], [11, 80],
  [12, 320],
  // it failed
  [13, 460], [14, 420], [15, 380], [16, 120], [14, 300], [17, 520],
  // try again
  [18, 160], [19, 160], [20, 150], [21, 150], [22, 150],
  [23, 110],
  [20, 150], [21, 150], [22, 150], [18, 150], [19, 150], [20, 150],
  [21, 150], [22, 150],
  // run it again
  [24, 70], [25, 70], [24, 70], [25, 70], [26, 70], [27, 80],
  [27, 260],
  // it passed
  [28, 520], [29, 280], [30, 280], [29, 280], [30, 320],
  [31, 620],
];

export function KiwiSprite({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const [reduce, setReduce] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return;
    timer.current = setTimeout(
      () => setStep((s) => (s + 1) % SEQ.length),
      SEQ[step][1]
    );
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [step, reduce]);

  const frame = reduce ? 0 : SEQ[step][0];
  const typing = frame <= 7 || (frame >= 18 && frame <= 23);
  const failed = frame >= 13 && frame <= 17;
  const passed = frame >= 28;

  return (
    <div className={`relative aspect-square overflow-hidden rounded-full ${className ?? ""}`}>
      <div
        role="img"
        aria-label="The CodeKiwi mascot writing code, running it, fixing an error, then getting it to pass"
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/kiwi-sheet.png)",
          backgroundSize: `${FRAMES * 100}% 100%`,
          backgroundPosition: `${(frame / (FRAMES - 1)) * 100}% 0%`,
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />

      {/* The result rises OUT of the laptop.
          The wrapper's bottom edge sits on the lid's top edge (y=68 of 128,
          so 53% down the frame) and clips its contents, so the symbol starts
          fully hidden behind the screen and is revealed as it travels up.
          Fading it in above the lid never read as emerging; being occluded by
          the laptop is what sells it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[20%] top-[28%] h-[25%] w-[12%] overflow-hidden"
      >
        <div
          className="absolute inset-x-0 bottom-0 aspect-square"
          style={{
            transform: passed ? "translateY(-92%) scale(1)" : "translateY(104%) scale(0.55)",
            opacity: passed ? 1 : 0,
            // overshoot on the way out, so it pops rather than slides
            transition: "transform 420ms cubic-bezier(.34,1.56,.64,1), opacity 120ms linear",
          }}
        >
          <Check />
        </div>
        <div
          className="absolute inset-x-0 bottom-0 aspect-square"
          style={{
            transform: failed ? "translateY(-92%) scale(1)" : "translateY(104%) scale(0.55)",
            opacity: failed ? 1 : 0,
            transition: "transform 420ms cubic-bezier(.34,1.56,.64,1), opacity 120ms linear",
          }}
        >
          <Cross />
        </div>
      </div>

      {/* code streaming off the keyboard while he types */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[18%] top-[30%] h-[12%] w-[18%] transition-opacity duration-100"
        style={{ opacity: typing ? 1 : 0 }}
      >
        <CodeBars phase={frame} />
      </div>
    </div>
  );
}
