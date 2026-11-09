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
const pad = (n: number) => String(n).padStart(2, "0");

type Variant = "mini" | "compact" | "boxes";

const HEIGHT: Record<Variant, string> = { mini: "h-5", compact: "h-9", boxes: "h-[4.75rem]" };

/**
 * Countdown to the real event date (never a fake timer). Renders a placeholder on the server.
 * - mini:    "03d 04h 51m" one-liner for tight mobile layouts
 * - compact: inline numbers + labels
 * - boxes:   4 equal cells in a grid, never touches the container edges
 */
export function Countdown({ variant = "boxes" }: { variant?: Variant }) {
  const seconds = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (seconds === null) return <div className={HEIGHT[variant]} aria-hidden="true" />;

  const now = seconds * 1000;
  const diff = START - now;

  if (diff <= 0) {
    return (
      <p className={`flex ${HEIGHT[variant]} items-center gap-2 text-sm text-eo-gold-soft`}>
        <span className="size-2 animate-[eo-pulse_1.6s_ease-in-out_infinite] rounded-full bg-red-500" aria-hidden="true" />
        {now < END ? "En vivo ahora" : "Edición finalizada"}
      </p>
    );
  }

  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff / 3_600_000) % 24);
  const minutes = Math.floor((diff / 60_000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const label = <p className="sr-only">Comienza en {days} días, {hours} horas y {minutes} minutos.</p>;

  if (variant === "mini") {
    return (
      <div className={HEIGHT.mini}>
        {label}
        <p className="whitespace-nowrap text-[0.8125rem] font-semibold tabular-nums tracking-tight" aria-hidden="true">
          {pad(days)}
          <span className="text-white/50">d</span> {pad(hours)}
          <span className="text-white/50">h</span> {pad(minutes)}
          <span className="text-white/50">m</span>
        </p>
      </div>
    );
  }

  const units: [number, string][] = [
    [days, "días"],
    [hours, "horas"],
    [minutes, "min"],
    [secs, "seg"],
  ];

  if (variant === "compact") {
    return (
      <div className={HEIGHT.compact}>
        {label}
        <ol className="flex items-baseline gap-3" aria-hidden="true">
          {units.map(([value, unit]) => (
            <li key={unit} className="flex items-baseline gap-1">
              <span className="text-lg font-semibold tabular-nums tracking-tight">{pad(value)}</span>
              <span className="text-[0.625rem] uppercase tracking-[0.16em] text-eo-mist">{unit}</span>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div>
      {label}
      <ol className="grid grid-cols-4 gap-2 md:gap-3" aria-hidden="true">
        {units.map(([value, unit]) => (
          <li key={unit} className="eo-glass flex h-[4.75rem] flex-col items-center justify-center rounded-2xl">
            <span className="text-[1.625rem] font-semibold leading-none tabular-nums tracking-tight md:text-[2rem]">
              {pad(value)}
            </span>
            <span className="mt-1.5 text-[0.5625rem] uppercase tracking-[0.18em] text-eo-mist md:text-[0.625rem]">{unit}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
