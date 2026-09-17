"use client";

import { useState } from "react";

// Tries each candidate image in order (stored slide 1 → Drive thumbnail),
// falling through on load errors to the Slides placeholder.
export function SessionThumb({ sources, alt }: { sources: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const src = sources[idx];

  if (!src) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="h-16 w-16 opacity-30" viewBox="0 0 48 48" fill="none">
          <rect x="6" y="6" width="36" height="36" rx="3" fill="#FBBC04" />
          <rect x="12" y="13" width="24" height="22" rx="1" fill="white" />
          <rect x="16" y="17" width="16" height="2" rx="1" fill="#BDC1C6" />
          <rect x="16" y="21" width="16" height="2" rx="1" fill="#BDC1C6" />
          <rect x="16" y="25" width="10" height="2" rx="1" fill="#BDC1C6" />
        </svg>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      onError={() => setIdx((i) => i + 1)}
      className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
    />
  );
}
