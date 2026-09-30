/**
 * Primitives.tsx — LAYOUT & UI BUILDING BLOCKS
 * Container / Section / SectionHeading / Button / Card / Badge / Eyebrow.
 * Server components (no "use client") so they add zero JS to the page.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ---------------- Container ---------------- */
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}) {
  const width =
    size === "narrow" ? "max-w-3xl" : size === "wide" ? "max-w-[88rem]" : "max-w-6xl";
  return <div className={cn("mx-auto w-full px-5 sm:px-8", width, className)}>{children}</div>;
}

/* ---------------- Section ---------------- */
export function Section({
  children,
  className,
  id,
  tone = "default",
  as: Tag = "section",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "soft" | "deep";
  as?: "section" | "div" | "article";
  labelledBy?: string;
}) {
  const tones = {
    default: "",
    soft: "bg-[var(--color-bg-soft)]",
    deep: "bg-navy-900 text-navy-50 dark:bg-navy-950",
  } as const;
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative py-16 sm:py-24", tones[tone], className)}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Eyebrow ---------------- */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-elevated)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-ink)]",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand)]" />
      {children}
    </p>
  );
}

/* ---------------- SectionHeading ---------------- */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  id,
  level = 2,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  id?: string;
  level?: 1 | 2 | 3;
}) {
  const H = `h${level}` as const;
  return (
    <div
      className={cn(
        "mb-12",
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
      )}
      data-reveal
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <H
        id={id}
        className={cn(
          "font-bold tracking-tight",
          level === 1 ? "text-4xl sm:text-6xl" : "text-3xl sm:text-4xl",
        )}
      >
        {title}
      </H>
      {subtitle ? (
        <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

/* ---------------- Button ---------------- */
type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";
type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-brand)] text-navy-950 shadow-[0_8px_24px_-10px_var(--color-brand)] hover:brightness-110 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "border border-[var(--color-line)] bg-[var(--color-bg-elevated)] text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-[var(--color-ink)] hover:bg-[var(--color-bg-soft)]",
  onDark:
    "border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20 hover:-translate-y-0.5 active:translate-y-0",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-[0.95rem]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const cls = buttonClass(variant, size, className);
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

/* ---------------- Card ---------------- */
export function Card({
  children,
  className,
  hover = true,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "li" | "article";
}) {
  return (
    <Tag
      className={cn(
        "surface rounded-2xl p-6 transition-all duration-300",
        hover && "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] hover:border-[var(--color-brand)]/50",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------------- Badge ---------------- */
export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "neutral" | "warn" | "danger" | "good";
  className?: string;
}) {
  const tones = {
    brand: "bg-teal-500/12 text-[var(--color-brand-ink)] border-teal-500/30",
    neutral: "bg-[var(--color-bg-soft)] text-muted border-[var(--color-line)]",
    warn: "bg-amber-500/12 text-amber-700 dark:text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/12 text-rose-700 dark:text-rose-300 border-rose-500/30",
    good: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- Prose (for legal & blog copy) ---------------- */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "space-y-5 text-[1.05rem] leading-relaxed text-muted",
        "[&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[var(--color-ink)]",
        "[&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[var(--color-ink)]",
        "[&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6",
        "[&_strong]:text-[var(--color-ink)] [&_strong]:font-semibold",
        "[&_a]:text-[var(--color-brand-ink)] [&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------------- JSON-LD script tag ---------------- */
export function JsonLd({ data }: { data: object | object[] }) {
  // JSON.stringify output is escaped for </script> to avoid breaking out.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Safe: this is our own static structured data, not user input.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
