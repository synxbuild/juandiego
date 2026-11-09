/**
 * Mirrors the current Typeform (ndgYv5uR):
 *  - full name: required
 *  - phone: optional (default country US / +1)
 *  - email: optional
 * Optional fields are still validated when filled.
 */

export type RegistrationData = {
  fullName: string;
  phone: string;
  email: string;
};

export type FieldErrors = Partial<Record<keyof RegistrationData, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  const digits = trimmed.replace(/\D/g, "");
  return trimmed.startsWith("+") ? `+${digits}` : `+1${digits}`;
}

export function validateField(field: keyof RegistrationData, value: string): string | undefined {
  const v = value.trim();

  if (field === "fullName") {
    if (!v) return "Escribe tu nombre completo.";
    if (v.length < 2) return "El nombre parece demasiado corto.";
    return undefined;
  }

  if (field === "phone") {
    if (!v) return undefined;
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      return "Revisa el número: debe tener al menos 10 dígitos.";
    }
    return undefined;
  }

  if (!v) return undefined;
  if (!EMAIL_RE.test(v)) return "Revisa el correo: por ejemplo, nombre@gmail.com.";
  return undefined;
}

export function validate(data: RegistrationData): FieldErrors {
  const errors: FieldErrors = {};
  for (const key of Object.keys(data) as (keyof RegistrationData)[]) {
    const error = validateField(key, data[key]);
    if (error) errors[key] = error;
  }
  return errors;
}
