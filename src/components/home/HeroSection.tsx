"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/GoogleIcon";

const HEADLINE_WORDS = ["Turn", "Your", "Slides", "into"];
const GRADIENT_WORDS = ["Live", "Coding", "Lessons"];

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  }),
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();
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
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl leading-tight">
            {HEADLINE_WORDS.map((word, i) => (
              <motion.span
                key={word + i}
                className="inline-block"
                custom={i}
                initial={reduceMotion ? undefined : "hidden"}
                animate="visible"
                variants={wordVariants}
              >
                {word}
                {" "}
              </motion.span>
            ))}
            <br className="hidden sm:block" />
            {GRADIENT_WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="inline-block bg-gradient-to-r from-[#a8d05f] via-[#d3ec9c] to-[#6b8f2b] bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]"
                custom={HEADLINE_WORDS.length + i}
                initial={reduceMotion ? undefined : "hidden"}
                animate="visible"
                variants={wordVariants}
              >
                {word}
                {i < GRADIENT_WORDS.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>
          <p
            className="mx-auto max-w-[700px] text-lg text-[#a8d05f] md:text-xl leading-relaxed animate-fade-in font-medium"
            style={{ animationDelay: "500ms" }}
          >
            Sync Google Slides™ with a live code editor. Monitor student progress
            in real-time and make coding lessons engaging.
          </p>
        </div>

        <div
          className="flex flex-col gap-4 sm:flex-row animate-fade-in"
          style={{ animationDelay: "650ms" }}
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
          style={{ animationDelay: "800ms" }}
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
    </section>
  );
}
