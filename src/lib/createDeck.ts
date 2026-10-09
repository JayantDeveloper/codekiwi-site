// Client side of /api/create-presentation, shared by the launch page (blank
// lesson) and the dashboard's starter decks.
//
// The new tab is opened synchronously, inside the click: browsers block
// window.open() after an await, which made the button look dead even though
// the deck was created. The tab shows a placeholder until the deck exists.

import type { StarterLanguage } from "./starterExercises";

export type DeckRequest = { kind: "blank" } | { language: StarterLanguage };
export type CreatedDeck = { url: string; title: string; opened: boolean };

export async function createDeck(req: DeckRequest): Promise<CreatedDeck> {
  const tab = window.open("", "_blank");
  if (tab) {
    tab.document.title = "Creating your CodeKiwi deck…";
    tab.document.body.innerHTML =
      '<p style="font:16px system-ui,sans-serif;color:#3d4a2a;padding:48px;text-align:center">Creating your CodeKiwi deck in Google Drive…</p>';
  }
  try {
    const res = await fetch("/api/create-presentation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    let data: { presentationUrl?: string; title?: string; error?: string; details?: string } = {};
    try { data = await res.json(); } catch { /* empty/non-JSON body */ }
    if (!res.ok || !data.presentationUrl) throw new Error(data.details || data.error || "Failed to create presentation");
    const opened = !!tab && !tab.closed;
    if (opened) tab!.location.href = data.presentationUrl;
    return { url: data.presentationUrl, title: data.title || "Your CodeKiwi deck", opened };
  } catch (err) {
    tab?.close();
    throw err;
  }
}
