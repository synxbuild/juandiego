"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "../content";
import { useRegistration } from "../ui/registration-dialog";

/**
 * Floating glass navbar. The active link follows the section in view (scroll spy),
 * and a gold hairline under the bar tracks page progress (driven by <Motion/>).
 */
export function Header() {
  const { open } = useRegistration();
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <div
        className={`mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-4 rounded-2xl px-3 pl-4 transition-[background-color,border-color,box-shadow] duration-500 md:h-16 md:pl-5 ${
          scrolled ? "eo-glass eo-glass--nav" : "border border-transparent"
        }`}
      >
        <a href="#top" aria-label="LOGRA, volver al inicio" className="shrink-0">
          <Image src="/images/logra_logo_transparente_1.png" alt="LOGRA" width={772} height={244} priority className="h-auto w-[6.5rem] md:w-[7.5rem]" />
        </a>

        <nav aria-label="Secciones" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                      isActive ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-eo-gold-soft transition-transform duration-500 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          className="group inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-[0.8125rem] font-semibold text-eo-black transition-colors hover:bg-eo-gold-soft md:h-11 md:px-5"
        >
          Reservar mi lugar
          <span className="transition-transform duration-500 group-hover:translate-x-0.5" aria-hidden="true">
            →
          </span>
        </button>
      </div>
      <div className="mx-auto mt-1 h-px max-w-[76rem] overflow-hidden rounded-full px-4" aria-hidden="true">
        <div data-scroll-progress className="h-px origin-left scale-x-0 bg-gradient-to-r from-eo-gold-deep via-eo-gold-soft to-white" />
      </div>
    </header>
  );
}
