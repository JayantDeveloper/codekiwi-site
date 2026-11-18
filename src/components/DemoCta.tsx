import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Closing call to action, shared by every page that ends without one.
 *
 * It exists as one component rather than five hand-rolled sections so the
 * wording, spacing and colour stay in step. Only the title and body vary, so
 * each page closes in its own words without drifting off the palette.
 *
 * Pale green is deliberate and not a default worth overriding: both footers are
 * #1C2317, so a dark band here merges with the footer into one slab and the
 * closing beat disappears. The band has to contrast with what follows it.
 */
export function DemoCta({
  title = "Try it with your next lesson",
  body = "CodeKiwi is free, installs in about a minute, and works on Chromebooks. Mark a slide in a deck you already teach from.",
  className,
  tone = "green",
}: {
  title?: string;
  body?: string;
  className?: string;
  /** "cream" for pages where the section above is already pale green (the
   *  homepage features band), so the closing beat still reads as its own band. */
  tone?: "green" | "cream";
}) {
  return (
    <section
      className={`w-full ${tone === "cream" ? "bg-[#FBF7EC]" : "bg-[#E7F2D4]"}${className ? ` ${className}` : ""}`}
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-8 md:py-16">
        <div className="min-w-0">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[#1E2A14] sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#55604A]">
            {body}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2F4A1C] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#243915]"
          >
            Get started free
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/demo"
            className="rounded-full px-8 py-3.5 text-base font-semibold text-[#2F4A1C] transition-colors duration-200 hover:text-[#1E2A14]"
          >
            Or contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
