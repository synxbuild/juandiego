import Image from "next/image";
import type { CSSProperties } from "react";
import { Building2, ChartNoAxesCombined, KeyRound, ListChecks, Workflow } from "lucide-react";
import { learning } from "../content";
import { CtaButton } from "../ui/cta-button";

const ICONS = { chart: ChartNoAxesCombined, flow: Workflow, building: Building2 } as const;
const TAKEAWAY_ICONS = { system: ListChecks, rent: KeyRound } as const;

export function Learn() {
  return (
    <section id="masterclass" aria-labelledby="learn-title" className="relative overflow-x-clip bg-eo-paper pb-28 text-eo-black md:pb-36">
      {/* Faint giant column from the LOGRA mark, like the reference's watermark. */}
      <Image
        src="/images/logra-icon.png"
        alt=""
        width={187}
        height={224}
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 top-0 hidden h-auto w-[30rem] opacity-[0.06] grayscale lg:block"
      />

      <div className="eo-shell relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div>
            <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-deep">
              La masterclass
            </p>
            <h2 id="learn-title" data-reveal className="mt-5 text-[2.75rem] leading-[1.02] md:text-[4rem]">
              <span className="eo-serif">Qué vas a</span> <span className="eo-serif eo-gold-dark">aprender</span>
            </h2>
            <p data-reveal className="mt-4 text-xl font-light text-black/80 md:text-2xl">
              Del primer hallazgo a la venta.
            </p>
            <p data-reveal className="mt-6 max-w-md leading-relaxed text-black/60">
              {learning.outcome}
            </p>

            <p data-reveal className="mt-10 text-[0.625rem] font-medium uppercase tracking-[0.24em] text-eo-gold-deep">
              Al finalizar la masterclass
            </p>
            <ul data-reveal-group className="mt-4 grid gap-4 sm:grid-cols-2">
              {learning.takeaways.map((t) => {
                const Icon = TAKEAWAY_ICONS[t.icon];
                const isBonus = t.label === "Bono";
                return (
                  <li key={t.title}>
                    <article className="group h-full overflow-hidden rounded-[1.25rem] bg-eo-black text-white shadow-[0_30px_60px_-30px_rgb(0_0_0/0.45)]">
                      <div className="relative h-36 overflow-hidden">
                        <Image
                          src={t.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 92vw"
                          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-eo-black via-eo-black/30 to-transparent" aria-hidden="true" />
                        <span
                          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] ${
                            isBonus ? "bg-eo-gold-soft text-eo-black" : "eo-glass text-white"
                          }`}
                        >
                          {t.label}
                        </span>
                        <span className="absolute bottom-3 left-4 grid size-11 place-items-center rounded-xl bg-eo-black/80 text-eo-gold-soft ring-1 ring-eo-gold-soft/40 backdrop-blur">
                          <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                        </span>
                      </div>
                      <div className="p-5 pt-3">
                        <h3 className="font-medium leading-snug">{t.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{t.body}</p>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>

            <div data-reveal className="mt-8 hidden lg:block">
              <CtaButton>Quiero aprender el sistema</CtaButton>
            </div>
          </div>
        </div>

        {/* Sticky stacked cards: each one pins a bit lower than the previous while scrolling. */}
        <ol className="flex flex-col gap-6 lg:col-span-7">
          {learning.blocks.map((block, i) => {
            const Icon = ICONS[block.icon];
            return (
              <li
                key={block.title}
                className="eo-stack-card"
                style={{ "--i": i } as CSSProperties}
              >
                <article className="eo-metal-card relative min-h-[19rem] rounded-[1.75rem] p-7 pr-24 text-white md:p-10 md:pr-28">
                  <span className="eo-notch" aria-hidden="true">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <p className="text-[0.625rem] font-medium uppercase tracking-[0.24em] text-eo-gold-soft">
                    {String(i + 1).padStart(2, "0")} · {block.kicker}
                  </p>
                  <h3 className="mt-5 text-[1.625rem] font-medium leading-tight tracking-tight md:text-[2rem]">
                    {block.title}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-white/65">{block.body}</p>
                </article>
              </li>
            );
          })}
        </ol>

        <div className="lg:hidden">
          <CtaButton className="w-full">Quiero aprender el sistema</CtaButton>
        </div>
      </div>
    </section>
  );
}
