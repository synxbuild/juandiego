"use client";

import { useEffect, useState } from "react";
import { event } from "../content";
import { useRegistration } from "../ui/registration-dialog";

/** Sticky mobile CTA: appears after the hero, hides over the closing block so it never doubles up. */
export function MobileCta() {
  const { open } = useRegistration();
  const [pastHero, setPastHero] = useState(false);
  const [closingVisible, setClosingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const closing = document.getElementById("cierre");
    const io = new IntersectionObserver(([entry]) => setClosingVisible(entry.isIntersecting), { threshold: 0.15 });
    if (closing) io.observe(closing);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  const show = pastHero && !closingVisible;

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
      }`}
      inert={!show}
    >
      <div className="eo-glass eo-glass--nav flex items-center justify-between gap-3 rounded-2xl p-2 pl-4 shadow-[0_20px_40px_rgb(0_0_0/0.6)]">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Masterclass gratuita</p>
          <p className="truncate text-[0.6875rem] text-white/55">
            {event.shortDateLabel} · {event.timeLabel} {event.shortTimezone}
          </p>
        </div>
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className="eo-cta min-h-12 shrink-0 gap-3 px-1.5 pl-4 text-sm"
        >
          Reservar
          <span className="eo-cta__chip size-9" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </div>
  );
}
