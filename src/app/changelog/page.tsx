import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "What's New — CodeKiwi",
  description: "Updates to CodeKiwi: new languages, features, and fixes.",
};

type Entry = {
  date: string; // ISO, newest first
  title: string;
  added?: string[];
  improved?: string[];
  fixed?: string[];
};

// Newest first. Write for teachers: what changed in class, not how.
const entries: Entry[] = [
  {
    date: "2026-10-09",
    title: "C++, typing into programs, and test cases",
    added: [
      "C++ (C++17) as a fourth language. Pick it under Session Language in the add-on sidebar before you start the lesson.",
      "Students can type input into their running program. input(), Scanner, and cin work the way they do in a terminal: the program asks, the student types in the output pane and presses Enter. Run turns into Stop while a program runs.",
      "Auto-grading with test cases. Give a coding question up to 10 tests, each with optional input and the output it should end with. Students see how many tests passed and, for the first one that failed, its input, the expected output, and what their program printed.",
      "JavaScript prompt() and alert() work like they do in the browser, so browser-style lessons run unchanged.",
      "Starter decks: from codekiwi.tech, pick a language and get a CodeKiwi-styled deck of 8 warm-up exercises (Hello World through FizzBuzz) in your Google Drive, each with auto-graded tests already set up.",
    ],
    improved: [
      "Grading ignores prompt text before the answer (\"Enter two numbers: 12\" matches 12), and ignores capitalization and extra spaces unless you turn that off for a question.",
      "Clear messages when a program crashes, runs forever, or uses too much memory, instead of a bare \"Killed\".",
      "C++ and Java show \"Compiling…\" before the program starts.",
      "The live dashboard scrolls properly with a full class, and the speaker notes panel collapses on every teacher view.",
      "The sidebar shows progress when loading and saving tests.",
    ],
    fixed: [
      "JavaScript, Java, and C++ lessons could start some students with Python starter code.",
      "Saving an auto-grade answer could write it to the wrong slide if you had clicked another slide first.",
    ],
  },
  {
    date: "2026-10-07",
    title: "Teacher controls on school-managed browsers",
    fixed: [
      "On browsers that block cookies or site data (common on school-managed devices), the teacher view couldn't run code, show the student count, lock editors, move students between slides, or end the session. All of these work now.",
      "The teacher link no longer shows its private access key in the address bar, so it's safe to project.",
    ],
    improved: [
      "Session history and gradebooks now save for every teacher who starts a lesson, with no codekiwi.tech account needed first.",
    ],
  },
];

function formatDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function Group({ label, items }: { label: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="mt-4">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6b8f2b]/60 mb-2">{label}</h4>
      <ul className="list-disc pl-5 space-y-2 text-[#6b8f2b]/85 leading-relaxed">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#f8faf5]">
      <header className="border-b border-[#d6c49f]/30 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="text-2xl font-bold text-[#6b8f2b]">CodeKiwi</span>
            <Image
              src="https://www.codekiwi.app/codekiwilogo.png"
              alt="CodeKiwi Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/features" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors">
              Features
            </Link>
            <Link href="/docs" className="text-sm text-[#6b8f2b]/70 hover:text-[#6b8f2b] transition-colors">
              Docs
            </Link>
            <Link href="/signin">
              <Button size="sm" className="bg-[#6b8f2b] hover:bg-[#6b8f2b]/90 text-white">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#6b8f2b]">What&apos;s new</h1>
        <p className="mt-2 text-[#6b8f2b]/70">
          Updates to CodeKiwi. The add-on updates on its own: reload your Slides deck to get the latest version.
        </p>

        <div className="mt-10 space-y-10">
          {entries.map((e) => (
            <article key={e.date} id={e.date} className="rounded-xl border border-[#6b8f2b]/15 bg-white p-6 shadow-sm">
              <time dateTime={e.date} className="text-sm font-medium text-[#6b8f2b]/60">
                {formatDate(e.date)}
              </time>
              <h2 className="mt-1 text-xl font-semibold text-[#6b8f2b]">{e.title}</h2>
              <Group label="New" items={e.added} />
              <Group label="Improved" items={e.improved} />
              <Group label="Fixed" items={e.fixed} />
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[#6b8f2b]/70">
          Something not working, or a feature you&apos;d like? <Link href="/support" className="underline hover:text-[#6b8f2b]">Get in touch</Link>.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}
