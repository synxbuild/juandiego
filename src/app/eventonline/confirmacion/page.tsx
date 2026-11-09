import type { Metadata } from "next";
import Image from "next/image";
import { CalendarPlus, Check } from "lucide-react";
import { event } from "@/components/eventonline/content";
import { Greeting } from "./greeting";

export const metadata: Metadata = {
  title: "Tu lugar está reservado | LOGRA",
  robots: { index: false, follow: false },
};

function toCalendarDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("Masterclass LOGRA: bienes raíces en Puerto Rico")}` +
  `&dates=${toCalendarDate(event.startsAt)}/${toCalendarDate(event.endsAt)}` +
  `&details=${encodeURIComponent("Masterclass gratuita, online y en vivo, con Juan Diego Gómez Sisco.")}`;

export default function ConfirmationPage() {
  return (
    <main className="relative grid min-h-svh place-items-center overflow-hidden px-5 py-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgb(232_207_149/0.22),transparent)]"
        aria-hidden="true"
      />
      <div className="eo-metal-card eo-fade-up relative w-full max-w-xl rounded-[2rem] p-8 text-center md:p-12">
        <Image src="/images/logra_logo_transparente_1.png" alt="LOGRA" width={772} height={244} className="mx-auto h-auto w-28" />
        <div className="mx-auto mt-10 grid size-16 place-items-center rounded-full bg-eo-gold-soft text-eo-black">
          <Check className="size-7" strokeWidth={2.5} aria-hidden="true" />
        </div>
        <h1 className="eo-title mt-6 text-[2rem] md:text-[2.5rem]">
          <Greeting />{" "}
          <span className="eo-serif eo-gold">reservado.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-sm leading-relaxed text-white/65">
          Te esperamos el {event.dateLabel.toLowerCase()} a las {event.timeLabel} ({event.timezoneLabel}). Es online y en
          vivo: te enviaremos el acceso.
        </p>
        <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="eo-cta mt-10">
          <span>Agregar a mi calendario</span>
          <span className="eo-cta__chip" aria-hidden="true">
            <CalendarPlus className="size-4" />
          </span>
        </a>
        <p className="mt-8 text-xs text-white/40">{event.reassurance.join(" · ")}</p>
      </div>
    </main>
  );
}
