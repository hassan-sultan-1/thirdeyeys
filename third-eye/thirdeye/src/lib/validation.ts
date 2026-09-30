/**
 * validation.ts — SHARED INPUT VALIDATION & SANITISATION
 * ---------------------------------------------------------------
 * Used by BOTH the browser form and the server API route, so the
 * rules can never drift apart. The server ALWAYS re-validates:
 * client-side validation is UX, server-side validation is security.
 *
 * No external dependency (keeps the bundle small and the supply
 * chain short — a security decision, not just a size one).
 */

export type ContactPayload = {
  name: string;
  email: string;
  phone?: string;
  business?: string;
  industry?: string;
  service?: string;
  budget?: string;
  message: string;
  consent?: boolean;
  /** Honeypot — must stay empty. Real users never see this field. */
  website?: string;
  /** Milliseconds the form was on screen. Bots submit instantly. */
  elapsedMs?: number;
};

export type FieldErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@<>"']{1,64}@[^\s@<>"']{1,255}\.[a-zA-Z]{2,24}$/;
const PHONE_RE = /^[+]?[\d\s()./-]{6,24}$/;

/** Strip control characters and collapse runaway whitespace. */
export function clean(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s{3,}/g, "  ")
    .trim()
    .slice(0, maxLength);
}

/**
 * Escape HTML so user content is never interpreted as markup.
 * React already escapes rendered output; this protects the places
 * React does not reach — notably the notification email body.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Reject anything that looks like an attempt to inject headers/links. */
function looksLikeInjection(value: string) {
  return /(\r|\n)(to|cc|bcc|from|subject|content-type):/i.test(value);
}

/** Validate a single field — reused live by the multi-step form. */
export function validateField(
  field: keyof ContactPayload,
  value: unknown,
): string | undefined {
  const v = clean(value, 4000);
  switch (field) {
    case "name":
      if (!v) return "Please tell us your name.";
      if (v.length < 2) return "That name looks too short.";
      if (v.length > 80) return "Please keep your name under 80 characters.";
      return;
    case "email":
      if (!v) return "We need an email address to reply.";
      if (!EMAIL_RE.test(v)) return "Please check that email address.";
      if (looksLikeInjection(v)) return "That email address is not valid.";
      return;
    case "phone":
      if (v && !PHONE_RE.test(v)) return "Please check that phone number.";
      return;
    case "business":
      if (v.length > 120) return "Please keep this under 120 characters.";
      return;
    case "message":
      if (!v) return "Please tell us a little about what you need.";
      if (v.length < 10) return "A sentence or two helps us prepare properly.";
      if (v.length > 2000) return "Please keep your message under 2000 characters.";
      return;
    case "consent":
      if (value !== true) return "Please confirm you're happy for us to reply.";
      return;
    default:
      return;
  }
}

/** Full-payload validation. Returns cleaned data plus any errors. */
export function validateContact(raw: Partial<ContactPayload>) {
  const data: ContactPayload = {
    name: clean(raw.name, 80),
    email: clean(raw.email, 160).toLowerCase(),
    phone: clean(raw.phone, 24),
    business: clean(raw.business, 120),
    industry: clean(raw.industry, 40),
    service: clean(raw.service, 200),
    budget: clean(raw.budget, 40),
    message: clean(raw.message, 2000),
    consent: raw.consent === true,
    website: clean(raw.website, 100),
    elapsedMs: typeof raw.elapsedMs === "number" ? raw.elapsedMs : undefined,
  };

  const errors: FieldErrors = {};
  (["name", "email", "phone", "business", "message", "consent"] as const).forEach((f) => {
    const err = validateField(f, data[f]);
    if (err) errors[f] = err;
  });

  return { data, errors, ok: Object.keys(errors).length === 0 };
}

/**
 * Spam heuristics, applied server-side only so bots cannot read the rules.
 * Returns a reason string when the submission should be silently dropped.
 */
export function spamReason(data: ContactPayload): string | null {
  if (data.website) return "honeypot";
  if (typeof data.elapsedMs === "number" && data.elapsedMs < 2500) return "too-fast";
  const linkCount = (data.message.match(/https?:\/\//gi) || []).length;
  if (linkCount > 2) return "too-many-links";
  if (/\b(viagra|casino|crypto\s*giveaway|seo\s*services\s*cheap)\b/i.test(data.message))
    return "keyword";
  return null;
}
