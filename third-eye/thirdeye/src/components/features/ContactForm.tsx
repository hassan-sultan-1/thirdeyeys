"use client";

/**
 * ContactForm — 3-step enquiry / booking form.
 * ---------------------------------------------------------------
 * UX      : progress bar, one idea per step, inline validation,
 *           friendly confirmation screen.
 * Security: honeypot field, time-on-page check, client-side
 *           validation shared with the server (src/lib/validation.ts),
 *           and the server re-validates everything regardless.
 * Prefill : ?service=…&message=…&industry=… lets the pricing
 *           estimator and demo pages hand over a ready-made enquiry.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { validateField, type ContactPayload, type FieldErrors } from "@/lib/validation";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buttonClass, Card } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

const BUDGETS = [
  "Not sure yet",
  "Under [$1,000]",
  "[$1,000 – $3,000]",
  "[$3,000 – $6,000]",
  "[$6,000+]",
];

const STEPS = [
  { title: "About you", hint: "So we know who we're talking to." },
  { title: "What you need", hint: "A rough idea is fine — we'll refine it on the call." },
  { title: "Your message", hint: "Tell us what would make the biggest difference." },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const params = useSearchParams();
  const mountedAt = useRef(Date.now());

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const startedRef = useRef(false);

  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    phone: "",
    business: "",
    industry: "",
    service: "",
    budget: BUDGETS[0],
    message: "",
    consent: false,
    website: "", // honeypot
  });

  /* Prefill from URL (estimator / demo / quiz hand-off). */
  useEffect(() => {
    const service = params.get("service");
    const message = params.get("message");
    const industry = params.get("industry");
    if (!service && !message && !industry) return;
    setForm((f) => ({
      ...f,
      service: service ? service.slice(0, 200) : f.service,
      message: message ? message.slice(0, 2000) : f.message,
      industry: industry ? industry.slice(0, 40) : f.industry,
    }));
  }, [params]);

  const set = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("contact_form_start");
    }
    setForm((f) => ({ ...f, [key]: value }));
    if (touched[key as string]) {
      setErrors((e) => ({ ...e, [key]: validateField(key, value) }));
    }
  };

  const blur = (key: keyof ContactPayload) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateField(key, form[key]) }));
  };

  /** Fields that must be valid before each step can be left. */
  const stepFields: (keyof ContactPayload)[][] = useMemo(
    () => [["name", "email", "phone"], [], ["message", "consent"]],
    [],
  );

  const validateStep = (index: number) => {
    const next: FieldErrors = {};
    stepFields[index].forEach((f) => {
      const err = validateField(f, form[f]);
      if (err) next[f] = err;
    });
    setErrors((e) => ({ ...e, ...next }));
    stepFields[index].forEach((f) => setTouched((t) => ({ ...t, [f]: true })));
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    track("contact_form_step", { step: step + 1 });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    // Also re-check step 1 in case the user skipped back and cleared it.
    if (!validateStep(0)) { setStep(0); return; }

    setStatus("sending");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, elapsedMs: Date.now() - mountedAt.current }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (data?.errors) setErrors(data.errors);
        setServerError(
          data?.error ||
            "Something went wrong sending that. Please try again, or email us directly.",
        );
        setStatus("error");
        track("contact_form_error", { status: res.status });
        return;
      }

      setStatus("sent");
      track("contact_form_submit", {
        industry: form.industry || "unspecified",
        service: form.service || "unspecified",
      });
    } catch {
      setServerError(
        "We couldn't reach the server. Please check your connection, or email us directly.",
      );
      setStatus("error");
      track("contact_form_error", { status: 0 });
    }
  };

  /* ---------------- Confirmation ---------------- */
  if (status === "sent") {
    return (
      <Card hover={false} className="animate-fade-up p-8 text-center sm:p-12">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand-ink)]">
          <Icon name="check" size={32} />
        </div>
        <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold">
          Message sent — thank you
        </h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          We&apos;ve got it. One of the three of us will reply within{" "}
          <strong className="text-[var(--color-ink)]">one business day</strong>,
          usually sooner. If it&apos;s urgent, WhatsApp is the fastest way to reach us.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={site.contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("booking_click", { location: "confirmation" })}
            className={buttonClass("primary", "md")}
          >
            <Icon name="calendar" size={18} />
            Pick a time now
          </a>
          <Link href="/demos" className={buttonClass("secondary", "md")}>
            Explore the live demos
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted">
          We store your enquiry only as long as we need it to reply and keep our
          records. See our privacy policy for details.
        </p>
      </Card>
    );
  }

  /* ---------------- Form ---------------- */
  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <Card hover={false} className="overflow-hidden p-0">
      {/* Progress */}
      <div className="border-b border-[var(--color-line)] px-6 py-5 sm:px-8">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="text-sm font-bold">
            Step {step + 1} of {STEPS.length}
            <span className="ms-2 font-normal text-muted">{STEPS[step].title}</span>
          </p>
          <span className="text-xs font-semibold text-muted">{Math.round(progress)}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Form progress"
          className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-soft)]"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand)] to-violet-500 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={submit} noValidate className="p-6 sm:p-8">
        <p className="mb-6 text-sm text-muted">{STEPS[step].hint}</p>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        {/* ---- Step 1 ---- */}
        {step === 0 && (
          <div className="space-y-5">
            <Field
              id="name"
              label="Your name"
              required
              value={form.name}
              error={touched.name ? errors.name : undefined}
              onChange={(v) => set("name", v)}
              onBlur={() => blur("name")}
              autoComplete="name"
              placeholder="e.g. Ayesha Khan"
            />
            <Field
              id="email"
              label="Email address"
              type="email"
              required
              value={form.email}
              error={touched.email ? errors.email : undefined}
              onChange={(v) => set("email", v)}
              onBlur={() => blur("email")}
              autoComplete="email"
              placeholder="you@yourbusiness.com"
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="phone"
                label="Phone or WhatsApp"
                type="tel"
                value={form.phone || ""}
                error={touched.phone ? errors.phone : undefined}
                onChange={(v) => set("phone", v)}
                onBlur={() => blur("phone")}
                autoComplete="tel"
                placeholder="Optional"
              />
              <Field
                id="business"
                label="Business name"
                value={form.business || ""}
                error={touched.business ? errors.business : undefined}
                onChange={(v) => set("business", v)}
                onBlur={() => blur("business")}
                autoComplete="organization"
                placeholder="Optional"
              />
            </div>
          </div>
        )}

        {/* ---- Step 2 ---- */}
        {step === 1 && (
          <div className="space-y-7">
            <fieldset className="border-0 p-0">
              <legend className="mb-3 text-sm font-semibold">What kind of business is it?</legend>
              <div className="grid gap-3 sm:grid-cols-4">
                {[...industries.map((i) => ({ id: i.slug, label: i.name, icon: i.icon as IconName })),
                  { id: "other", label: "Something else", icon: "sparkles" as IconName }].map((opt) => (
                  <label
                    key={opt.id}
                    className={cn(
                      "flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border p-4 text-center transition-all",
                      form.industry === opt.id
                        ? "border-[var(--color-brand)] bg-[var(--color-brand)]/8"
                        : "border-[var(--color-line)] hover:border-[var(--color-brand)]/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="industry"
                      value={opt.id}
                      checked={form.industry === opt.id}
                      onChange={(e) => set("industry", e.target.value)}
                      className="sr-only"
                    />
                    <Icon name={opt.icon} size={22} className="text-[var(--color-brand-ink)]" />
                    <span className="text-xs font-semibold">{opt.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="border-0 p-0">
              <legend className="mb-3 text-sm font-semibold">What are you interested in?</legend>
              <div className="flex flex-wrap gap-2">
                {[...services.map((s) => s.title), "Not sure yet"].map((label) => {
                  const list = (form.service || "").split(", ").filter(Boolean);
                  const active = list.includes(label);
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        set(
                          "service",
                          (active ? list.filter((l) => l !== label) : [...list, label]).join(", "),
                        )
                      }
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm font-medium transition-all",
                        active
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/10 text-[var(--color-brand-ink)]"
                          : "border-[var(--color-line)] text-muted hover:border-[var(--color-brand)]/60",
                      )}
                    >
                      {active && <Icon name="check" size={14} className="me-1.5 inline" />}
                      {label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div>
              <label htmlFor="budget" className="mb-2 block text-sm font-semibold">
                Rough budget
              </label>
              <select
                id="budget"
                value={form.budget}
                onChange={(e) => set("budget", e.target.value)}
                className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--color-brand)]"
              >
                {BUDGETS.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-muted">
                No pressure — this just helps us suggest something realistic.
              </p>
            </div>
          </div>
        )}

        {/* ---- Step 3 ---- */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                How can we help? <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                onBlur={() => blur("message")}
                maxLength={2000}
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? "message-error" : "message-count"}
                placeholder="What's slow, broken or missing right now? For example: 'the phone rings all through service' or 'we have no website at all'."
                className={cn(
                  "w-full rounded-xl border bg-[var(--color-bg)] px-4 py-3 text-sm leading-relaxed outline-none transition-colors",
                  touched.message && errors.message
                    ? "border-rose-500"
                    : "border-[var(--color-line)] focus:border-[var(--color-brand)]",
                )}
              />
              <div className="mt-2 flex items-start justify-between gap-4">
                {touched.message && errors.message ? (
                  <p id="message-error" role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                    {errors.message}
                  </p>
                ) : (
                  <span />
                )}
                <p id="message-count" className="shrink-0 text-xs tabular-nums text-muted">
                  {form.message.length}/2000
                </p>
              </div>
            </div>

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-line)] p-4">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                onBlur={() => blur("consent")}
                aria-invalid={Boolean(touched.consent && errors.consent)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
              />
              <span className="text-sm leading-relaxed text-muted">
                I&apos;m happy for Third Eye to use these details to reply to my
                enquiry. No marketing lists, no sharing with anyone else.{" "}
                <Link href="/legal/privacy" className="font-medium text-[var(--color-brand-ink)] underline underline-offset-4">
                  Privacy policy
                </Link>
                .
              </span>
            </label>
            {touched.consent && errors.consent && (
              <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                {errors.consent}
              </p>
            )}

            {serverError && (
              <div role="alert" className="rounded-xl border border-rose-500/30 bg-rose-500/8 p-4 text-sm">
                <p className="font-semibold text-rose-700 dark:text-rose-300">{serverError}</p>
                <p className="mt-1 text-muted">
                  You can always email us at{" "}
                  <a href={`mailto:${site.contact.email}`} className="underline underline-offset-4">
                    {site.contact.email}
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        )}

        {/* ---- Navigation ---- */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className={buttonClass("secondary", "md")}
            >
              <Icon name="arrow-right" size={16} className="rotate-180" />
              Back
            </button>
          )}

          {step < STEPS.length - 1 ? (
            <button type="button" onClick={goNext} className={buttonClass("primary", "md", "sm:ms-auto")}>
              Continue
              <Icon name="arrow-right" size={18} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className={buttonClass("primary", "md", "sm:ms-auto")}
            >
              {status === "sending" ? "Sending…" : "Send enquiry"}
              {status !== "sending" && <Icon name="send" size={18} />}
            </button>
          )}
        </div>
      </form>
    </Card>
  );
}

/* ---------------- Small labelled input ---------------- */
function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-xl border bg-[var(--color-bg)] px-4 py-3 text-sm outline-none transition-colors",
          error ? "border-rose-500" : "border-[var(--color-line)] focus:border-[var(--color-brand)]",
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-medium text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
