"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { STARTER_LANGUAGES, LANGUAGE_LABEL, EXERCISES, type StarterLanguage } from "@/lib/starterExercises";
import { createDeck, type CreatedDeck } from "@/lib/createDeck";

type CardState = { loading?: boolean; deck?: CreatedDeck; error?: string };

/** Mini version of the deck's title slide (see titleSlide in src/lib/starterDeck.ts). */
function Cover({ language }: { language: StarterLanguage }) {
  return (
    <div className="relative aspect-video overflow-hidden bg-[#24391a]">
      <div className="absolute -right-[12%] -top-[30%] h-[95%] aspect-square rounded-full bg-[#2f4a1a]" />
      <div className="absolute -bottom-[25%] right-[2%] h-[55%] aspect-square rounded-full bg-[#2f4a1a]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://www.codekiwi.app/codekiwilogo.png"
        alt=""
        className="absolute right-[8%] top-1/2 h-[36%] -translate-y-1/2 border-[3px] border-[#a8d05f] object-contain"
      />
      <div className="absolute left-[6%] top-1/2 -translate-y-1/2">
        <p className="text-[10px] font-bold tracking-wider text-[#a8d05f]">STARTER DECK</p>
        <p className="mt-1 text-2xl font-bold leading-tight text-white">{LANGUAGE_LABEL[language]}</p>
        <p className="text-2xl font-bold leading-tight text-[#a8d05f]">Warm-Ups</p>
      </div>
    </div>
  );
}

export function StarterDecks() {
  const [cards, setCards] = useState<Partial<Record<StarterLanguage, CardState>>>({});
  const busy = Object.values(cards).some((c) => c?.loading);

  const create = async (language: StarterLanguage) => {
    setCards((c) => ({ ...c, [language]: { loading: true } }));
    try {
      const deck = await createDeck({ language });
      setCards((c) => ({ ...c, [language]: { deck } }));
    } catch (err) {
      setCards((c) => ({ ...c, [language]: { error: err instanceof Error ? err.message : "Couldn't create the deck" } }));
    }
  };

  return (
    <section className="mb-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-[#6b8f2b]">Starter Decks</h2>
        <p className="mt-1 text-sm text-[#6b8f2b]/70">
          Ready-made lessons with {EXERCISES.length} coding exercises, from Hello World to FizzBuzz, each with auto-graded
          tests. Pick a language and a copy goes into your Google Drive™.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {STARTER_LANGUAGES.map((l) => {
          const state = cards[l] ?? {};
          return (
            <div
              key={l}
              className="overflow-hidden rounded-xl border-2 border-[#a8d05f] bg-white shadow-md transition-all hover:border-[#6b8f2b] hover:shadow-lg"
            >
              <Cover language={l} />
              <div className="flex flex-col gap-3 p-4">
                <p className="text-xs font-medium text-[#6b8f2b]/70">
                  {EXERCISES.length} exercises · auto-graded tests
                </p>
                {state.deck ? (
                  <a
                    href={state.deck.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#6b8f2b] px-4 py-2 text-sm font-semibold text-[#6b8f2b] transition-colors hover:bg-[#a8d05f]/15"
                  >
                    Open your deck <ExternalLink className="h-4 w-4" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => create(l)}
                    disabled={busy}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6b8f2b] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#5a7a23] disabled:opacity-60"
                  >
                    {state.loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    )}
                    {state.loading ? "Creating…" : "Use this deck"}
                  </button>
                )}
                {state.error && <p className="text-xs text-red-600">{state.error}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
