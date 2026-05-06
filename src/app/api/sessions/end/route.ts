import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const secret = process.env.CODEKIWI_BACKEND_SECRET;
  if (secret && req.headers.get("x-codekiwi-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
