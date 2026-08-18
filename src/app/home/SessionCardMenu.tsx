"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

type Mode = null | "menu" | "rename" | "delete";

export function SessionCardMenu({
  sessionCode,
  title,
  isActive,
}: {
  sessionCode: string;
  title: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [name, setName] = useState(title);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click / Escape (modals have their own close).
  useEffect(() => {
    if (mode !== "menu") return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMode(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMode(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [mode]);

  const rename = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/sessions/${sessionCode}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmed }),
      });
      if (!res.ok) throw new Error();
      setMode(null);
      router.refresh();
    } catch {
      setError("Couldn't rename. Try again.");
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/sessions/${sessionCode}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setMode(null);
      router.refresh();
    } catch {
      setError("Couldn't delete. Try again.");
      setBusy(false);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        aria-label="Session options"
        onClick={() => setMode(mode === "menu" ? null : "menu")}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {mode === "menu" && (
        <div className="absolute left-0 top-9 z-20 w-40 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <button
            onClick={() => {
              setName(title);
              setError(null);
              setMode("rename");
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Rename
          </button>
          <button
            onClick={() => {
              setError(null);
              setMode("delete");
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      )}

      {/* Rename modal */}
      {mode === "rename" && (
        <Overlay onClose={() => !busy && setMode(null)}>
          <h3 className="mb-3 text-base font-semibold text-[#1a1a1a]">Rename session</h3>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && rename()}
            maxLength={200}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#6b8f2b] focus:ring-1 focus:ring-[#6b8f2b]"
            placeholder="Session title"
          />
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setMode(null)}
              disabled={busy}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={rename}
              disabled={busy || !name.trim()}
              className="rounded-lg bg-[#6b8f2b] px-3 py-1.5 text-sm font-semibold text-white hover:bg-[#5a7a23] disabled:opacity-60"
            >
              {busy ? "Saving…" : "Save"}
            </button>
          </div>
        </Overlay>
      )}

      {/* Delete confirm modal */}
      {mode === "delete" && (
        <Overlay onClose={() => !busy && setMode(null)}>
          <h3 className="mb-2 text-base font-semibold text-[#1a1a1a]">Delete this session?</h3>
          <p className="text-sm text-gray-600">
            This permanently removes{" "}
            <span className="font-medium text-gray-800">&ldquo;{title}&rdquo;</span> and its saved
            gradebook. This can&apos;t be undone.
          </p>
          {isActive && (
            <p className="mt-2 text-xs text-amber-700">
              This session is still live. Deleting it here won&apos;t disconnect students.
            </p>
          )}
          {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={() => setMode(null)}
              disabled={busy}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={remove}
              disabled={busy}
              className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {busy ? "Deleting…" : "Delete"}
            </button>
          </div>
        </Overlay>
      )}
    </div>
  );
}

function Overlay({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-2xl">{children}</div>
    </div>
  );
}
