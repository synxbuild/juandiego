/**
 * Registration rules, shared by the client form and the /api/register route (server re-validates).
 * Mirrors the current Typeform (ndgYv5uR): full name required, phone optional, email optional.
 * Optional fields are still validated when filled.
 */

export type RegistrationInput = {
  fullName: string;
  phone: string; // E.164 from react-phone-number-input, or ""
  email: string;
};

export type RegistrationErrors = Partial<Record<keyof RegistrationInput, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const E164_RE = /^\+[1-9]\d{7,14}$/;

export function validateRegistration(
  input: RegistrationInput,
  isValidPhone: (phone: string) => boolean = (p) => E164_RE.test(p),
): RegistrationErrors {
  const errors: RegistrationErrors = {};
  const name = input.fullName.trim();
  if (!name) errors.fullName = "Escribe tu nombre completo.";
  else if (name.length < 2) errors.fullName = "El nombre parece demasiado corto.";

  if (input.phone && !isValidPhone(input.phone)) {
    errors.phone = "Revisa el número de teléfono.";
  }

  const email = input.email.trim();
  if (email && !EMAIL_RE.test(email)) {
    errors.email = "Revisa el correo: por ejemplo, nombre@gmail.com.";
  }
  return errors;
}
