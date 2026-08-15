import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Receives the full student roster + per-question code/grades from the app
// backend at session end (and, later, periodic autosave) and persists it as a
// gradebook the teacher can revisit. Idempotent: re-sending replaces the
// session's stored roster.

const MAX_TEXT = 50_000; // cap code/output per answer
const MAX_STUDENTS = 500;
const MAX_ANSWERS = 200;

type IncomingAnswer = {
  slideIndex: number;
  code?: string;
  output?: string;
  passed?: boolean | null;
  ranAt?: string | null;
};
type IncomingStudent = {
  name: string;
  score?: number;
  total?: number;
  answers?: IncomingAnswer[];
};

const clampText = (v: unknown) =>
  typeof v === "string" ? v.slice(0, MAX_TEXT) : "";

export async function POST(req: NextRequest) {
  const secret = process.env.CODEKIWI_BACKEND_SECRET;
  if (secret && req.headers.get("x-codekiwi-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { sessionCode, students } = (await req.json()) as {
    sessionCode?: string;
    students?: IncomingStudent[];
  };
  if (!sessionCode || !Array.isArray(students)) {
    return NextResponse.json({ error: "Missing sessionCode or students" }, { status: 400 });
  }

  const session = await prisma.session.findUnique({
    where: { sessionCode },
    select: { id: true },
  });
  // Teacher has no site account, or the session was never registered — skip.
  if (!session) {
    return NextResponse.json({ success: true, saved: false });
  }

  const roster = students.slice(0, MAX_STUDENTS);

  // Replace the whole roster atomically so re-sends (end + any autosave) are
  // idempotent rather than duplicating rows.
  await prisma.$transaction(async (tx) => {
    await tx.sessionStudent.deleteMany({ where: { sessionId: session.id } });

    for (const s of roster) {
      const name = typeof s.name === "string" && s.name.trim() ? s.name.trim() : "Unnamed";
      const answers = Array.isArray(s.answers) ? s.answers.slice(0, MAX_ANSWERS) : [];
      const created = await tx.sessionStudent.create({
        data: {
          sessionId: session.id,
          name,
          score: Number.isInteger(s.score) ? (s.score as number) : 0,
          total: Number.isInteger(s.total) ? (s.total as number) : 0,
        },
        select: { id: true },
      });
      if (answers.length) {
        await tx.sessionAnswer.createMany({
          data: answers
            .filter((a) => Number.isInteger(a.slideIndex))
            .map((a) => ({
              sessionStudentId: created.id,
              slideIndex: a.slideIndex,
              code: clampText(a.code),
              output: clampText(a.output),
              passed: typeof a.passed === "boolean" ? a.passed : null,
              ranAt: a.ranAt ? new Date(a.ranAt) : null,
            })),
        });
      }
    }
  });

  return NextResponse.json({ success: true, saved: true, students: roster.length });
}
