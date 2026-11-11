"use client";

/**
 * Code being written by a person, not revealed by a machine.
 *
 * Three things make it read as human rather than as a teleprompter:
 *   - per-character delay is jittered, and slower after punctuation
 *   - it pauses mid-thought, not just at line ends
 *   - it makes mistakes and backspaces them
 *
 * Syntax colour is applied to whatever has been typed so far, so a half-typed
 * string literal is already green and a half-typed keyword is not yet purple,
 * the way a real editor behaves.
 */

import { useEffect, useRef, useState } from "react";

export type Op =
  | { type: string }
  | { del: number }
  | { pause: number };

/** Short loops for the dashboard cards: each student mid-thought. */
export const CASEY: Op[] = [
  { type: "if speed > 65" },
  { pause: 900 },
  { type: ":" },
  { pause: 1400 },
  { del: 13 },
  { pause: 500 },
  { type: "if speed >" },
  { pause: 700 },
  { type: " 65" },
  { pause: 1600 },
];
export const FARAH: Op[] = [
  { type: "else:\n  prin" },
  { pause: 620 },
  { del: 4 },
  { type: "print(" },
  { pause: 1500 },
  { del: 6 },
  { pause: 400 },
  { type: "print(" },
  { pause: 1500 },
];

/** Writes the Speed Checker exercise, fumbling twice on the way. */
export const SPEED_CHECKER: Op[] = [
  { type: "speed = 72\n" },
  { pause: 260 },
  { type: "if speed > 6" },
  { type: "4" }, // wrong threshold
  { pause: 480 },
  { del: 1 },
  { type: "5:\n" },
  { pause: 180 },
  { type: "    prnt" }, // typo
  { pause: 420 },
  { del: 4 },
  { type: 'print("Slow down!")\n' },
  { pause: 240 },
  { type: "else:\n" },
  { type: '    print("Drive safely.")' },
];

const KEYWORDS = /^(if|else|elif|for|while|def|return|in|not|and|or|True|False|None)$/;
const BUILTINS = /^(print|range|len|int|str|input|float)$/;

/** Colours a partial source string. Tolerates unterminated tokens. */
function paint(src: string) {
  const out: React.ReactNode[] = [];
  const re = /("(?:[^"\\]|\\.)*"?)|(\d+)|([A-Za-z_]\w*)|(\s+)|([^\s])/g;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(src))) {
    const [tok, str, num, word, ws] = m;
    let cls = "text-[#e5e7eb]";
    if (str) cls = "text-[#a8d05f]";
    else if (num) cls = "text-[#fbbf24]";
    else if (word) cls = KEYWORDS.test(word) ? "text-[#c084fc]" : BUILTINS.test(word) ? "text-[#7dd3fc]" : "text-[#e5e7eb]";
    else if (ws) cls = "";
    out.push(
      <span key={i++} className={cls}>
        {tok}
      </span>
    );
  }
  return out;
}

/** Jittered keystroke delay. Slower after punctuation, quicker mid-word. */
function keyDelay(ch: string) {
  const base = 34 + Math.random() * 46;
  if ("(){}[]\":".includes(ch)) return base + 70 + Math.random() * 90;
  if (ch === "\n") return base + 160 + Math.random() * 160;
  if (ch === " ") return base + 20;
  return base;
}

export function TypingCode({
  script,
  active,
  onDone,
  className,
  showLineNumbers = true,
}: {
  script: Op[];
  active: boolean;
  onDone?: (done: boolean) => void;
  className?: string;
  showLineNumbers?: boolean;
}) {
  const [text, setText] = useState("");
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
    if (!active) return;

    // Reduced motion gets the finished program, no keystrokes at all.
    if (reduce) {
      const full = script.reduce((acc, op) => {
        if ("type" in op) return acc + op.type;
        if ("del" in op) return acc.slice(0, -op.del);
        return acc;
      }, "");
      setText(full);
      onDone?.(true);
      return;
    }

    let cancelled = false;
    let buf = "";
    let oi = 0;
    let ci = 0;

    const step = () => {
      if (cancelled) return;
      if (oi >= script.length) {
        onDone?.(true);
        // hold the finished program, then start over
        timer.current = setTimeout(() => {
          if (cancelled) return;
          buf = ""; oi = 0; ci = 0;
          setText(""); onDone?.(false);
          step();
        }, 5200);
        return;
      }
      const op = script[oi];

      if ("pause" in op) {
        oi++;
        timer.current = setTimeout(step, op.pause);
        return;
      }
      if ("del" in op) {
        if (ci < op.del) {
          buf = buf.slice(0, -1);
          ci++;
          setText(buf);
          timer.current = setTimeout(step, 55 + Math.random() * 45);
          return;
        }
        oi++; ci = 0;
        timer.current = setTimeout(step, 120);
        return;
      }
      if (ci < op.type.length) {
        const ch = op.type[ci++];
        buf += ch;
        setText(buf);
        timer.current = setTimeout(step, keyDelay(ch));
        return;
      }
      oi++; ci = 0;
      step();
    };

    step();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, reduce, script, onDone]);

  const lines = text.split("\n");

  return (
    <div className={className}>
      {lines.map((ln, i) => (
        <div key={i} className="flex">
          {showLineNumbers && (
            <span className="w-5 shrink-0 select-none pr-2 text-right text-[#4b5563]">
              {i + 1}
            </span>
          )}
          <span className="whitespace-pre">
            {paint(ln)}
            {i === lines.length - 1 && !reduce && (
              <span className="ck-caret inline-block align-middle">
                <span className="inline-block h-[1.05em] w-[0.5ch] translate-y-[0.12em] bg-[#a8d05f]" />
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
