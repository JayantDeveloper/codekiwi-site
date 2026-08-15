"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteDataButton({ sessionCode }: { sessionCode: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const del = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/sessions/${sessionCode}/students`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch {
      setError("Couldn't delete. Try again.");
      setBusy(false);
      setConfirming(false);
    }
  };

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <Trash2 className="h-3.5 w-3.5" />
        Delete student data
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="font-medium text-red-700">Delete all student code &amp; scores?</span>
      <button
        onClick={del}
        disabled={busy}
        className="rounded-lg bg-red-600 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-60"
      >
        {busy ? "Deleting…" : "Yes, delete"}
      </button>
      <button
        onClick={() => setConfirming(false)}
        disabled={busy}
        className="rounded-lg border border-gray-300 px-3 py-1.5 font-semibold text-gray-600 transition-colors hover:bg-gray-50"
      >
        Cancel
      </button>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
