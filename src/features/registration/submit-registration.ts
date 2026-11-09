import { normalizePhone, type RegistrationData } from "./validation";

export type SubmitResult = { ok: true; demo: boolean } | { ok: false; message: string };

const ENDPOINT = process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT;

export const isDemoMode = !ENDPOINT;

/**
 * Registration adapter.
 * - Demo mode (no endpoint configured): simulates a successful submit. Nothing is sent.
 * - Endpoint mode: POSTs JSON to NEXT_PUBLIC_REGISTRATION_ENDPOINT (CRM, webhook, etc.).
 * The real integration is pending client confirmation.
 */
export async function submitRegistration(data: RegistrationData): Promise<SubmitResult> {
  const payload = {
    fullName: data.fullName.trim(),
    phone: normalizePhone(data.phone),
    email: data.email.trim().toLowerCase(),
    source: "eventonline-landing",
  };

  if (!ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 900));
    return { ok: true, demo: true };
  }

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(String(res.status));
    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      message: "No pudimos completar tu registro. Revisa tu conexión e inténtalo otra vez.",
    };
  }
}
