"use client";

/**
 * Book-a-demo form.
 *
 * Posts to /api/demo, which records the request in Postgres before it tries to
 * email anyone. The `src` query parameter is carried through so a scan from the
 * showcase QR code (/demo?src=dingman) is attributable later.
 */

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MARKETPLACE_LISTING_URL } from "@/lib/marketplace";
import { Check, Loader2 } from "lucide-react";

const ROLES = [
  { value: "teacher", label: "Teacher" },
  { value: "student", label: "Student" },
  { value: "admin", label: "School or district" },
  { value: "other", label: "Something else" },
] as const;

const field =
  "w-full rounded-xl border border-[#1E2A14]/15 bg-white px-4 py-3 text-base text-[#1E2A14] " +
  "placeholder:text-[#8A9480] outline-none transition-colors duration-200 " +
  "focus:border-[#2F4A1C] focus:ring-2 focus:ring-[#2F4A1C]/20";

const label = "block text-sm font-semibold text-[#1E2A14]";

export function DemoForm() {
  const params = useSearchParams();
  const source = params.get("src") ?? "";

  const [role, setRole] = useState<string>("teacher");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const data = new FormData(e.currentTarget);
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          school: data.get("school"),
          role,
          message: data.get("message"),
          company: data.get("company"), // honeypot
          source,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        // Surface what the server actually said rather than a generic failure.
        setError(json?.error ?? "Something went wrong. Please try again.");
        setStatus("idle");
        return;
      }
      setStatus("done");
    } catch {
      setError(
        "We could not reach the server. Check your connection and try again."
      );
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-[#2F4A1C]/15 bg-[#E7F2D4] p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2F4A1C]">
          <Check className="h-6 w-6 text-white" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold text-[#1E2A14]">Got it, thank you</h2>
        <p className="mx-auto mt-3 max-w-md text-[#55604A]">
          I read every one of these myself and will reply personally, usually
          within a day. Nothing to schedule in the meantime. If you want to start
          now, CodeKiwi is already free on the{" "}
          <a
            href={MARKETPLACE_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#2F4A1C] underline underline-offset-4"
          >
            Marketplace
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" required maxLength={120} className={field} placeholder="Alex Rivera" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            className={field}
            placeholder="you@school.edu"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="school" className={label}>
          School or district <span className="font-normal text-[#8A9480]">(optional)</span>
        </label>
        <input id="school" name="school" maxLength={200} className={field} placeholder="River Hill High School" />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className={`${label} mb-2`}>I am a</legend>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => {
            const active = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? "border-[#2F4A1C] bg-[#2F4A1C] text-white"
                    : "border-[#1E2A14]/20 bg-white text-[#55604A] hover:border-[#2F4A1C]/40 hover:text-[#1E2A14]"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={label}>
          What do you teach, or what do you want to ask?{" "}
          <span className="font-normal text-[#8A9480]">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={2000}
          className={`${field} resize-y`}
          placeholder="I teach AP CSP to about 90 students on Chromebooks."
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl bg-[#FBE9E4] px-4 py-3 text-sm font-medium text-[#8E2F22]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2F4A1C] px-8 py-3.5 text-base font-semibold text-white transition-colors duration-200 hover:bg-[#243915] disabled:opacity-70"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        {status === "sending" ? "Sending" : "Send it over"}
      </button>

      <p className="text-sm text-[#6F7A62]">
        Questions, bug reports, feature requests, or wanting to try it with a
        class. All of it reaches me and I read every one myself.
      </p>
      <p className="text-sm text-[#8A9480]">
        No spam and no sales calls. CodeKiwi is free for teachers while it
        proves itself, and you can stop whenever you like.
      </p>
    </form>
  );
}
