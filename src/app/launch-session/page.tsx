"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FilePlus2, SlidersHorizontal, ExternalLink } from "lucide-react";
import { createDeck, type CreatedDeck } from "@/lib/createDeck";

type PageState = "choose" | "ready" | "error";

const cardClass =
  "flex flex-col items-center gap-4 rounded-2xl border-2 border-[#a8d05f]/50 bg-white p-8 shadow-sm transition-all";
const iconWrap = "flex h-14 w-14 items-center justify-center rounded-full bg-[#a8d05f]/20";

export default function LaunchSessionPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("choose");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [deck, setDeck] = useState<CreatedDeck | null>(null);

  const createBlank = async () => {
    setLoading(true);
    try {
      setDeck(await createDeck({ kind: "blank" }));
      setPageState("ready");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create presentation");
      setPageState("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a8d05f]/10 to-white px-4 py-10">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="text-3xl font-bold text-[#6b8f2b]">CodeKiwi</span>
          <Image
            src="https://www.codekiwi.app/codekiwilogo.png"
            alt="CodeKiwi Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>

        {/* Choose state */}
        {pageState === "choose" && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-[#1a1a1a] mb-8">
              How do you want to start?
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Fresh lesson: one getting-started slide, the teacher builds the rest */}
              <button
                type="button"
                onClick={createBlank}
                disabled={loading}
                className={`group ${cardClass} hover:border-[#6b8f2b] hover:shadow-md disabled:opacity-70`}
              >
                <div className={`${iconWrap} group-hover:bg-[#a8d05f]/30 transition-colors`}>
                  {loading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#a8d05f] border-t-[#6b8f2b]" />
                  ) : (
                    <FilePlus2 className="h-7 w-7 text-[#6b8f2b]" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">{loading ? "Creating your lesson…" : "New Lesson"}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    A fresh CodeKiwi presentation in your Google Drive™, with a slide on how to open the sidebar and go live
                  </p>
                </div>
              </button>

              {/* Add-on option */}
              <div className={cardClass}>
                <div className={iconWrap}>
                  <SlidersHorizontal className="h-7 w-7 text-[#6b8f2b]" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">Use Your Own Slides</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Open your presentation in Google Slides™, then go to{" "}
                    <span className="font-medium text-[#6b8f2b]">Extensions → CodeKiwi</span>{" "}
                    to start a live session.
                  </p>
                </div>
              </div>
            </div>

            {loading && (
              <p className="pt-2 text-center text-sm text-gray-500">This takes a few seconds. Your lesson opens in a new tab.</p>
            )}

            <div className="pt-4 text-center">
              <button
                onClick={() => router.push("/home")}
                className="text-sm text-gray-500 hover:text-[#6b8f2b] transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Ready state: the link always works, even if the new tab was blocked */}
        {pageState === "ready" && deck && (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <p className="text-xl font-bold text-[#1a1a1a]">Your lesson is ready</p>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-[#3d4a2a]">{deck.title}</span> is in your Google Drive™.
              {deck.opened ? " It opened in a new tab." : ""} To go live, open{" "}
              <span className="font-medium text-[#6b8f2b]">Extensions → CodeKiwi</span> in the deck and click Start Lesson.
            </p>
            <a
              href={deck.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#6b8f2b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a7a23] transition-colors"
            >
              Open in Google Slides™ <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-xs text-gray-400">
              Signed into more than one Google account? Open the deck in a window signed in to only this one, or
              CodeKiwi can&apos;t read it.
            </p>
            <button
              onClick={() => router.push("/home")}
              className="pt-2 text-sm text-gray-500 hover:text-[#6b8f2b] transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Error state */}
        {pageState === "error" && (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-red-100 p-4">
              <svg className="h-10 w-10 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" x2="12" y1="8" y2="12" />
                <line x1="12" x2="12.01" y1="16" y2="16" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-600">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => { setError(null); setPageState("choose"); }}
                className="rounded-lg border border-gray-200 px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/home")}
                className="rounded-lg bg-[#6b8f2b] px-5 py-2 text-sm text-white hover:bg-[#6b8f2b]/90 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
