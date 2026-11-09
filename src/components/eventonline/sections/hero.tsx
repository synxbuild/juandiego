import { getImageProps } from "next/image";
import type { CSSProperties } from "react";
import { event, hero } from "../content";
import { CtaButton } from "../ui/cta-button";
import { Countdown } from "../ui/countdown";
import { MarqueeBand } from "./marquee-band";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function HeroImage() {
  // Two art-directed files (studio convention): desktop landscape + mobile portrait.
  const common = { alt: "", sizes: "100vw", quality: 90, priority: true };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: "/images/logra-background-final.webp", width: 1920, height: 1080 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: "/images/logra-background-mobile.webp", width: 1080, height: 1920 });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative, alt="" comes from props */}
      <img {...rest} className="size-full object-cover object-top brightness-[0.85] saturate-[0.7] md:brightness-[2.6] md:contrast-[1.1] md:saturate-[0.8]" />
    </picture>
  );
}

/**
 * Word-by-word masked reveal. The text style (e.g. metallic gradient) is applied to each
 * animated word: background-clip:text on a parent does not paint into transformed children.
 */
function SplitWords({ text, start, wordClassName = "" }: { text: string; start: number; wordClassName?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="eo-word">
          <span className={wordClassName} style={d(start + i * 55)}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const leadWords = hero.titleLead.split(" ").length;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden bg-eo-black">
      <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <div data-parallax="0.3" className="absolute inset-x-0 -top-[10%] h-[120%]">
          <HeroImage />
        </div>
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgb(5_5_5/0.7),rgb(5_5_5/0.25)_75%,rgb(5_5_5/0.6))]"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-eo-black to-transparent" aria-hidden="true" />

      <div className="eo-shell flex flex-1 flex-col items-center justify-center pb-24 pt-32 text-center md:pb-28 md:pt-40">
        <p className="eo-fade-up eo-glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-[0.75rem] font-medium text-white/85" style={d(0)}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500/70" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          {event.name} · {event.format} · {event.shortDateLabel}, {event.timeLabel} {event.shortTimezone}
        </p>

        <p className="eo-fade-up eo-caps mt-8 text-[0.625rem] text-white/70 md:text-[0.75rem]" style={d(120)}>
          {hero.kicker}
        </p>

        <h1 id="hero-title" className="eo-title mt-5 max-w-5xl text-[2.375rem] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem]">
          <SplitWords text={hero.titleLead} start={200} />
          <br className="hidden md:block" />
          <SplitWords text={hero.titleAccent} start={200 + leadWords * 55} wordClassName="eo-serif eo-gold" />
        </h1>

        <p className="eo-fade-up mt-7 max-w-2xl text-[1rem] leading-relaxed text-white/70 md:text-[1.125rem]" style={d(800)}>
          {hero.body}
        </p>

        <div className="eo-fade-up mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row" style={d(950)}>
          <CtaButton size="lg" className="w-full sm:w-auto">
            Reservar mi lugar gratis
          </CtaButton>
          <a href="#masterclass" className="eo-ghost w-full sm:w-auto">
            Qué vas a aprender
          </a>
        </div>

        <div className="eo-fade-up mt-12 flex flex-col items-center gap-6 md:flex-row md:gap-10" style={d(1100)}>
          <div className="text-center md:text-left">
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-white/50">Potencial por operación</p>
            <p className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              <span className="eo-silver">{hero.potential.value}</span>
              <sup className="ml-1 text-xs text-eo-gold-soft">*</sup>
            </p>
          </div>
          <span className="hidden h-10 w-px bg-white/15 md:block" aria-hidden="true" />
          <div className="text-center md:text-left">
            <p className="mb-1 text-[0.625rem] uppercase tracking-[0.2em] text-white/50">Comienza en</p>
            <Countdown compact />
          </div>
        </div>
      </div>

      <MarqueeBand />
    </section>
  );
}
