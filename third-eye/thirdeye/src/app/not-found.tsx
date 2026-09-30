/**
 * Custom 404 — helpful rather than apologetic.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist — here's how to find what you were after.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const suggestions = [
    { href: "/services", label: "Services", hint: "What we build and what's included" },
    { href: "/pricing", label: "Pricing", hint: "Packages and a live estimator" },
    { href: "/demos", label: "Live demos", hint: "Try an AI assistant right now" },
    { href: "/contact", label: "Contact", hint: "Book a free 30-minute call" },
  ];

  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
      <div aria-hidden className="aurora start-[10%] top-[-10%] h-80 w-80 bg-teal-400/20 animate-float" />

      <Container size="narrow" className="relative text-center">
        <span className="mx-auto mb-6 inline-flex animate-float">
          <LogoMark size={64} />
        </span>

        <p className="font-[family-name:var(--font-heading)] text-7xl font-bold text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          We looked everywhere — that page isn&apos;t here
        </h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          It may have moved, or the link might have a typo. Here are the places
          most people are heading.
        </p>

        <ul className="mx-auto mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-4 text-start transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)]"
              >
                <span className="flex items-center justify-between text-sm font-bold">
                  {s.label}
                  <Icon name="arrow-right" size={16} className="text-[var(--color-brand-ink)] transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-1 text-xs text-muted">{s.hint}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">
            Back to the homepage
          </ButtonLink>
          <a
            href={`mailto:${site.contact.email}`}
            className="text-sm font-medium text-muted underline underline-offset-4 transition-colors hover:text-[var(--color-brand-ink)]"
          >
            Tell us about the broken link
          </a>
        </div>
      </Container>
    </section>
  );
}
