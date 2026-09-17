import Image from "next/image";
import { MARKETPLACE_LISTING_URL } from "@/lib/marketplace";

// Official "get it from the Google Workspace Marketplace" badge, served
// unmodified from /public/gwm-badge.svg (source:
// https://workspace.google.com/static/img/marketplace/en/gwmBadge.svg).
// Google's rules: never alter it, keep clear space of 1/4 the badge height on
// every side, and always link it to the Marketplace listing.
const RATIO = 417.14 / 68.57;

export function MarketplaceBadge({
  height = 44,
  className,
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * RATIO);
  const clearSpace = Math.round(height / 4);
  return (
    <a
      href={MARKETPLACE_LISTING_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get CodeKiwi from the Google Workspace Marketplace"
      className={`inline-block transition-transform duration-300 hover:scale-[1.03]${className ? ` ${className}` : ""}`}
      style={{ padding: clearSpace }}
    >
      <Image
        src="/gwm-badge.svg"
        alt="Get it from the Google Workspace Marketplace"
        width={width}
        height={height}
        unoptimized
        priority
        className="block h-auto rounded-lg shadow-md"
        style={{ width, height }}
      />
    </a>
  );
}
