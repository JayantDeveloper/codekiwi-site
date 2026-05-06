"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileText, SlidersHorizontal } from "lucide-react";

type PageState = "choose" | "error";

export default function LaunchSessionPage() {
  const router = useRouter();
  const [pageState, setPageState] = useState<PageState>("choose");
  const [error, setError] = useState<string | null>(null);
  const [templateLoading, setTemplateLoading] = useState(false);

  const handleTemplateSession = async () => {
    setTemplateLoading(true);
    try {
      const res = await fetch("/api/create-presentation", { method: "POST" });
      let data: { presentationUrl?: string; error?: string; details?: string } = {};
      try { data = await res.json(); } catch { /* empty/non-JSON body */ }
      if (!res.ok) throw new Error(data.details || data.error || "Failed to create presentation");
      if (data.presentationUrl) {
        window.open(data.presentationUrl, "_blank");
        router.push("/home");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create presentation");
      setTemplateLoading(false);
      setPageState("error");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a8d05f]/10 to-white px-4">
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
              {/* Template option */}
              <button
                onClick={handleTemplateSession}
                disabled={templateLoading}
                className="group relative flex flex-col items-center gap-4 rounded-2xl border-2 border-[#a8d05f]/50 bg-white p-8 text-left shadow-sm hover:border-[#6b8f2b] hover:shadow-md transition-all disabled:opacity-60"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a8d05f]/20 group-hover:bg-[#a8d05f]/30 transition-colors">
                  {templateLoading ? (
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#a8d05f] border-t-[#6b8f2b]" />
                  ) : (
                    <FileText className="h-7 w-7 text-[#6b8f2b]" />
                  )}
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">Use Template</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Create a fresh copy of the CodeKiwi starter deck
                  </p>
                </div>
              </button>

              {/* Add-on option */}
              <div className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-[#a8d05f]/50 bg-white p-8 text-left shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a8d05f]/20">
                  <SlidersHorizontal className="h-7 w-7 text-[#6b8f2b]" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">Use Your Own Slides</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Open your presentation in Google Slides, then go to{" "}
                    <span className="font-medium text-[#6b8f2b]">Extensions → CodeKiwi</span>{" "}
                    to start a live session.
                  </p>
                </div>
              </div>
            </div>

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
