import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * "Book a demo" submissions from /demo.
 *
 * The row is written BEFORE we try to email. A lead scanned from the booth QR
 * code at a live event must never be lost because SMTP was slow, throttled or
 * unconfigured. Email is a notification, not the record.
 *
 * Mail is sent only when SMTP_USER and SMTP_PASS are set. When they are not,
 * the request still succeeds and the gap is logged loudly rather than being
 * swallowed, so a missing credential shows up in the Vercel logs instead of
 * looking like "no one submitted anything".
 */

const ROLES = ["teacher", "student", "admin", "other"] as const;

const MAX = { name: 120, email: 200, school: 200, message: 2000, source: 60 };

function clean(v: unknown, limit: number): string {
  return typeof v === "string" ? v.trim().slice(0, limit) : "";
}

// Deliberately permissive. Rejecting an unusual but valid school address is a
// worse failure here than accepting a junk one, which we can simply ignore.
function looksLikeEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function notify(req: {
  id: string;
  name: string;
  email: string;
  school: string | null;
  role: string | null;
  message: string | null;
  source: string | null;
}): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.DEMO_NOTIFY_TO ?? user;

  if (!user || !pass) {
    console.warn(
      `[demo] SMTP_USER/SMTP_PASS not set; demo request ${req.id} saved but NOT emailed. ` +
        `Set both in Vercel to enable notifications.`
    );
    return false;
  }

  // Imported lazily so a missing/broken mail dependency can never take down
  // the route that records the lead.
  const nodemailer = (await import("nodemailer")).default;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: true,
    auth: { user, pass },
  });

  const lines = [
    `Name:    ${req.name}`,
    `Email:   ${req.email}`,
    `School:  ${req.school || "-"}`,
    `Role:    ${req.role || "-"}`,
    `Source:  ${req.source || "direct"}`,
    "",
    req.message || "(no message)",
  ].join("\n");

  await transport.sendMail({
    from: `CodeKiwi <${user}>`,
    to,
    replyTo: req.email,
    subject: `CodeKiwi demo request: ${req.name}${req.source ? ` (${req.source})` : ""}`,
    text: lines,
  });
  return true;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;

  // Honeypot: a real person never fills a field they cannot see. Answer 200 so
  // a bot gets no signal that it was caught, but write nothing.
  if (clean(b.company, 100)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(b.name, MAX.name);
  const email = clean(b.email, MAX.email).toLowerCase();
  const school = clean(b.school, MAX.school);
  const roleRaw = clean(b.role, 20).toLowerCase();
  const message = clean(b.message, MAX.message);
  const source = clean(b.source, MAX.source);

  if (!name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!looksLikeEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const role = (ROLES as readonly string[]).includes(roleRaw) ? roleRaw : null;

  let saved;
  try {
    saved = await prisma.demoRequest.create({
      data: {
        name,
        email,
        school: school || null,
        role,
        message: message || null,
        source: source || null,
      },
    });
  } catch (err) {
    // The record is the whole point of this endpoint. If it cannot be written,
    // say so rather than returning a success the visitor would believe.
    console.error("[demo] failed to save demo request", err);
    return NextResponse.json(
      { error: "We could not save that. Please email team@codekiwi.tech instead." },
      { status: 500 }
    );
  }

  let notified = false;
  try {
    notified = await notify(saved);
    if (notified) {
      await prisma.demoRequest.update({
        where: { id: saved.id },
        data: { notified: true },
      });
    }
  } catch (err) {
    // The lead is already safe in Postgres, so this is a notification failure,
    // not a request failure. Log it and still thank the visitor.
    console.error(`[demo] saved ${saved.id} but notification failed`, err);
  }

  return NextResponse.json({ ok: true });
}
