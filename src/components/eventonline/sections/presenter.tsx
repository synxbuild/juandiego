import Image from "next/image";
import { presenter } from "../content";
import { CtaButton } from "../ui/cta-button";
import { Disclosure } from "../ui/disclosure";

export function Presenter() {
  return (
    <section id="presentador" aria-labelledby="presenter-title" className="eo-noise relative overflow-x-clip bg-eo-black py-28 md:py-36">
      {/* Giant outlined name drifting sideways with scroll (reference: "MENTOR"). */}
      <p data-drift-x="-25" className="eo-outline-word absolute left-[4%] top-16 text-[24vw] md:top-10" aria-hidden="true">
        JUAN DIEGO
      </p>

      <div className="eo-shell relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <figure data-reveal className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] ring-1 ring-eo-gold-soft/25">
              <div data-parallax="0.12" className="absolute inset-x-0 -top-[8%] h-[116%]">
                <Image
                  src={presenter.image}
                  alt={`Retrato de ${presenter.name}`}
                  fill
                  sizes="(min-width: 1024px) 38vw, 92vw"
                  className="object-cover object-top saturate-[0.9]"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
              <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <span>
                  <span className="block text-lg font-medium">{presenter.name}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">{presenter.role}</span>
                </span>
                <span className="eo-glass rounded-full px-3 py-1 text-[0.625rem] uppercase tracking-[0.2em]">Presentador</span>
              </figcaption>
            </div>
          </figure>

          <div className="lg:col-span-7">
            <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-soft">
              Tu presentador
            </p>
            <h2 id="presenter-title" data-reveal className="eo-title mt-5 text-[2.75rem] md:text-[4.25rem]">
              {presenter.firstName} <span className="eo-serif eo-gold">{presenter.lastName}</span>
            </h2>
            <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {presenter.role}. {presenter.lead}
            </p>

            <dl data-reveal-group className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10">
              {presenter.stats.map((s) => (
                <div key={s.label} className="bg-eo-black p-5 md:p-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span
                      className="eo-silver text-[2.25rem] font-semibold leading-none tracking-tight md:text-[2.75rem]"
                      data-count={s.value}
                      data-prefix={s.prefix}
                      data-suffix={s.suffix}
                    >
                      {s.prefix}
                      {s.value}
                      {s.suffix}
                    </span>
                    <p className="mt-2 text-sm leading-snug text-white/55">{s.label}</p>
                  </dd>
                </div>
              ))}
            </dl>

            <div data-reveal-group className="mt-10 grid gap-8 md:grid-cols-2">
              {presenter.mission.map((m, i) => (
                <div key={m.title} className="border-l border-eo-gold-soft/40 pl-5">
                  <p className="text-[0.625rem] uppercase tracking-[0.24em] text-eo-gold-soft">Misión {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-2 text-lg font-medium">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{m.body}</p>
                </div>
              ))}
            </div>

            <Disclosure
              summary="Leer la biografía completa"
              className="mt-10 border-y border-white/10"
              buttonClassName="py-5 text-[0.9375rem] font-medium text-white/85 transition-colors hover:text-white"
              iconClassName="border-white/20"
            >
              <div className="space-y-4 pb-6 text-[0.9375rem] leading-relaxed text-white/65">
                {presenter.fullBio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>
            </Disclosure>

            <div data-reveal className="mt-10">
              <CtaButton size="lg">Reservar mi lugar con Juan Diego</CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
