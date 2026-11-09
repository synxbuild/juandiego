import { credentials, hero, statement } from "../content";

export function Statement() {
  return (
    <section aria-labelledby="statement-title" className="eo-noise relative overflow-hidden bg-gradient-to-b from-eo-black via-[#0d0d0c] to-[#1a1916] pb-44 pt-28 md:pb-56 md:pt-40">
      <div className="eo-shell relative text-center">
        <h2 id="statement-title" data-reveal className="eo-title mx-auto max-w-4xl text-[2.25rem] md:text-[3.75rem]">
          {statement.lead} <span className="eo-serif eo-gold">{statement.accent}</span>
        </h2>
        <p data-reveal className="mx-auto mt-6 max-w-2xl text-[1rem] leading-relaxed text-white/65 md:text-lg">
          {statement.body}
        </p>

        <ul data-reveal-group className="mx-auto mt-16 grid max-w-4xl gap-10 sm:grid-cols-3 md:mt-20">
          {credentials.map((c) => (
            <li key={c.label} className="flex flex-col items-center">
              <span
                className="eo-silver text-[3rem] font-semibold leading-none tracking-tight md:text-[4rem]"
                data-count={c.value}
                data-prefix={c.prefix}
                data-suffix={c.suffix}
              >
                {c.prefix}
                {c.value}
                {c.suffix}
              </span>
              <span className="mt-3 h-px w-10 bg-eo-gold-soft/60" aria-hidden="true" />
              <span className="mt-3 text-sm text-white/60">{c.label}</span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-16 max-w-2xl text-xs leading-relaxed text-white/40">
          <span className="text-eo-gold-soft">*</span> {hero.potential.footnote}
        </p>
      </div>

      {/* Giant outlined word drifting with scroll, half hidden by the curve. */}
      <p
        data-drift-x="-18"
        className="eo-outline-word absolute -bottom-6 left-0 text-[22vw] md:-bottom-10"
        aria-hidden="true"
      >
        OPORTUNIDAD HISTÓRICA
      </p>

      <svg
        className="absolute inset-x-0 bottom-0 h-20 w-full md:h-32"
        viewBox="0 0 1440 128"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 128V70C260 70 420 0 760 0C1060 0 1180 52 1440 52V128H0Z" fill="#f6f5f2" />
      </svg>
    </section>
  );
}
