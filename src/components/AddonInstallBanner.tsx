"use client";

import { useEffect, useState } from "react";
import { Puzzle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DISMISS_KEY = "codekiwi-addon-banner-dismissed";

export function AddonInstallBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="relative mb-6 flex flex-col gap-4 rounded-xl border border-[#a8d05f]/60 bg-[#f0f8e0] p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#6b8f2b]">
        <Puzzle className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="font-semibold text-[#3a5214]">
          Teach straight from Google Slides™
        </p>
        <p className="text-sm text-[#6b8f2b]/80">
          Install the CodeKiwi add-on to mark coding slides and launch live
          sessions without leaving your deck.
        </p>
      </div>
      <a
        href="https://workspace.google.com/marketplace"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0"
      >
        <Button className="bg-[#6b8f2b] text-white hover:bg-[#5a7a23]">
          Get the add-on
        </Button>
      </a>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        className="absolute right-2 top-2 rounded-full p-1 text-[#6b8f2b]/60 transition-colors hover:bg-[#6b8f2b]/10 hover:text-[#6b8f2b] sm:static sm:ml-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
