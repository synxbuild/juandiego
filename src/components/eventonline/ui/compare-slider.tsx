"use client";

import Image from "next/image";
import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  before: string;
  after: string;
  area: string;
  index: number;
  sizes: string;
  className?: string;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/**
 * Drag-to-compare viewer. Position lives in a CSS variable (no React re-render per frame).
 * Pointer + touch (vertical page scroll still works thanks to touch-action: pan-y) + keyboard.
 */
export function CompareSlider({ before, after, area, index, sizes, className = "" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);
  const beforeTagRef = useRef<HTMLSpanElement>(null);
  const afterTagRef = useRef<HTMLSpanElement>(null);
  const dragging = useRef(false);
  const hint = useRef<gsap.core.Timeline | null>(null);

  function setPos(p: number) {
    const value = clamp(p);
    rootRef.current?.style.setProperty("--pos", `${value}%`);
    knobRef.current?.setAttribute("aria-valuenow", String(Math.round(value)));
    knobRef.current?.setAttribute("aria-valuetext", `${Math.round(100 - value)}% después`);
    if (beforeTagRef.current) beforeTagRef.current.style.opacity = value < 14 ? "0" : "1";
    if (afterTagRef.current) afterTagRef.current.style.opacity = value > 86 ? "0" : "1";
  }

  function stopHint() {
    hint.current?.kill();
    hint.current = null;
  }

  function fromPointer(e: PointerEvent<HTMLDivElement>) {
    const rect = rootRef.current!.getBoundingClientRect();
    setPos(((e.clientX - rect.left) / rect.width) * 100);
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    stopHint();
    dragging.current = true;
    rootRef.current?.classList.add("is-dragging");
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (dragging.current) fromPointer(e);
  }

  function onPointerUp() {
    dragging.current = false;
    rootRef.current?.classList.remove("is-dragging");
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const current = Number(knobRef.current?.getAttribute("aria-valuenow") ?? 50);
    const step = e.shiftKey ? 15 : 5;
    const next =
      e.key === "ArrowLeft" ? current - step :
      e.key === "ArrowRight" ? current + step :
      e.key === "Home" ? 0 :
      e.key === "End" ? 100 : null;
    if (next === null) return;
    e.preventDefault();
    stopHint();
    setPos(next);
  }

  // One-time "this is draggable" hint when the viewer enters the screen.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { p: 50 };
    const tl = gsap.timeline({
      paused: true,
      delay: index * 0.15,
      onUpdate: () => setPos(state.p),
    });
    tl.to(state, { p: 22, duration: 0.9, ease: "power2.inOut" })
      .to(state, { p: 78, duration: 1.2, ease: "power2.inOut" })
      .to(state, { p: 50, duration: 0.9, ease: "power2.inOut" });
    hint.current = tl;
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => hint.current?.play(),
    });
    return () => {
      st.kill();
      tl.kill();
    };
  }, [index]);

  return (
    <div
      ref={rootRef}
      className={`eo-compare group ${className}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image src={after} alt={`${area}, después de la remodelación`} fill sizes={sizes} className="object-cover" draggable={false} />
      <div className="eo-compare__before">
        <Image src={before} alt={`${area}, antes de la remodelación`} fill sizes={sizes} className="object-cover" draggable={false} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" aria-hidden="true" />

      <span ref={beforeTagRef} className="eo-compare__tag eo-glass pointer-events-none absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em]">
        Antes
      </span>
      <span ref={afterTagRef} className="eo-compare__tag pointer-events-none absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-eo-black">
        Después
      </span>

      <div className="eo-compare__line" aria-hidden="true" />
      <div
        ref={knobRef}
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes y después: ${area}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="50% después"
        onKeyDown={onKeyDown}
        className="eo-compare__knob"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
        <span className="text-lg font-medium tracking-tight">{area}</span>
        <span className="font-caps text-[0.625rem] tracking-[0.3em] text-white/70">{String(index + 1).padStart(2, "0")}</span>
      </p>
    </div>
  );
}
