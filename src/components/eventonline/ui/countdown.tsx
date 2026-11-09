"use client";

import { useSyncExternalStore } from "react";
import { event } from "../content";

// The wall clock as an external store, ticking once per second.
function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}
const getSnapshot = () => Math.floor(Date.now() / 1000);
const getServerSnapshot = () => null;

const START = new Date(event.startsAt).getTime();
const END = new Date(event.endsAt).getTime();

/** Countdown to the real event date (never a fake timer). Renders a placeholder on the server. */
export function Countdown({ compact = false }: { compact?: boolean }) {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const height = compact ? "h-9" : "h-14";

  if (seconds === null) return <div className={height} aria-hidden="true" />;

  const now = seconds * 1000;
  const diff = START - now;

  if (diff <= 0) {
    return (
      <p className={`flex ${height} items-center gap-2 text-sm text-eo-gold-soft`}>
        <span className="size-2 animate-[eo-pulse_1.6s_ease-in-out_infinite] rounded-full bg-red-500" aria-hidden="true" />
        {now < END ? "La masterclass está en vivo" : "Esta edición ya finalizó"}
      </p>
    );
  }

  const units: [number, string][] = [
    [Math.floor(diff / 86_400_000), "días"],
    [Math.floor((diff / 3_600_000) % 24), "horas"],
    [Math.floor((diff / 60_000) % 60), "min"],
    [Math.floor((diff / 1000) % 60), "seg"],
  ];

  return (
    <div className={height}>
      <p className="sr-only">
        Comienza en {units[0][0]} días, {units[1][0]} horas y {units[2][0]} minutos.
      </p>
      <ol className={`flex items-baseline ${compact ? "gap-3" : "gap-5"}`} aria-hidden="true">
        {units.map(([value, label]) => (
          <li key={label} className="flex items-baseline gap-1">
            <span
              className={`font-semibold tabular-nums tracking-tight ${compact ? "text-lg" : "text-[2rem] md:text-[2.5rem]"}`}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span className="text-[0.625rem] uppercase tracking-[0.16em] text-eo-mist">{label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
