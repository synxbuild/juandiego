import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { results } from "../content";

export function Results() {
  const { presenterCase } = results;

  return (
    <section id="resultados" aria-labelledby="results-title" className="relative bg-eo-paper pb-24 pt-16 text-eo-black md:pb-32 md:pt-20">
      <div className="eo-shell">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-deep">
              Resultados reales
            </p>
            <h2 id="results-title" data-reveal className="eo-title mt-5 text-[2.25rem] md:text-[3.5rem]">
              Personas reales, <span className="eo-serif eo-gold-dark">aplicando el mismo sistema.</span>
            </h2>
          </div>
          <p data-reveal className="text-[1rem] leading-relaxed text-black/60 md:col-span-5 md:text-[1.0625rem]">
            {results.people} ya lo usaron para encontrar, financiar y comprar propiedades en Puerto Rico, incluso
            viviendo fuera de la isla.
          </p>
        </div>
      </div>

      {/* Mobile: horizontal snap carousel. Desktop: 4-column grid. */}
      <ul
        data-reveal-group
        className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:mx-auto md:mt-16 md:grid md:max-w-[76rem] md:grid-cols-4 md:gap-5 md:overflow-visible md:px-10 md:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {results.cases.map((c, i) => (
          <li key={c.name} className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-auto">
            <article className="group relative aspect-[3/4] overflow-hidden rounded-[1.25rem] bg-eo-black shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(143_106_44/0.55)]">
              <Image
                src={c.image}
                alt={`Fotografía del caso de ${c.name}`}
                fill
                sizes="(min-width: 768px) 22vw, 78vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" aria-hidden="true" />
              <span className="eo-glass absolute left-4 top-4 rounded-full px-3 py-1 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-white">
                Caso {String(i + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="text-sm font-medium text-white/80">{c.name}</p>
                <p className="mt-1 flex items-baseline gap-1">
                  <span
                    className="text-[2rem] font-semibold leading-none tracking-tight lg:text-[2.25rem]"
                    data-count={c.monthly}
                    data-prefix="$"
                  >
                    ${c.monthly.toLocaleString("en-US")}
                  </span>
                  <span className="text-sm text-white/60">/mes</span>
                </p>
                {/* Detail slides up on hover (always visible on touch screens). */}
                <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[var(--ease-out-expo)] md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <div className="mt-3 border-t border-white/15 pt-3 text-xs leading-relaxed text-white/70">
                      <p className="eo-gold text-sm font-semibold">≈ {c.yearly} al año</p>
                      <p className="mt-0.5">{results.period}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="eo-shell">
        <p className="mt-6 text-xs leading-relaxed text-black/45">
          Ingreso mensual reportado por cada estudiante. Resultados individuales, no típicos ni garantizados.
        </p>

        <aside
          data-reveal
          aria-label="El caso del presentador"
          className="eo-metal-card relative mt-14 grid gap-8 overflow-hidden rounded-[1.5rem] p-7 text-white md:mt-20 md:grid-cols-12 md:items-center md:p-12"
        >
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-eo-gold/15 blur-3xl" aria-hidden="true" />
          <div className="md:col-span-3">
            <p className="eo-eyebrow eo-eyebrow--left text-eo-gold-soft">El caso del presentador</p>
          </div>
          <p className="md:col-span-4">
            <span
              className="eo-silver text-[3.25rem] font-semibold leading-none tracking-tight md:text-[4.5rem]"
              data-count={presenterCase.value}
              data-prefix="~$"
            >
              ~${presenterCase.value.toLocaleString("en-US")}
            </span>
          </p>
          <div className="md:col-span-3">
            <p className="text-lg font-medium">{presenterCase.label}.</p>
            <p className="mt-1 text-sm text-white/60">{presenterCase.detail}</p>
          </div>
          <a
            href={presenterCase.url}
            target="_blank"
            rel="noopener noreferrer"
            className="eo-ghost justify-self-start md:col-span-2 md:justify-self-end"
          >
            Ver el proceso
            <ArrowUpRight className="size-4" aria-hidden="true" />
            <span className="sr-only">(abre {presenterCase.handle} en Instagram)</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
