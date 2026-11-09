import Image from "next/image";
import { disclaimer } from "../content";

// Legal page URLs were not provided by the client (pending).
const LEGAL = ["Privacidad", "Términos", "Cookies"];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-eo-black pb-28 pt-14 md:pb-14">
      <div className="eo-shell">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Image src="/images/logra_logo_transparente_1.png" alt="LOGRA" width={772} height={244} className="h-auto w-32" />
          <p className="max-w-2xl text-xs leading-relaxed text-white/40">
            <span className="font-medium text-white/60">Aviso: </span>
            {disclaimer}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Logra. Todos los derechos reservados.</p>
          <ul className="flex gap-6">
            {LEGAL.map((item) => (
              <li key={item}>
                <a href="#" className="transition-colors hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
