import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GradebookTable } from "./GradebookTable";

export const dynamic = "force-dynamic";

export default async function GradebookPage({
  params,
}: {
  params: Promise<{ sessionCode: string }>;
}) {
  const { sessionCode } = await params;
  const session = await getServerSession();
  const dbUser = session?.user?.email
    ? await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } })
    : null;
  if (!dbUser) notFound();

  const record = await prisma.session.findUnique({
    where: { sessionCode },
    include: {
      students: {
        orderBy: { name: "asc" },
        include: { answers: { orderBy: { slideIndex: "asc" } } },
      },
    },
  });
  // Only the owning teacher may view a session's gradebook.
  if (!record || record.userId !== dbUser.id) notFound();

  const students = record.students;
  // The set of coding-question slides, as the union of every student's answers.
  const codingSlides = Array.from(
    new Set(students.flatMap((s) => s.answers.map((a) => a.slideIndex)))
  ).sort((a, b) => a - b);

  // Per-question pass rate across the class.
  const questionStats = codingSlides.map((slideIndex) => {
    const passed = students.filter((s) =>
      s.answers.some((a) => a.slideIndex === slideIndex && a.passed === true)
    ).length;
    return { slideIndex, passed, total: students.length };
  });

  const totalQuestions = codingSlides.length;
  const avgScore =
    students.length && totalQuestions
      ? Math.round(
          (students.reduce((sum, s) => sum + s.score, 0) / (students.length * totalQuestions)) * 100
        )
      : 0;

  const dateStr = record.createdAt.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="w-full px-4 sm:px-8 md:px-12 py-6 bg-gradient-to-b from-[#a8d05f]/5 to-[#f8faf5] min-h-screen">
      <Link
        href="/home"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#6b8f2b] hover:underline"
      >
        <ArrowLeft className="h-4 w-4" />
        All sessions
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a1a1a]">{record.title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {dateStr}
          {` · ${students.length} student${students.length === 1 ? "" : "s"}`}
          {` · #${record.sessionCode}`}
        </p>
      </div>

      {students.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-[#a8d05f]/50 bg-white/60 p-12 text-center">
          <p className="text-[#6b8f2b]/70">
            No gradebook data was captured for this session.
          </p>
          <p className="mt-1 text-sm text-[#6b8f2b]/50">
            Sessions run before this feature, or with no students, won&apos;t have a gradebook.
          </p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <SummaryStat label="Students" value={String(students.length)} />
            <SummaryStat label="Coding questions" value={String(totalQuestions)} />
            <SummaryStat label="Class average" value={totalQuestions ? `${avgScore}%` : "—"} />
            <SummaryStat
              label="Fully correct"
              value={String(students.filter((s) => totalQuestions && s.score === totalQuestions).length)}
            />
          </div>

          {/* Per-question pass rate */}
          {totalQuestions > 0 && (
            <div className="mb-6 rounded-xl border border-[#6b8f2b]/20 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#6b8f2b]">
                How the class did on each question
              </h2>
              <div className="space-y-3">
                {questionStats.map((q, i) => {
                  const pct = q.total ? Math.round((q.passed / q.total) * 100) : 0;
                  return (
                    <div key={q.slideIndex} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 text-sm font-semibold text-[#1a1a1a]">
                        Q{i + 1}
                        <span className="ml-1 font-normal text-gray-400">
                          (slide {q.slideIndex + 1})
                        </span>
                      </span>
                      <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#6b8f2b] to-[#8fb73a]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-24 shrink-0 text-right text-sm text-gray-600 tabular-nums">
                        {q.passed}/{q.total} · {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Student table (interactive) */}
          <GradebookTable
            sessionTitle={record.title}
            codingSlides={codingSlides}
            students={students.map((s) => ({
              name: s.name,
              score: s.score,
              total: s.total,
              answers: s.answers.map((a) => ({
                slideIndex: a.slideIndex,
                code: a.code,
                output: a.output,
                passed: a.passed,
              })),
            }))}
          />
        </>
      )}
    </main>
  );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#6b8f2b]/20 bg-white p-4 shadow-sm">
      <p className="text-2xl font-bold text-[#1a1a1a]">{value}</p>
      <p className="mt-0.5 text-xs font-medium text-[#6b8f2b]/70">{label}</p>
    </div>
  );
}
