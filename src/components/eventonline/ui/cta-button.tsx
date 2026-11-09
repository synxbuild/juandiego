"use client";

import type { ReactNode } from "react";
import { useRegistration } from "./registration-dialog";

/** Primary metallic CTA. Always opens the registration dialog. */
export function CtaButton({
  children,
  size = "md",
  className = "",
}: {
  children: ReactNode;
  size?: "md" | "lg";
  className?: string;
}) {
  const { open } = useRegistration();
  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      className={`eo-cta ${size === "lg" ? "eo-cta--lg" : ""} ${className}`}
    >
      <span>{children}</span>
      <span className="eo-cta__chip" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
