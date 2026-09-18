import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

// Guard for routes only the app backend / add-on may call. Fails closed: a
// missing CODEKIWI_BACKEND_SECRET rejects everything rather than allowing
// everything (the previous `if (secret && ...)` shape).
export function rejectUnlessBackend(req: NextRequest): NextResponse | null {
  const expected = process.env.CODEKIWI_BACKEND_SECRET;
  const provided = req.headers.get("x-codekiwi-secret");
  if (!expected) {
    console.error("CODEKIWI_BACKEND_SECRET is not set; rejecting backend call");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }
  if (!provided) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}
