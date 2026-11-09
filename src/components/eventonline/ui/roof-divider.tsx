/**
 * Subtle roof-shaped section divider (real-estate motif): low pitch with a flat, squared ridge,
 * plus a thin gold line along the roofline.
 * direction="up":   the colour below rises into the section as a roof.
 * direction="down": the colour above closes as an inverted roof over the next section.
 */
const ROOFLINE = "M0 80L600 16H840L1440 80";

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
  const shape = direction === "up" ? `${ROOFLINE}Z` : `M0 0H1440V80L840 16H600L0 80Z`;
  const gradientId = `eo-roof-${id}`;

  return (
    <svg className={`h-8 w-full md:h-14 ${className}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9a45c" stopOpacity="0" />
          <stop offset="0.5" stopColor="#e8cf95" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={shape} fill={fill} />
      <path d={ROOFLINE} fill="none" stroke={`url(#${gradientId})`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
