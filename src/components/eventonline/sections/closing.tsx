import { CalendarDays, Check, Clock, MonitorPlay, Timer } from "lucide-react";
import { event, faqs } from "../content";
import { Countdown } from "../ui/countdown";
import { CtaButton } from "../ui/cta-button";
import { Disclosure } from "../ui/disclosure";

const RECAP = [
  "Por qué Puerto Rico es una oportunidad hoy",
  "El sistema Fix & Flip, de principio a fin",
  "Los 6 pilares, de la adquisición a la renta",
  "Bono: portfolio de propiedades en renta",
];

const DETAILS = [
  { icon: CalendarDays, term: "Fecha", value: event.dateLabel },
  { icon: Clock, term: "Hora", value: `${event.timeLabel} (${event.shortTimezone})` },
  { icon: MonitorPlay, term: "Modalidad", value: event.format },
  { icon: Timer, term: "Duración", value: event.duration },
];

export function Closing() {
  return (
    <section id="cierre" aria-labelledby="closing-title" className="relative overflow-x-clip bg-eo-black pb-28 pt-8 md:pb-36">
      <div className="eo-shell">
        <div data-reveal className="eo-metal-card relative overflow-hidden rounded-[2rem] px-6 py-14 text-center md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-80 w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(232_207_149/0.28),transparent)]"
            aria-hidden="true"
          />
          <p className="eo-eyebrow relative text-eo-gold-soft">Tu lugar en la masterclass</p>
          <h2 id="closing-title" className="eo-title relative mx-auto mt-6 max-w-3xl text-[2.25rem] md:text-[4rem]">
            En menos de 2 horas, <span className="eo-serif eo-gold">el sistema completo.</span>
          </h2>

          <ul className="relative mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {RECAP.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[0.9375rem] text-white/80">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-eo-gold-soft text-eo-black">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          {/* Bento 2×2 (4 columns on desktop): compact on mobile instead of a tall stack of pills. */}
          <dl className="relative mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-2.5 text-left md:grid-cols-4 md:gap-3">
            {DETAILS.map(({ icon: Icon, term, value }) => (
              <div key={term} className="eo-glass flex flex-col gap-3 rounded-2xl p-4">
                <span className="grid size-9 place-items-center rounded-lg bg-eo-black/60 text-eo-gold-soft ring-1 ring-eo-gold-soft/30">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <dt className="text-[0.625rem] uppercase tracking-[0.18em] text-white/50">{term}</dt>
                  <dd className="mt-1 text-sm font-medium leading-snug text-white">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="relative mx-auto mt-8 max-w-3xl">
            <p className="mb-3 text-[0.625rem] uppercase tracking-[0.2em] text-white/50">Comienza en</p>
            <Countdown />
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-4">
            <CtaButton size="lg" className="w-full sm:w-auto">
              Reservar mi lugar gratis
            </CtaButton>
            <p className="text-xs text-white/50">{event.reassurance.join(" · ")}</p>
          </div>
        </div>

        <div className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-soft">
              Preguntas frecuentes
            </p>
            <h2 data-reveal className="eo-title mt-5 text-[2.25rem] md:text-[3rem]">
              Antes de <span className="eo-serif eo-gold">registrarte.</span>
            </h2>
          </div>
          <div data-reveal-group className="space-y-3 lg:col-span-8">
            {faqs.map((f) => (
              <Disclosure
                key={f.q}
                summary={f.q}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 transition-colors hover:border-white/20 md:px-7"
                buttonClassName="py-5 text-[1rem] font-medium md:text-[1.0625rem]"
                iconClassName="border-white/15 text-eo-gold-soft"
              >
                <p className="max-w-2xl pb-6 leading-relaxed text-white/60">{f.a}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
