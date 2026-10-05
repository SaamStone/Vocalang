import type React from "react";

/**
 * Vocalang Logo — SVG wordmark with sound-wave motif.
 * Replaceable: a final logo will be supplied later.
 * Supports light/dark via currentColor.
 */
export function Logo({
  className = "",
  size = "default",
}: {
  className?: string;
  size?: "small" | "default" | "large";
}) {
  const dimensions = {
    small: { width: 120, height: 28 },
    default: { width: 160, height: 36 },
    large: { width: 220, height: 48 },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 220 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Vocalang"
    >
      {/* Sound-wave motif */}
      <g className="text-[rgb(var(--color-primary))]">
        <rect x="4" y="16" width="3" height="16" rx="1.5" fill="currentColor" opacity="0.5" />
        <rect x="10" y="10" width="3" height="28" rx="1.5" fill="currentColor" opacity="0.7" />
        <rect x="16" y="6" width="3" height="36" rx="1.5" fill="currentColor" />
        <rect x="22" y="12" width="3" height="24" rx="1.5" fill="currentColor" opacity="0.8" />
        <rect x="28" y="18" width="3" height="12" rx="1.5" fill="currentColor" opacity="0.4" />
      </g>

      {/* Wordmark */}
      <text
        x="40"
        y="34"
        className="fill-[rgb(var(--color-foreground))]"
        fontFamily="var(--font-sans)"
        fontSize="26"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        Vocalang
      </text>
    </svg>
  );
}

/**
 * Logo icon only (for favicon / mobile)
 */
export function LogoIcon({
  className = "",
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Vocalang"
    >
      <rect width="32" height="32" rx="8" className="fill-[rgb(var(--color-primary))]" />
      <rect x="5" y="11" width="2.5" height="10" rx="1.25" fill="white" opacity="0.5" />
      <rect x="9.5" y="7" width="2.5" height="18" rx="1.25" fill="white" opacity="0.7" />
      <rect x="14" y="4" width="2.5" height="24" rx="1.25" fill="white" />
      <rect x="18.5" y="8" width="2.5" height="16" rx="1.25" fill="white" opacity="0.8" />
      <rect x="23" y="12" width="2.5" height="8" rx="1.25" fill="white" opacity="0.4" />
    </svg>
  );
}
