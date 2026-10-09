"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FilePlus2, LayoutTemplate, SlidersHorizontal, ExternalLink } from "lucide-react";
import { STARTER_LANGUAGES, LANGUAGE_LABEL, type StarterLanguage } from "@/lib/starterExercises";

type PageState = "choose" | "ready" | "error";
type DeckKind = "blank" | "starter";

const cardClass =
  "flex flex-col items-center gap-4 rounded-2xl border-2 border-[#a8d05f]/50 bg-white p-7 shadow-sm transition-all";
const iconWrap = "flex h-14 w-14 items-center justify-center rounded-full bg-[#a8d05f]/20";
const primaryBtn =
  "mt-auto w-full rounded-lg bg-[#6b8f2b] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#5a7a23] disabled:opacity-60";

function Spinner() {
  return <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#a8d05f] border-t-[#6b8f2b]" />;
}

export default function LaunchSessionPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("choose");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<DeckKind | null>(null);
  const [language, setLanguage] = useState<StarterLanguage>("python");
  const [deck, setDeck] = useState<{ url: string; title: string; opened: boolean } | null>(null);

  const createDeck = async (kind: DeckKind) => {
    // Open the tab now, while we still have the click: browsers block
    // window.open() after an await, which made the old button look dead.
    const tab = window.open("", "_blank");
    if (tab) {
      tab.document.title = "Creating your CodeKiwi deck…";
      tab.document.body.innerHTML =
        '<p style="font:16px system-ui,sans-serif;color:#3d4a2a;padding:48px;text-align:center">Creating your CodeKiwi deck in Google Drive…</p>';
    }
    setLoading(kind);
    try {
      const res = await fetch("/api/create-presentation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kind === "blank" ? { kind: "blank" } : { language }),
      });
      let data: { presentationUrl?: string; title?: string; error?: string; details?: string } = {};
      try { data = await res.json(); } catch { /* empty/non-JSON body */ }
      if (!res.ok || !data.presentationUrl) throw new Error(data.details || data.error || "Failed to create presentation");
      if (tab && !tab.closed) tab.location.href = data.presentationUrl;
      setDeck({ url: data.presentationUrl, title: data.title || "Your CodeKiwi deck", opened: !!tab && !tab.closed });
      setPageState("ready");
    } catch (err) {
      tab?.close();
      setError(err instanceof Error ? err.message : "Failed to create presentation");
      setPageState("error");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a8d05f]/10 to-white px-4 py-10">
      <div className="w-full max-w-5xl">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Blank lesson: one getting-started slide, the teacher builds the rest */}
              <div className={`${cardClass} hover:border-[#6b8f2b] hover:shadow-md`}>
                <div className={iconWrap}>
                  {loading === "blank" ? <Spinner /> : <FilePlus2 className="h-7 w-7 text-[#6b8f2b]" />}
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">New Blank Lesson</p>
                  <p className="mt-1 text-sm text-gray-500">
                    A fresh CodeKiwi presentation in your Google Drive™ with a getting-started slide. Build your own lesson from there.
                  </p>
                </div>
                <button type="button" onClick={() => createDeck("blank")} disabled={loading !== null} className={primaryBtn}>
                  {loading === "blank" ? "Creating…" : "Create blank lesson"}
                </button>
              </div>

              {/* Starter deck: ready-made exercises with auto-graded tests */}
              <div className={`${cardClass} hover:border-[#6b8f2b] hover:shadow-md`}>
                <div className={iconWrap}>
                  {loading === "starter" ? <Spinner /> : <LayoutTemplate className="h-7 w-7 text-[#6b8f2b]" />}
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">Starter Deck</p>
                  <p className="mt-1 text-sm text-gray-500">
                    8 ready-to-run coding exercises with auto-graded tests
                  </p>
                </div>
                <div className="grid w-full grid-cols-2 gap-2" role="radiogroup" aria-label="Deck language">
                  {STARTER_LANGUAGES.map((l) => (
                    <button
                      key={l}
                      type="button"
                      role="radio"
                      aria-checked={language === l}
                      disabled={loading !== null}
                      onClick={() => setLanguage(l)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                        language === l
                          ? "border-[#6b8f2b] bg-[#6b8f2b] text-white"
                          : "border-[#a8d05f]/60 bg-white text-[#6b8f2b] hover:bg-[#a8d05f]/15"
                      }`}
                    >
                      {LANGUAGE_LABEL[l]}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => createDeck("starter")} disabled={loading !== null} className={primaryBtn}>
                  {loading === "starter" ? "Creating your deck…" : `Create ${LANGUAGE_LABEL[language]} deck`}
                </button>
              </div>

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
              <p className="pt-2 text-center text-sm text-gray-500">This takes a few seconds. Your deck opens in a new tab.</p>
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
            <p className="text-xl font-bold text-[#1a1a1a]">Your deck is ready</p>
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
            <div className="flex gap-4 pt-2">
              <button
                onClick={() => { setDeck(null); setPageState("choose"); }}
                className="text-sm text-gray-500 hover:text-[#6b8f2b] transition-colors"
              >
                Create another
              </button>
              <button
                onClick={() => router.push("/home")}
                className="text-sm text-gray-500 hover:text-[#6b8f2b] transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
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
