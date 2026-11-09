/**
 * Gabled-roof section divider (real-estate motif) with a thin gold ridge line.
 * direction="up":   the colour below rises into the section as a roof.
 * direction="down": the colour above closes as an inverted gable over the next section.
 */
export function RoofDivider({
  id,
  fill,
  className = "",
  direction = "up",
}: {
  /** Unique per page: used for the SVG gradient id. */
  id: string;
  fill: string;
  className?: string;
  direction?: "up" | "down";
}) {
  const shape = direction === "up" ? "M0 120L720 8L1440 120Z" : "M0 0H1440V120L720 8L0 120Z";
  const gradientId = `eo-roof-${id}`;

  return (
    <svg className={`h-14 w-full md:h-28 ${className}`} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9a45c" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e8cf95" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={shape} fill={fill} />
      <path d="M0 120L720 8L1440 120" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
