import { LEAD_SOURCE } from "@/components/eventonline/content";
import { validateRegistration } from "@/components/eventonline/registration";

const WEBHOOK_TIMEOUT_MS = 8000;

/**
 * Registration endpoint. The CRM/webhook URL never reaches the browser.
 * - REGISTRATION_WEBHOOK_URL set  → forwards the lead (JSON POST, 8 s timeout).
 * - Not set, outside production   → demo success (local/internal review only).
 * - Not set, in production        → error. Never a fake success with real visitors.
 * The lead source is fixed server-side; the client cannot choose it.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return Response.json({ ok: false, message: "Solicitud inválida." }, { status: 400 });
  }
  const data = body as Record<string, unknown>;

  // Honeypot filled → almost certainly a bot. Answer like a success and drop it.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const input = {
    fullName: String(data.fullName ?? "").slice(0, 120),
    phone: String(data.phone ?? "").trim().slice(0, 20),
    email: String(data.email ?? "").slice(0, 160),
  };
  const errors = validateRegistration(input);
  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    fullName: input.fullName.trim(),
    phone: input.phone,
    email: input.email.trim().toLowerCase(),
    source: LEAD_SOURCE,
    createdAt: new Date().toISOString(),
  };

  const webhook = process.env.REGISTRATION_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV === "production") {
      console.error("REGISTRATION_WEBHOOK_URL is not configured");
      return Response.json({ ok: false, message: "Registro no disponible." }, { status: 503 });
    }
    return Response.json({ ok: true, demo: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("LEAD_FORWARD_FAILED", error);
    return Response.json({ ok: false, message: "No pudimos registrar tus datos." }, { status: 502 });
  }
}
