"use client";

export const dynamic = "force-dynamic";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FileText, FolderOpen, Play, ChevronLeft } from "lucide-react";

interface PickerDoc {
  id: string;
  name: string;
  thumbnailUrl?: string;
  url?: string;
}

interface PickerResponse {
  action: string;
  docs?: PickerDoc[];
}

interface DocsViewInstance {
  setMimeTypes(types: string): DocsViewInstance;
  setIncludeFolders(value: boolean): DocsViewInstance;
}

interface PickerBuilderInstance {
  addView(view: string | DocsViewInstance): PickerBuilderInstance;
  setOAuthToken(token: string): PickerBuilderInstance;
  setDeveloperKey(key: string): PickerBuilderInstance;
  setCallback(fn: (data: PickerResponse) => void): PickerBuilderInstance;
  build(): { setVisible(v: boolean): void };
}

interface GooglePickerNs {
  ViewId: { PRESENTATIONS: string };
  PickerBuilder: new () => PickerBuilderInstance;
  DocsView: new () => DocsViewInstance;
}

interface GapiInstance {
  load(lib: string, cb: () => void): void;
}

declare global {
  interface Window {
    gapi: GapiInstance;
    google: { picker: GooglePickerNs };
  }
}

type SelectedPresentation = {
  id: string;
  name: string;
  thumbnailLink: string | null;
  webViewLink: string | null;
};

type PageState = "choose" | "preview" | "starting" | "error";

export default function LaunchSessionPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [pageState, setPageState] = useState<PageState>("choose");
  const [selected, setSelected] = useState<SelectedPresentation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [templateLoading, setTemplateLoading] = useState(false);
  const gapiLoadedRef = useRef(false);
  // Store the exact token used to open the Picker so export uses the same one
  const pickerTokenRef = useRef<string | null>(null);

  // Preload the Google API script
  useEffect(() => {
    if (gapiLoadedRef.current || typeof window === "undefined") return;
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    gapiLoadedRef.current = true;
  }, []);

  const openDrivePicker = () => {
    const accessToken = session?.accessToken;
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PICKER_API_KEY;
    if (!accessToken || !apiKey) return;

    // Capture the token so handlePresentLive uses the exact same one
    pickerTokenRef.current = accessToken;

    const initPicker = () => {
      window.gapi.load("picker", () => {
        // DocsView with explicit MIME type is the correct way to grant
        // drive.file per-file authorization for Picker-selected files
        const view = new window.google.picker.DocsView()
          .setMimeTypes("application/vnd.google-apps.presentation")
          .setIncludeFolders(false);
        const picker = new window.google.picker.PickerBuilder()
          .addView(view)
          .setOAuthToken(accessToken)
          .setDeveloperKey(apiKey)
          .setCallback(async (data: PickerResponse) => {
            if (data.action !== "picked" || !data.docs?.[0]) return;
            const doc = data.docs[0];
            // Fetch richer info (thumbnail) from our API
            const infoRes = await fetch(`/api/presentations/info?id=${doc.id}`);
            const info = infoRes.ok ? await infoRes.json() : {};
            setSelected({
              id: doc.id,
              name: doc.name || info.name || "Untitled Presentation",
              thumbnailLink: info.thumbnailLink || doc.thumbnailUrl || null,
              webViewLink: info.webViewLink || doc.url || null,
            });
            setPageState("preview");
          })
          .build();
        picker.setVisible(true);
      });
    };

    if (window.gapi) {
      initPicker();
    } else {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = initPicker;
      document.head.appendChild(script);
    }
  };

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

  const handlePresentLive = async () => {
    if (!selected) return;
    setPageState("starting");
    try {
      // Export using the same token that was passed to the Picker — this is the
      // token that Drive registered the per-file authorization against.
      const accessToken = pickerTokenRef.current ?? session?.accessToken;
      if (!accessToken) throw new Error("Not authenticated with Google. Please sign out and sign back in.");

      const exportRes = await fetch(
        `https://www.googleapis.com/drive/v3/files/${selected.id}/export?mimeType=application%2Fpdf`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      if (!exportRes.ok) {
        if (exportRes.status === 403) {
          throw new Error(
            "Google Drive permission denied. Please sign out, sign back in, then re-select your presentation."
          );
        }
        throw new Error(`Failed to export presentation (HTTP ${exportRes.status}). Please try again.`);
      }

      const pdfBuffer = await exportRes.arrayBuffer();
      const uint8 = new Uint8Array(pdfBuffer);
      let binary = "";
      for (let i = 0; i < uint8.length; i += 8192) {
        binary += String.fromCharCode(...Array.from(uint8.subarray(i, i + 8192)));
      }
      const fileBase64 = btoa(binary);

      const res = await fetch("/api/sessions/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ presentationId: selected.id, title: selected.name, fileBase64 }),
      });
      let data: { sessionCode?: string; error?: string } = {};
      try { data = await res.json(); } catch { /* empty/non-JSON body */ }
      if (!res.ok || !data.sessionCode) {
        throw new Error(data.error || "Failed to start session. Please try again.");
      }
      window.location.href = `https://www.codekiwi.app/teacher/${data.sessionCode}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start session");
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

              {/* Choose from Drive option */}
              <button
                onClick={openDrivePicker}
                className="group flex flex-col items-center gap-4 rounded-2xl border-2 border-[#a8d05f]/50 bg-white p-8 text-left shadow-sm hover:border-[#6b8f2b] hover:shadow-md transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a8d05f]/20 group-hover:bg-[#a8d05f]/30 transition-colors">
                  <FolderOpen className="h-7 w-7 text-[#6b8f2b]" />
                </div>
                <div className="text-center">
                  <p className="text-base font-semibold text-[#1a1a1a]">Choose from Drive</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Pick an existing Google Slides presentation and go live
                  </p>
                </div>
              </button>
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

        {/* Preview state */}
        {pageState === "preview" && selected && (
          <div className="space-y-6">
            <button
              onClick={() => setPageState("choose")}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#6b8f2b] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Choose a different presentation
            </button>

            <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
              {/* Thumbnail */}
              <div className="relative w-full bg-[#f1f3f4]" style={{ paddingBottom: "56.25%" }}>
                {selected.thumbnailLink ? (
                  <img
                    src={selected.thumbnailLink}
                    alt={selected.name}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-300" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="36" height="36" rx="3" fill="#FBBC04" />
                    <rect x="12" y="13" width="24" height="22" rx="1" fill="white" />
                    <rect x="16" y="17" width="16" height="2" rx="1" fill="#BDC1C6" />
                    <rect x="16" y="21" width="16" height="2" rx="1" fill="#BDC1C6" />
                    <rect x="16" y="25" width="10" height="2" rx="1" fill="#BDC1C6" />
                  </svg>
                </div>
              </div>

              {/* Info + actions */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-6">
                  <svg className="h-6 w-6 flex-shrink-0 mt-0.5" viewBox="0 0 48 48" fill="none">
                    <rect x="6" y="6" width="36" height="36" rx="3" fill="#FBBC04" />
                    <rect x="12" y="13" width="24" height="22" rx="1" fill="white" />
                    <rect x="16" y="17" width="16" height="2" rx="1" fill="#BDC1C6" />
                    <rect x="16" y="21" width="16" height="2" rx="1" fill="#BDC1C6" />
                    <rect x="16" y="25" width="10" height="2" rx="1" fill="#BDC1C6" />
                  </svg>
                  <div>
                    <p className="font-semibold text-[#1a1a1a] text-lg leading-tight">{selected.name}</p>
                    <p className="text-sm text-gray-500 mt-0.5">Google Slides</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handlePresentLive}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6b8f2b] to-[#7da332] hover:from-[#5a7a23] hover:to-[#6b8f2b] text-white font-semibold py-3 px-6 shadow-md transition-all"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    Present Live
                  </button>
                  <a
                    href={selected.webViewLink ?? `https://docs.google.com/presentation/d/${selected.id}/edit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-[#a8d05f]/60 bg-white hover:border-[#6b8f2b] hover:bg-[#f8faf5] text-[#6b8f2b] font-semibold py-3 px-6 transition-all"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Edit in Google Slides
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Starting state */}
        {pageState === "starting" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#a8d05f]/30 border-t-[#6b8f2b]" />
            <div>
              <h1 className="text-2xl font-bold text-[#6b8f2b]">Preparing your session…</h1>
              <p className="text-[#6b8f2b]/70 mt-1">Exporting slides and setting up your room</p>
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
