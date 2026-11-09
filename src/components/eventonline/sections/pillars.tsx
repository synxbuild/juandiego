"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pillars } from "../content";
import { CtaButton } from "../ui/cta-button";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-anchored timeline: a gold line fills as you read, each pillar lights up when it
 * crosses the reading line, and (desktop) a sticky panel mirrors the active pillar.
 */
export function Pillars() {
  const listRef = useRef<HTMLOListElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLElement>("[data-pillar]"));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.4 } },
      );
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 60%",
          toggleClass: "is-active",
          onToggle: (self) => {
            if (self.isActive) setActive(i);
          },
        });
      });
    }, list);

    return () => ctx.revert();
  }, []);

  const current = pillars[active];

  return (
    <section id="metodo" aria-labelledby="pillars-title" className="eo-noise relative overflow-x-clip bg-eo-black py-28 md:py-36">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(201_164_92/0.14),transparent)]"
        aria-hidden="true"
      />

      <div className="eo-shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <p data-reveal className="eo-eyebrow text-eo-gold-soft">
            El método
          </p>
          <h2 id="pillars-title" data-reveal className="eo-title mt-6 text-[2.5rem] md:text-[4rem]">
            Seis pilares. <span className="eo-serif eo-gold">Un solo sistema.</span>
          </h2>
          <p data-reveal className="mx-auto mt-6 max-w-xl leading-relaxed text-white/60 md:text-lg">
            No se trata solo de comprar casas abandonadas. Es un proceso con etapas claras, desde encontrar la
            oportunidad hasta construir ingresos recurrentes.
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Sticky mirror of the active pillar (desktop). */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="eo-metal-card sticky top-32 overflow-hidden rounded-[1.75rem] p-10" aria-hidden="true">
              <div className="pointer-events-none absolute -bottom-24 -right-24 size-72 rounded-full bg-eo-gold/10 blur-3xl" />
              <p className="flex items-center justify-between text-[0.625rem] uppercase tracking-[0.24em] text-white/50">
                <span>Etapa</span>
                <span>
                  <span className="text-white">{current.number}</span> / 06
                </span>
              </p>
              <div className="relative mt-4 h-[11rem]">
                {pillars.map((p, i) => (
                  <span
                    key={p.number}
                    className={`eo-outline-word absolute left-0 top-0 text-[11rem] transition-all duration-700 ease-[var(--ease-out-expo)] [-webkit-text-stroke-color:rgb(232_207_149/0.75)] ${
                      i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-8 opacity-0" : "translate-y-8 opacity-0"
                    }`}
                  >
                    {p.number}
                  </span>
                ))}
              </div>
              <p key={current.verb} className="eo-caps eo-fade-up mt-6 text-xs text-eo-gold-soft">
                {current.verb}
              </p>
              <p key={current.title} className="eo-fade-up mt-2 text-2xl font-medium tracking-tight">
                {current.title}
              </p>
              <div className="mt-8 flex gap-1.5">
                {pillars.map((p, i) => (
                  <span
                    key={p.number}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= active ? "bg-eo-gold-soft" : "bg-white/10"}`}
                  />
                ))}
              </div>
              <div className="mt-10">
                <CtaButton>Reservar mi lugar</CtaButton>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol ref={listRef} className="relative">
              <div className="absolute bottom-6 left-[0.6875rem] top-6 w-px bg-white/10" aria-hidden="true" />
              <div
                ref={fillRef}
                className="absolute bottom-6 left-[0.6875rem] top-6 w-px origin-top scale-y-0 bg-gradient-to-b from-eo-gold-soft via-eo-gold to-eo-gold-deep"
                aria-hidden="true"
              />
              {pillars.map((p) => (
                <li key={p.number} data-pillar className="eo-pillar relative pb-12 pl-14 last:pb-0 md:pb-16">
                  <span
                    className="eo-pillar__dot absolute left-0 top-2 size-[1.4rem] rounded-full border border-eo-gold-soft/60"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-4">
                    <span className="eo-pillar__number text-[3.5rem] font-bold leading-none tracking-tighter md:text-[4.5rem]" aria-hidden="true">
                      {p.number}
                    </span>
                    <span className="eo-caps text-[0.625rem] text-eo-gold-soft">{p.verb}</span>
                  </div>
                  <h3 className="mt-3 text-[1.5rem] font-medium tracking-tight md:text-[1.875rem]">
                    <span className="sr-only">Pilar {p.number}: </span>
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-lg leading-relaxed text-white/60">{p.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-12 lg:hidden">
              <CtaButton className="w-full">Reservar mi lugar</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
