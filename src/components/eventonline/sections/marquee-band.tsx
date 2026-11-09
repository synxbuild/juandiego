"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { marqueeItems } from "../content";

gsap.registerPlugin(ScrollTrigger);

/**
 * Letter-spaced caps band with the LOGRA emblem in the middle.
 * Base speed is constant; scrolling adds velocity (and direction) for a tactile feel.
 */
export function MarqueeBand() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    if (!track) return;

    const loop = gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
    const st = ScrollTrigger.create({
      trigger: track,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const direction = self.direction === -1 ? -1 : 1;
        const speed = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
        gsap.to(loop, {
          timeScale: speed * direction,
          duration: 0.3,
          overwrite: true,
          onComplete: () => {
            gsap.to(loop, { timeScale: direction, duration: 1.2, overwrite: true });
          },
        });
      },
    });
    return () => {
      st.kill();
      loop.kill();
    };
  }, []);

  const row = (
    <ul className="flex shrink-0 items-center">
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center">
          <span className="eo-caps whitespace-nowrap px-8 text-[0.8125rem] text-white/80 md:text-sm">{item}</span>
          <span className="text-eo-gold-soft" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="relative z-10">
      <div className="eo-glass overflow-hidden rounded-none border-x-0 py-3.5 md:py-6" aria-hidden="true">
        <div ref={trackRef} className="eo-marquee-track">
          {row}
          {row}
          {row}
          {row}
        </div>
      </div>
      <Emblem />
    </div>
  );
}

const EMBLEM_TEXT = "LOGRA · BIENES RAÍCES · PUERTO RICO · ";

/**
 * Rotating seal, drawn entirely in ONE SVG (disc, rings, letters, icon) so the geometry is
 * identical in every browser. Each letter is placed at an exact angle instead of using
 * <textPath textLength>, which Safari spaces differently and let letters collide with the ring.
 */
function Emblem() {
  const chars = Array.from(EMBLEM_TEXT);
  const step = 360 / chars.length;

  return (
    <div className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_6px_rgb(255_255_255/0.04),0_20px_50px_rgb(0_0_0/0.6)] md:size-40">
      <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
        <circle cx="60" cy="60" r="59.5" fill="#0b0b0b" stroke="rgb(255 255 255 / 0.16)" strokeWidth="0.75" />
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="0.5" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="rgb(232 207 149 / 0.45)" strokeWidth="0.5" />

        {/* Letters sit on radius 44 (cap height ~5): well inside the r=54 ring. */}
        <g className="eo-emblem-ring" style={{ transformOrigin: "60px 60px", transformBox: "view-box" }}>
          {chars.map((char, i) => (
            <text
              key={i}
              x="60"
              y="16"
              textAnchor="middle"
              transform={`rotate(${(i * step).toFixed(3)} 60 60)`}
              fill="rgb(255 255 255 / 0.72)"
              style={{ fontFamily: "var(--font-cinzel)", fontSize: 7, fontWeight: 500 }}
            >
              {char}
            </text>
          ))}
        </g>

        <image href="/images/logra-icon.png" x="45" y="42" width="30" height="36" />
      </svg>
    </div>
  );
}
