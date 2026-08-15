import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";

// Teacher-initiated deletion of a session's stored student data (code, names,
// scores). Owner-gated by the signed-in teacher's account; keeps the session
// record itself so the lesson still appears in history, just without the
// students' work.
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionCode: string }> }
) {
  const { sessionCode } = await params;

  const session = await getServerSession();
  const dbUser = session?.user?.email
    ? await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true } })
    : null;
  if (!dbUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const record = await prisma.session.findUnique({
    where: { sessionCode },
    select: { id: true, userId: true },
  });
  if (!record || record.userId !== dbUser.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { count } = await prisma.sessionStudent.deleteMany({
    where: { sessionId: record.id },
  });

  return NextResponse.json({ success: true, deleted: count });
}
