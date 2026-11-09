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
    // overflow-x-clip (not hidden) + z-10: the emblem on the bottom band must overflow into the next section.
    <section id="top" aria-labelledby="hero-title" className="relative z-10 flex min-h-svh flex-col overflow-x-clip bg-eo-black">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div data-parallax="0.3" className="absolute inset-x-0 -top-[10%] h-[120%]">
          <HeroImage />
        </div>
        {/* Mobile: text is left-aligned, so darken from the left. Desktop: centered vignette. */}
        <div className="absolute inset-0 bg-gradient-to-r from-eo-black/85 via-eo-black/55 to-eo-black/20 md:hidden" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(ellipse_60%_55%_at_50%_42%,rgb(5_5_5/0.7),rgb(5_5_5/0.25)_75%,rgb(5_5_5/0.6))] md:block" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-eo-black to-transparent" />
      </div>

      {/* Mobile: everything fits in one screen (min-h-svh), left-aligned. Desktop: centered composition. */}
      <div className="eo-shell relative flex flex-1 flex-col items-start justify-center pb-12 pt-20 text-left md:items-center md:pb-28 md:pt-40 md:text-center">
        <p className="eo-fade-up eo-glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[0.6875rem] font-medium text-white/85 md:px-4 md:py-2 md:text-[0.75rem]" style={d(0)}>
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500/70" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
          <span className="md:hidden">
            Gratis · En vivo · {event.shortDateLabel}, {event.timeLabel} {event.shortTimezone}
          </span>
          <span className="hidden md:inline">
            {event.name} · {event.format} · {event.shortDateLabel}, {event.timeLabel} {event.shortTimezone}
          </span>
        </p>

        <p className="eo-fade-up eo-caps mt-8 hidden text-[0.75rem] text-white/70 md:block" style={d(120)}>
          {hero.kicker}
        </p>

        <h1 id="hero-title" className="eo-title mt-5 max-w-5xl text-[2.125rem] leading-[1.06] sm:text-[3.25rem] md:text-[4.25rem] lg:text-[4.75rem]">
          <SplitWords text={hero.titleLead} start={200} />
          <br className="hidden md:block" />
          <SplitWords text={hero.titleAccent} start={200 + leadWords * 55} wordClassName="eo-serif eo-gold" />
        </h1>

        <p className="eo-fade-up mt-3 max-w-2xl text-[0.875rem] leading-normal text-white/70 md:mt-7 md:text-[1.125rem] md:leading-relaxed" style={d(800)}>
          {hero.body}
        </p>

        <div className="eo-fade-up mt-5 flex w-full flex-col gap-3 sm:w-auto sm:flex-row md:mt-10 md:justify-center" style={d(950)}>
          <CtaButton size="lg" className="w-full sm:w-auto">
            Reservar mi lugar gratis
          </CtaButton>
          <a href="#masterclass" className="eo-ghost hidden sm:inline-flex">
            Qué vas a aprender
          </a>
        </div>

        {/* Mobile: two tight columns under a hairline. Desktop: inline pair with a divider. */}
        <div className="eo-fade-up mt-5 grid w-full grid-cols-2 gap-4 border-t border-white/10 pt-4 md:mt-12 md:flex md:w-auto md:items-center md:gap-10 md:border-t-0 md:pt-0" style={d(1100)}>
          <div className="text-left">
            <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-white/50 md:text-[0.625rem]">Potencial / operación</p>
            <p className="mt-1 whitespace-nowrap text-[0.8125rem] font-semibold tracking-tight md:text-2xl">
              <span className="eo-silver">{hero.potential.value}</span>
              <sup className="ml-0.5 text-[0.625rem] text-eo-gold-soft">*</sup>
            </p>
          </div>
          <span className="hidden h-10 w-px bg-white/15 md:block" aria-hidden="true" />
          <div className="border-l border-white/10 pl-4 text-left md:border-l-0 md:pl-0">
            <p className="text-[0.5625rem] uppercase tracking-[0.18em] text-white/50 md:mb-1 md:text-[0.625rem]">Comienza en</p>
            <div className="mt-1 md:hidden">
              <Countdown variant="mini" />
            </div>
            <div className="hidden md:block">
              <Countdown variant="compact" />
            </div>
          </div>
        </div>
      </div>

      <MarqueeBand />
    </section>
  );
}
