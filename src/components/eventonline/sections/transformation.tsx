import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { interiorDetails, transformationPairs } from "../content";
import { CompareSlider } from "../ui/compare-slider";

export function Transformation() {
  return (
    <section id="transformacion" aria-labelledby="transformation-title" className="eo-noise relative overflow-x-clip bg-eo-black py-28 md:py-36">
      <div className="eo-shell relative">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p data-reveal className="eo-eyebrow eo-eyebrow--left text-eo-gold-soft">
              Antes y después
            </p>
            <h2 id="transformation-title" data-reveal className="eo-title mt-5 text-[2.25rem] md:text-[3.75rem]">
              No solo generas ingresos. <span className="eo-serif eo-gold">También ayudas a restaurar Puerto Rico.</span>
            </h2>
          </div>
          <div data-reveal className="md:col-span-4">
            <p className="leading-relaxed text-white/60">
              Propiedades abandonadas que vuelven a ser hogares dignos para familias puertorriqueñas.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs uppercase tracking-[0.16em] text-white/75">
              <MoveHorizontal className="size-4 text-eo-gold-soft" aria-hidden="true" />
              Arrastra para comparar
            </p>
          </div>
        </div>

        <div data-reveal-group className="mt-14 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5">
          {transformationPairs.map((pair, i) => (
            <CompareSlider
              key={pair.area}
              index={i}
              area={pair.area}
              before={pair.before}
              after={pair.after}
              sizes="(min-width: 768px) 46vw, 92vw"
              className="aspect-[4/5] rounded-[1.5rem] ring-1 ring-white/10 sm:aspect-[4/3]"
            />
          ))}
        </div>

        <div className="mt-16 md:mt-20">
          <p data-reveal className="text-[0.625rem] uppercase tracking-[0.24em] text-white/45">
            Detalles de interiores
          </p>
          <ul data-reveal-group className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {interiorDetails.map((img) => (
              <li key={img.src} className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-white/10">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(min-width: 768px) 22vw, 46vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em]">
                  {img.label}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-white/45">Propiedades reales. Transformaciones reales.</p>
        </div>
      </div>
    </section>
  );
}
