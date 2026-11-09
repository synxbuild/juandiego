import Image from "next/image";
import { Check, MapPin } from "lucide-react";
import { company } from "../content";
import { CtaButton } from "../ui/cta-button";
import { RoofDivider } from "../ui/roof-divider";

export function Company() {
  return (
    <section aria-labelledby="company-title" className="relative overflow-x-clip bg-eo-paper py-28 text-eo-black md:py-36">
      <RoofDivider id="company-top" direction="down" fill="#050505" className="absolute inset-x-0 top-0 -translate-y-px" />

      <div className="eo-shell grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div data-reveal className="relative lg:col-span-6">
          {/* Square crop anchored to the bottom hides the Instagram "1/9" badge baked into the source photo. */}
          <div className="relative aspect-square overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)]">
            <div data-parallax="0.1" className="absolute inset-x-0 -top-[6%] h-[112%]">
              <Image
                src={company.image}
                alt="Juan Diego con un grupo de la comunidad LOGRA frente a una propiedad"
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover object-bottom"
              />
            </div>
          </div>
          <div className="eo-metal-card absolute -bottom-8 right-4 flex items-center gap-4 rounded-2xl px-5 py-4 text-white md:-right-8">
            <Image src="/images/logra-icon.png" alt="" width={187} height={224} className="h-auto w-8" />
            <div>
              <p className="text-sm font-medium">Comunidad LOGRA</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/60">
                <MapPin className="size-3" aria-hidden="true" /> {company.highlights[0]}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-deep">
            Sobre LOGRA
          </p>
          <h2 id="company-title" data-reveal className="eo-title mt-5 text-[2.5rem] md:text-[3.5rem]">
            Detrás del sistema, <span className="eo-serif eo-gold-dark">hay una empresa.</span>
          </h2>
          <p data-reveal className="mt-6 text-[1.0625rem] leading-relaxed text-black/60">
            {company.description}
          </p>

          <dl data-reveal-group className="mt-10 grid grid-cols-2 gap-6 border-y border-black/10 py-8">
            {company.stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span
                    className="text-[2.75rem] font-semibold leading-none tracking-tight md:text-[3.5rem]"
                    data-count={s.value}
                    data-prefix={s.prefix}
                    data-suffix={s.suffix}
                  >
                    {s.prefix}
                    {s.value}
                    {s.suffix}
                  </span>
                  <p className="mt-2 text-sm text-black/55">{s.label}</p>
                </dd>
              </div>
            ))}
          </dl>

          <ul data-reveal-group className="mt-8 space-y-3">
            {company.highlights.slice(1).map((h) => (
              <li key={h} className="flex items-center gap-3 text-[0.9375rem] text-black/75">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-eo-black text-eo-gold-soft">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <CtaButton>Quiero mi lugar en la masterclass</CtaButton>
          </div>
        </div>
      </div>

      <RoofDivider id="company-bottom" fill="#050505" className="absolute inset-x-0 bottom-0 translate-y-px" />
    </section>
  );
}
