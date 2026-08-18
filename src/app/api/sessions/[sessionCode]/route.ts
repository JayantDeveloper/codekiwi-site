import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/auth";
import { prisma } from "@/lib/prisma";

// Owner-gated management of a session record from the teacher's home:
//   DELETE — remove the whole session (and its gradebook, via cascade)
//   PATCH  — rename the session's title
// Ownership is checked against the signed-in teacher's account. The live app
// backend holds session state separately; deleting the record here does not
// touch an in-progress live session (students stay connected to the backend).

async function ownedSession(email: string | null | undefined, sessionCode: string) {
  if (!email) return null;
  const dbUser = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (!dbUser) return null;
  const record = await prisma.session.findUnique({
    where: { sessionCode },
    select: { id: true, userId: true },
  });
  if (!record || record.userId !== dbUser.id) return null;
  return record;
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionCode: string }> }
) {
  const { sessionCode } = await params;
  const session = await getServerSession();
  const record = await ownedSession(session?.user?.email, sessionCode);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  // SessionStudent / SessionAnswer cascade-delete off the Session relation.
  await prisma.session.delete({ where: { id: record.id } });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ sessionCode: string }> }
) {
  const { sessionCode } = await params;
  const session = await getServerSession();
  const record = await ownedSession(session?.user?.email, sessionCode);
  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  let body: { title?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  await prisma.session.update({
    where: { id: record.id },
    data: { title: title.slice(0, 200) },
  });
  return NextResponse.json({ success: true, title: title.slice(0, 200) });
}
