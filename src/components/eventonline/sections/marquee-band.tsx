"use client";

import Image from "next/image";
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

function Emblem() {
  const text = "LOGRA · BIENES RAÍCES · PUERTO RICO · ";
  return (
    <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-eo-ink/90 shadow-[0_0_0_6px_rgb(255_255_255/0.04),0_20px_50px_rgb(0_0_0/0.6)] backdrop-blur md:size-36">
      <svg viewBox="0 0 120 120" className="eo-emblem-ring absolute inset-1.5" aria-hidden="true">
        <defs>
          <path id="eo-emblem-circle" d="M60,60 m-48,0 a48,48 0 1,1 96,0 a48,48 0 1,1 -96,0" />
        </defs>
        <text className="fill-white/70" style={{ fontFamily: "var(--font-cinzel)", fontSize: 8.4 }}>
          <textPath href="#eo-emblem-circle" textLength="298" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Image src="/images/logra-icon.png" alt="" width={187} height={224} className="h-auto w-9 md:w-11" />
    </div>
  );
}
