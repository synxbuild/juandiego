"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";

/** Accessible accordion item with a smooth height transition (CSS grid rows, no measuring). */
export function Disclosure({
  summary,
  children,
  className = "",
  buttonClassName = "",
  iconClassName = "",
}: {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={`eo-faq__item ${className}`} data-open={open}>
      <button
        id={`${id}-button`}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between gap-6 text-left ${buttonClassName}`}
      >
        <span>{summary}</span>
        <span className={`eo-faq__icon grid size-9 shrink-0 place-items-center rounded-full border ${iconClassName}`} aria-hidden="true">
          <Plus className="size-4" />
        </span>
      </button>
      {/* inert while collapsed: hidden content stays out of the tab order and the a11y tree. */}
      <div id={id} className="eo-faq__panel" role="region" aria-labelledby={`${id}-button`} inert={!open}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
