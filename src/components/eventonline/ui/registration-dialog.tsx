"use client";

import { createContext, useCallback, useContext, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import PhoneInput, { isValidPhoneNumber, type Country } from "react-phone-number-input";
import phoneLabelsEs from "react-phone-number-input/locale/es";
import "react-phone-number-input/style.css";
import { PhoneCountrySelect } from "./phone-country-select";
import { AlertCircle, Check, Lock, X } from "lucide-react";
import { CONFIRMATION_PATH, event, FIRST_NAME_KEY } from "../content";
import { validateRegistration, type RegistrationErrors, type RegistrationInput } from "../registration";
import { trackLead } from "./meta-pixel";
import { setScrollLocked } from "./motion";

type Ctx = { open: () => void };
const RegistrationContext = createContext<Ctx | null>(null);

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used inside <RegistrationProvider>");
  return ctx;
}

const REDIRECT_DELAY_MS = 1100;

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const redirectTimer = useRef<number | null>(null);
  // Remounts the panel on every open, so a previous success/error state never lingers.
  const [session, setSession] = useState(0);

  const cancelRedirect = useCallback(() => {
    if (redirectTimer.current !== null) {
      window.clearTimeout(redirectTimer.current);
      redirectTimer.current = null;
    }
  }, []);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setSession((s) => s + 1);
    dialog.showModal();
    setScrollLocked(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  /** After a successful submit: short success moment, then close the dialog and go to the confirmation. */
  const finish = useCallback(() => {
    cancelRedirect();
    redirectTimer.current = window.setTimeout(() => {
      redirectTimer.current = null;
      dialogRef.current?.close();
      router.push(CONFIRMATION_PATH);
    }, REDIRECT_DELAY_MS);
  }, [cancelRedirect, router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      // Dismissed by the user (Esc, ✕, backdrop) during the success moment: don't navigate away.
      cancelRedirect();
      setScrollLocked(false);
    };
    // Click on the backdrop (outside the panel) closes the dialog.
    const onClick = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("click", onClick);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("click", onClick);
      cancelRedirect();
    };
  }, [cancelRedirect]);

  return (
    <RegistrationContext.Provider value={{ open }}>
      {children}
      <dialog ref={dialogRef} className="eo-dialog" aria-labelledby="eo-dialog-title" data-lenis-prevent>
        <RegistrationPanel key={session} onClose={close} onSuccess={finish} />
      </dialog>
    </RegistrationContext.Provider>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function RegistrationPanel({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const uid = useId();
  const [data, setData] = useState<RegistrationInput>({ fullName: "", phone: "", email: "" });
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const [phoneCountry, setPhoneCountry] = useState<Country | undefined>("PR");

  const validate = (input: RegistrationInput) => validateRegistration(input, isValidPhoneNumber);

  function update<K extends keyof RegistrationInput>(field: K, value: string) {
    const next = { ...data, [field]: value };
    setData(next);
    if (errors[field] && !validate(next)[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function blur(field: keyof RegistrationInput) {
    if (!data[field] && field !== "fullName") return;
    setErrors((prev) => ({ ...prev, [field]: validate(data)[field] }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(data);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as (keyof RegistrationInput)[])[0];
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot.current?.value ?? "" }),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message);

      // Conversion event BEFORE the redirect, so Meta receives it.
      trackLead();
      setStatus("success");
      // The name travels in sessionStorage, never in the URL (pixels read URLs).
      try {
        sessionStorage.setItem(FIRST_NAME_KEY, data.fullName.trim().split(/\s+/)[0]);
      } catch {
        /* storage unavailable (private mode): the confirmation falls back to a generic greeting */
      }
      onSuccess();
    } catch {
      setMessage("No pudimos completar tu registro. Revisa tu conexión e inténtalo otra vez.");
      setStatus("error");
    }
  }

  return (
    <div className="eo-metal-card relative overflow-hidden rounded-[1.25rem] p-6 sm:p-9">
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-eo-gold/20 blur-3xl"
        aria-hidden="true"
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Cerrar"
      >
        <X className="size-4" />
      </button>

      {status === "success" ? (
        <div className="relative py-10 text-center" role="status" aria-live="polite">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-eo-gold-soft text-eo-black">
            <Check className="size-7" strokeWidth={2.5} />
          </div>
          <p id="eo-dialog-title" className="eo-title mt-6 text-2xl">
            ¡Listo! Tu lugar está <span className="eo-serif eo-gold">reservado.</span>
          </p>
          <p className="mt-3 text-sm text-eo-mist">Te estamos llevando a la confirmación…</p>
        </div>
      ) : (
        <>
          <p className="eo-eyebrow eo-eyebrow--left text-eo-gold-soft">Acceso gratuito</p>
          <h2 id="eo-dialog-title" className="eo-title mt-4 pr-10 text-[1.75rem] sm:text-[2rem]">
            Reserva tu lugar en la <span className="eo-serif eo-gold">masterclass</span>
          </h2>
          <p className="mt-2 text-sm text-eo-mist">
            {event.dateLabel} · {event.timeLabel} ({event.shortTimezone}) · {event.format}
          </p>

          {/*
            minmax(0,1fr): WebKit (iOS Safari) sizes the implicit grid column from the button's
            max-content width, pushing every field past the card. A zero minimum keeps the column
            inside the card so the button label wraps instead.
          */}
          <form
            noValidate
            onSubmit={onSubmit}
            className="relative mt-7 grid grid-cols-[minmax(0,1fr)] gap-5"
            aria-busy={status === "submitting"}
          >
            {/* Honeypot: invisible to people, bots tend to fill it. */}
            <input
              ref={honeypot}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] size-px opacity-0"
            />
            <Field id={`${uid}-fullName`} label="Nombre completo" required error={errors.fullName} hint="Nombre y apellido, tal como aparecen en tus documentos.">
              <input
                id={`${uid}-fullName`}
                className="eo-field"
                autoComplete="name"
                value={data.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                onBlur={() => blur("fullName")}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={`${uid}-fullName-msg`}
                required
              />
            </Field>

            <Field id={`${uid}-phone`} label="Teléfono" error={errors.phone}>
              <PhoneInput
                id={`${uid}-phone`}
                className={`eo-field eo-phone ${errors.phone ? "is-invalid" : ""}`}
                aria-invalid={Boolean(errors.phone)}
                defaultCountry="PR"
                international={false}
                labels={phoneLabelsEs}
                countrySelectComponent={PhoneCountrySelect}
                countryOptionsOrder={["PR", "US", "DO", "|", "..."]}
                onCountryChange={(c) => setPhoneCountry(c)}
                placeholder={phoneCountry === "PR" || phoneCountry === "US" ? "(787) 000-0000" : "Número de teléfono"}
                value={data.phone || undefined}
                onChange={(v) => update("phone", v ?? "")}
                onBlur={() => blur("phone")}
                aria-describedby={`${uid}-phone-msg`}
              />
            </Field>

            <Field id={`${uid}-email`} label="Correo electrónico" error={errors.email} hint="Te enviaremos un recordatorio por correo.">
              <input
                id={`${uid}-email`}
                type="email"
                inputMode="email"
                className="eo-field"
                autoComplete="email"
                placeholder="nombre@gmail.com"
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                onBlur={() => blur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={`${uid}-email-msg`}
              />
            </Field>

            {status === "error" && (
              <p role="alert" className="flex items-start gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                {message}
              </p>
            )}

            <button type="submit" className="eo-cta eo-cta--lg mt-1 w-full" disabled={status === "submitting"}>
              <span>{status === "submitting" ? "Reservando tu lugar…" : "Reservar mi lugar gratis"}</span>
              <span className="eo-cta__chip" aria-hidden="true">
                {status === "submitting" ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-eo-gold-soft/30 border-t-eo-gold-soft" />
                ) : (
                  <ArrowGlyph />
                )}
              </span>
            </button>

            <p className="flex items-center justify-center gap-2 text-center text-xs text-eo-mist">
              <Lock className="size-3.5" aria-hidden="true" />
              {event.reassurance.join(" · ")}
            </p>
          </form>
        </>
      )}
    </div>
  );
}

function ArrowGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 12L12 4M12 4H5.5M12 4V10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-eo-gold-soft"> *</span>}
        </label>
        {!required && <span className="text-xs text-eo-steel">Opcional</span>}
      </div>
      {children}
      <p id={`${id}-msg`} className={`mt-1.5 flex items-center gap-1.5 text-xs ${error ? "text-red-300" : "text-eo-steel"}`}>
        {error && <AlertCircle className="size-3.5" aria-hidden="true" />}
        {error ?? hint}
      </p>
    </div>
  );
}
