import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rejectUnlessBackend } from "@/lib/backendSecret";

export async function POST(req: NextRequest) {
  const rejected = rejectUnlessBackend(req);
  if (rejected) return rejected;

  const { sessionCode, studentCount } = await req.json();
  if (!sessionCode) {
    return NextResponse.json({ error: "Missing sessionCode" }, { status: 400 });
  }

  const session = await prisma.session.findUnique({ where: { sessionCode } });
  if (!session) {
    return NextResponse.json({ success: true, updated: false });
  }

  await prisma.session.update({
    where: { sessionCode },
    data: {
      endedAt: new Date(),
      ...(typeof studentCount === "number" ? { studentCount } : {}),
    },
  });

  return NextResponse.json({ success: true, updated: true });
}
