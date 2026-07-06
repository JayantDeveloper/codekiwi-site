"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function VelocityRow({
  children,
  baseVelocity,
  className,
  outline = false,
}: {
  children: string;
  baseVelocity: number;
  className?: string;
  outline?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const directionFactor = useRef(baseVelocity < 0 ? -1 : 1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = baseVelocity < 0 ? 1 : -1;
    else if (vf > 0) directionFactor.current = baseVelocity < 0 ? -1 : 1;
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className={`flex whitespace-nowrap text-5xl md:text-7xl font-bold tracking-tight uppercase select-none ${className ?? ""}`}
        style={{
          x,
          ...(outline
            ? { WebkitTextStroke: "1.5px rgba(168, 208, 95, 0.6)" }
            : {}),
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="mr-8">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const ROW_1 = "Sync Slides ✦ Live Code ✦ Real-Time Feedback ✦";
const ROW_2 = "Python ✦ JavaScript ✦ Teach Live ✦ No Installs ✦";

export function ScrollMarquee() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <section className="bg-[#161616] py-14 overflow-hidden">
        <p className="text-center text-3xl font-bold uppercase tracking-tight text-[#a8d05f]/90">
          Sync Slides ✦ Live Code ✦ Real-Time Feedback
        </p>
      </section>
    );
  }

  return (
    <section aria-hidden className="bg-[#161616] py-16 overflow-hidden">
      <div className="-rotate-[1.5deg] scale-[1.02] space-y-4">
        <VelocityRow baseVelocity={2.2} className="text-[#a8d05f]/90">
          {ROW_1}
        </VelocityRow>
        <VelocityRow baseVelocity={-2.2} className="text-transparent" outline>
          {ROW_2}
        </VelocityRow>
      </div>
    </section>
  );
}
