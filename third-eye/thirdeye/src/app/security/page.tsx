/**
 * /security — Security & Trust.
 * Plain-language explanations, an honest "what we don't claim"
 * section, and how this very website is secured.
 */
import type { Metadata } from "next";
import Link from "next/link";

import {
  securityHonesty,
  securityIntro,
  securityPractices,
  thisSite,
} from "@/content/security";
import { site } from "@/content/site";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Security & trust — how we protect your data",
  description:
    "Access control, encryption, tested backups, monitoring and privacy practices explained in plain language — plus an honest list of what we do not claim.",
  path: "/security",
});

export default function SecurityPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <div aria-hidden className="aurora start-[-12%] top-[-25%] h-96 w-96 bg-teal-400/20" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Security &amp; trust</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              {securityIntro.headline}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{securityIntro.sub}</p>
          </div>
        </Container>
      </section>

      {/* Practices */}
      <Section className="pt-8" labelledBy="practices-heading">
        <Container>
          <h2 id="practices-heading" className="sr-only">Our security practices</h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {securityPractices.map((p, i) => (
              <Card as="li" key={p.title} data-reveal data-reveal-index={i} className="flex flex-col">
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                  <Icon name={p.icon as IconName} size={22} />
                </span>
                <h3 className="text-lg font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm font-medium text-[var(--color-brand-ink)]">
                  {p.plain}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.detail}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Honesty */}
      <Section tone="soft" labelledBy="honesty-heading">
        <Container size="narrow">
          <SectionHeading
            id="honesty-heading"
            eyebrow="Straight talk"
            title={securityHonesty.title}
            subtitle="Trust is built by being clear about limits, not by collecting badges."
          />
          <ul className="space-y-4" data-reveal>
            {securityHonesty.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-5"
              >
                <Icon name="info" size={18} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
                <span className="text-sm leading-relaxed text-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* This site */}
      <Section labelledBy="this-site-heading">
        <Container size="narrow">
          <SectionHeading
            id="this-site-heading"
            eyebrow="Practising what we preach"
            title={thisSite.title}
            subtitle="If we build it for you, we run it ourselves first."
          />
          <Card hover={false} data-reveal>
            <ul className="space-y-3">
              {thisSite.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
                  <span className="text-muted">{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-6">
              <a
                href="/.well-known/security.txt"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-ink)] underline underline-offset-4"
              >
                <Icon name="external" size={15} />
                Read our security.txt
              </a>
              <a
                href={`mailto:${site.contact.securityEmail}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-ink)] underline underline-offset-4"
              >
                <Icon name="mail" size={15} />
                Report a vulnerability
              </a>
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-muted">
            Found something? Please tell us before telling anyone else. We reply
            within [3] business days and will credit you if you would like that.
          </p>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="soft" labelledBy="security-cta">
        <Container size="narrow">
          <Card hover={false} className="p-8 text-center sm:p-12" data-reveal>
            <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
              <Icon name="shield" size={28} />
            </span>
            <h2 id="security-cta" className="text-3xl font-bold">
              Free security review, no strings
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted">
              We will look at your current website and tell you honestly what is
              fine, what needs tightening, and what you genuinely do not need to
              pay for.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact?service=Free%20security%20review" size="lg">
                Book a free security review
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/demos#security-quiz" variant="secondary" size="lg">
                Score your site in 2 minutes
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-muted">
              Prefer to read the detail first? See our{" "}
              <Link href="/legal/privacy" className="underline underline-offset-4">
                privacy policy
              </Link>
              .
            </p>
          </Card>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Security & trust", path: "/security" },
        ])}
      />
    </>
  );
}
