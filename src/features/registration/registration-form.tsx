"use client";

import { useId, useState, type FormEvent } from "react";
import { event } from "@/content/landing";
import { trackLead } from "@/features/analytics/meta-pixel";
import { isDemoMode, submitRegistration } from "./submit-registration";
import { validate, validateField, type FieldErrors, type RegistrationData } from "./validation";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: RegistrationData = { fullName: "", phone: "", email: "" };

function toCalendarDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const calendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent("Masterclass LOGRA: bienes raíces en Puerto Rico")}` +
  `&dates=${toCalendarDate(event.startsAt)}/${toCalendarDate(event.endsAt)}` +
  `&details=${encodeURIComponent("Masterclass gratuita, online y en vivo, con Juan Diego Gómez Sisco.")}`;

type Props = {
  /** Visual context: hero sits on the dark photo, closing sits on a plain dark section. */
  variant?: "hero" | "closing";
  headingLevel?: "h2" | "h3";
};

export function RegistrationForm({ variant = "hero", headingLevel = "h2" }: Props) {
  const uid = useId();
  const [data, setData] = useState<RegistrationData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const Heading = headingLevel;
  const firstName = data.fullName.trim().split(/\s+/)[0];

  function update(field: keyof RegistrationData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    // Clear the error as soon as the field becomes valid.
    if (errors[field] && !validateField(field, value)) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function blur(field: keyof RegistrationData) {
    if (!data[field] && field !== "fullName") return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, data[field]) }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof RegistrationData)[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    const result = await submitRegistration(data);
    if (result.ok) {
      trackLead();
      setStatus("success");
    } else {
      setServerMessage(result.message);
      setStatus("error");
    }
  }

  const shell =
    variant === "hero"
      ? "bg-ink-2/85 backdrop-blur-xl border-white/10"
      : "bg-ink-2 border-white/10";

  if (status === "success") {
    return (
      <div
        className={`ticks rounded-[1.25rem] border p-7 md:p-9 ${shell}`}
        role="status"
        aria-live="polite"
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-brass text-ink">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <Heading className="display mt-6 text-3xl text-bone">
          Tu lugar está reservado{firstName ? `, ${firstName}` : ""}.
        </Heading>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist">
          Te esperamos el {event.dateLabel.toLowerCase()} a las {event.timeLabel} ({event.timezoneLabel}).
          {data.email ? " Te enviaremos un recordatorio por correo." : ""}
        </p>
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-7 text-bone hover:bg-bone hover:text-ink"
        >
          Agregar a mi calendario
          <span aria-hidden="true">↗</span>
        </a>
        {isDemoMode && <DemoNote />}
      </div>
    );
  }

  return (
    <div className={`ticks rounded-[1.25rem] border p-6 md:p-8 ${shell}`}>
      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-brass">
          Acceso gratuito
        </span>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-mist">
          {event.shortDateLabel} · {event.timeLabel} {event.shortTimezone}
        </span>
      </div>
      <Heading className="display mt-5 text-[1.875rem] text-bone md:text-[2.125rem]">
        Reserva tu lugar en la <em className="text-brass">masterclass</em>
      </Heading>
      <p className="mt-2 text-[0.9375rem] text-mist">¿A dónde te enviamos el acceso?</p>

      <form noValidate onSubmit={onSubmit} className="mt-7 grid gap-5" aria-busy={status === "submitting"}>
        <Field
          id={`${uid}-fullName`}
          label="Nombre completo"
          required
          hint="Nombre y apellido, tal como aparecen en tus documentos."
          autoComplete="name"
          value={data.fullName}
          error={errors.fullName}
          onChange={(v) => update("fullName", v)}
          onBlur={() => blur("fullName")}
        />
        <Field
          id={`${uid}-phone`}
          label="Teléfono"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(787) 000-0000"
          prefix="+1"
          value={data.phone}
          error={errors.phone}
          onChange={(v) => update("phone", v)}
          onBlur={() => blur("phone")}
        />
        <Field
          id={`${uid}-email`}
          label="Correo electrónico"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="nombre@gmail.com"
          hint="Te enviaremos un recordatorio por correo."
          value={data.email}
          error={errors.email}
          onChange={(v) => update("email", v)}
          onBlur={() => blur("email")}
        />

        {status === "error" && (
          <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {serverMessage}
          </p>
        )}

        <button type="submit" className="btn-primary mt-1 w-full" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" aria-hidden="true" />
              Reservando tu lugar…
            </>
          ) : (
            <>
              Reservar mi lugar gratis
              <span className="btn-arrow" aria-hidden="true">→</span>
            </>
          )}
        </button>

        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[0.75rem] text-mist">
          {event.reassurance.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <span className="size-1 rounded-full bg-brass" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        {isDemoMode && <DemoNote />}
      </form>
    </div>
  );
}

function DemoNote() {
  return (
    <p className="mt-5 rounded-lg border border-dashed border-brass/40 px-3 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-brass/80">
      Modo demo · El formulario aún no envía datos
    </p>
  );
}

type FieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  hint?: string;
  required?: boolean;
  prefix?: string;
  type?: string;
  inputMode?: "text" | "tel" | "email";
  autoComplete?: string;
  placeholder?: string;
};

function Field({ id, label, value, onChange, onBlur, error, hint, required, prefix, ...input }: FieldProps) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-bone">
          {label}
          {required && (
            <span className="text-brass" aria-hidden="true">
              {" "}*
            </span>
          )}
        </label>
        {!required && <span className="text-[0.75rem] text-mist">Opcional</span>}
      </div>
      <div
        className={`mt-2 flex items-center rounded-xl border bg-ink/60 transition-colors focus-within:border-brass ${
          error ? "border-red-400/70" : "border-white/12 hover:border-white/25"
        }`}
      >
        {prefix && (
          <span className="border-r border-white/10 py-3.5 pl-4 pr-3 font-mono text-sm text-mist" aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          aria-required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="h-13 w-full min-w-0 bg-transparent px-4 text-base text-bone placeholder:text-stone focus:outline-none"
          {...input}
        />
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.75rem] text-mist">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-[0.8125rem] text-red-300">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7.5v5.5M12 16.5v.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
