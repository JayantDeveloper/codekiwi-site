"use client";

import { useState } from "react";
import { Check, X, Minus, ChevronDown, Download } from "lucide-react";

type Answer = {
  slideIndex: number;
  code: string;
  output: string;
  passed: boolean | null;
};
type Student = {
  name: string;
  score: number;
  total: number;
  answers: Answer[];
};

export function GradebookTable({
  sessionTitle,
  codingSlides,
  students,
}: {
  sessionTitle: string;
  codingSlides: number[];
  students: Student[];
}) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const answerFor = (s: Student, slideIndex: number) =>
    s.answers.find((a) => a.slideIndex === slideIndex);

  const exportCsv = () => {
    const header = ["Student", "Score", ...codingSlides.map((_, i) => `Q${i + 1}`)];
    const rows = students.map((s) => {
      const cells = codingSlides.map((idx) => {
        const a = answerFor(s, idx);
        if (!a || a.passed === null) return "";
        return a.passed ? "correct" : "incorrect";
      });
      return [s.name, `${s.score}/${s.total}`, ...cells];
    });
    const esc = (v: string) => `"${String(v).replace(/"/g, '""')}"`;
    const csv = [header, ...rows].map((r) => r.map(esc).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${sessionTitle.replace(/[^\w-]+/g, "_")}_gradebook.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl border border-[#6b8f2b]/20 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-[#6b8f2b]">
          Students
        </h2>
        <button
          onClick={exportCsv}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#6b8f2b]/30 px-3 py-1.5 text-xs font-semibold text-[#6b8f2b] transition-colors hover:bg-[#a8d05f]/20"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
              <th className="px-5 py-2 font-semibold">Student</th>
              <th className="px-3 py-2 font-semibold">Score</th>
              {codingSlides.map((_, i) => (
                <th key={i} className="px-2 py-2 text-center font-semibold">
                  Q{i + 1}
                </th>
              ))}
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody>
            {students.map((s, rowIdx) => {
              const isOpen = expanded === rowIdx;
              return (
                <FragmentRow
                  key={rowIdx}
                  s={s}
                  rowIdx={rowIdx}
                  isOpen={isOpen}
                  codingSlides={codingSlides}
                  answerFor={answerFor}
                  onToggle={() => setExpanded(isOpen ? null : rowIdx)}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusIcon({ passed }: { passed: boolean | null }) {
  if (passed === true)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[#166534]">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  if (passed === false)
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#fee2e2] text-[#991b1b]">
        <X className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
    );
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-gray-400">
      <Minus className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  );
}

function FragmentRow({
  s,
  rowIdx,
  isOpen,
  codingSlides,
  answerFor,
  onToggle,
}: {
  s: Student;
  rowIdx: number;
  isOpen: boolean;
  codingSlides: number[];
  answerFor: (s: Student, slideIndex: number) => Answer | undefined;
  onToggle: () => void;
}) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer border-b border-gray-50 transition-colors hover:bg-[#a8d05f]/5 ${
          isOpen ? "bg-[#a8d05f]/5" : ""
        }`}
      >
        <td className="px-5 py-3 font-semibold text-[#1a1a1a]">{s.name}</td>
        <td className="px-3 py-3 tabular-nums text-gray-700">
          {s.score}/{s.total}
        </td>
        {codingSlides.map((idx) => {
          const a = answerFor(s, idx);
          return (
            <td key={idx} className="px-2 py-3 text-center">
              <StatusIcon passed={a ? a.passed : null} />
            </td>
          );
        })}
        <td className="px-3 py-3 text-right text-gray-400">
          <ChevronDown
            className={`inline h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </td>
      </tr>
      {isOpen && (
        <tr className="border-b border-gray-100 bg-[#fafcf5]">
          <td colSpan={codingSlides.length + 3} className="px-5 py-4">
            <div className="grid gap-4 md:grid-cols-2">
              {codingSlides.map((idx, i) => {
                const a = answerFor(s, idx);
                return (
                  <div key={idx} className="rounded-lg border border-gray-200 bg-white p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6b8f2b]">
                        Q{i + 1}{" "}
                        <span className="font-normal text-gray-400">
                          (slide {idx + 1})
                        </span>
                      </span>
                      <StatusIcon passed={a ? a.passed : null} />
                    </div>
                    <pre className="max-h-40 overflow-auto whitespace-pre-wrap rounded bg-[#1a1a1a] p-2.5 font-mono text-[11px] leading-relaxed text-[#e5e7eb]">
                      {a && a.code.trim() ? a.code : "// no code submitted"}
                    </pre>
                    {a && a.output.trim() && (
                      <pre className="mt-2 max-h-24 overflow-auto whitespace-pre-wrap rounded bg-black/80 p-2 font-mono text-[11px] leading-relaxed text-[#a8d05f]">
                        {a.output}
                      </pre>
                    )}
                  </div>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
