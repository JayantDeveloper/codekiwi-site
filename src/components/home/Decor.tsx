/**
 * The one flat decorative shape the site uses, in the vocabulary Pear Deck and
 * CS Room use.
 *
 * Two rules, both learned the hard way:
 *
 * 1. SOLID FILLS ONLY. No outlines, no dot grids, no textures. The references
 *    use filled shapes exclusively; an outlined ring reads as a UI element
 *    rather than as background. Quarter circles and plain discs read as
 *    geometry rather than as organic background, so only the blob survives.
 *
 * 2. TONAL COLOUR. A shape sits one step off the band behind it, in the same
 *    hue family. A contrasting shape stops being depth and becomes an object
 *    the eye has to account for.
 *
 * And the reason they work at all: a shape must be PARTIALLY HIDDEN, either by
 * a card in front of it or by the section edge cropping it. Fully visible in
 * open space it just looks like a sticker. So each section using these gets
 * `relative overflow-hidden`, with the real content lifted on `relative z-10`.
 */

/** Organic lozenge. The lopsided radius is what stops it reading as a circle. */
export function Blob({
  className,
  color,
}: {
  className?: string;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-[62%_38%_55%_45%/50%_62%_38%_50%] ${className ?? ""}`}
      style={{ background: color }}
    />
  );
}

/**
 * Flat kiwi slice: rind ring, flesh, pale core, radial seeds.
 *
 * This is the on-theme replacement for a plain blob in the hero. Kept tonal and
 * flat like everything else, so it reads as background rather than as clip art;
 * at low contrast you register the kiwi silhouette without being shouted at.
 */
export function KiwiSlice({
  className,
  rind,
  flesh,
  core,
  seed,
  seeds = 22,
}: {
  className?: string;
  rind: string;
  flesh: string;
  core: string;
  seed: string;
  seeds?: number;
}) {
  const rays = Array.from({ length: seeds }, (_, i) => (360 / seeds) * i);
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      className={`pointer-events-none absolute ${className ?? ""}`}
    >
      <circle cx="100" cy="100" r="100" fill={rind} />
      <circle cx="100" cy="100" r="92" fill={flesh} />
      {rays.map((a) => (
        <rect
          key={a}
          x="99.1"
          y="26"
          width="1.8"
          height="48"
          rx="0.9"
          fill={core}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      {rays.map((a) => (
        <ellipse
          key={`s${a}`}
          cx="100"
          cy="52"
          rx="2.6"
          ry="4.6"
          fill={seed}
          transform={`rotate(${a} 100 100)`}
        />
      ))}
      <circle cx="100" cy="100" r="20" fill={core} />
    </svg>
  );
}
