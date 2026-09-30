/**
 * /services — detailed breakdown of the four offerings.
 * Each service is a deep-linkable section (#websites, #chatbots, …).
 */
import type { Metadata } from "next";
import Link from "next/link";

import { services } from "@/content/services";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, pageMeta, servicesJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Services — websites, AI assistants, automation & private AI",
  description:
    "What we build and what's included: premium websites, AI chatbots and support agents, workflow automation, and private secure AI for small businesses.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-16 pb-12 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <div aria-hidden className="aurora start-[-10%] top-[-20%] h-80 w-80 bg-teal-400/20" />
        <Container className="relative">
          <div className="max-w-3xl" data-reveal>
            <Eyebrow>Services</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Everything we build,{" "}
              <span className="text-gradient">explained plainly</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              No packages full of things you will never use. Here is exactly
              what each service is, what you get, what it does for your
              business, and how long it takes.
            </p>
          </div>

          {/* Jump links */}
          <nav aria-label="Jump to a service" className="mt-10 flex flex-wrap gap-2" data-reveal data-reveal-index="1">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
              >
                <Icon name={s.icon} size={16} />
                {s.title}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Service sections */}
      {services.map((s, i) => (
        <Section
          key={s.slug}
          id={s.slug}
          tone={i % 2 === 0 ? "soft" : "default"}
          labelledBy={`${s.slug}-heading`}
          className="scroll-mt-24"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
              {/* Left: what it is */}
              <div data-reveal>
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                  <Icon name={s.icon} size={28} />
                </span>
                <h2 id={`${s.slug}-heading`} className="text-3xl font-bold sm:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.what}</p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[var(--color-line)] p-4">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                      <Icon name="clock" size={14} /> Typical timeline
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium">{s.timeline}</dd>
                  </div>
                  <div className="rounded-xl border border-[var(--color-line)] p-4">
                    <dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                      <Icon name="star" size={14} /> Available from
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium">{s.startingAt}</dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/contact?service=${encodeURIComponent(s.title)}`}>
                    Talk about {s.title.toLowerCase()}
                    <Icon name="arrow-right" size={18} />
                  </ButtonLink>
                  <ButtonLink href="/pricing#estimator" variant="secondary">
                    Estimate the cost
                  </ButtonLink>
                </div>
              </div>

              {/* Right: what's included + benefits */}
              <div className="grid gap-6" data-reveal data-reveal-index="1">
                <Card hover={false}>
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                    What&apos;s included
                  </h3>
                  <ul className="space-y-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card hover={false} className="border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">
                    What it does for you
                  </h3>
                  <ul className="space-y-2.5">
                    {s.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm">
                        <Icon name="sparkles" size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
                        <span className="text-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA */}
      <Section labelledBy="services-cta">
        <Container size="narrow">
          <SectionHeading
            id="services-cta"
            title="Not sure which one you need?"
            subtitle="That is exactly what the free consultation is for. We will tell you honestly what would help most — and what you can safely skip."
          />
          <div className="flex flex-col justify-center gap-3 sm:flex-row" data-reveal>
            <ButtonLink href="/contact" size="lg">
              Book free consultation
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
            <ButtonLink href="/demos" variant="secondary" size="lg">
              Try the live demos first
            </ButtonLink>
          </div>
          <p className="mt-8 text-center text-sm text-muted">
            Curious how we keep all of this safe?{" "}
            <Link href="/security" className="font-semibold text-[var(--color-brand-ink)] underline underline-offset-4">
              Read our security approach
            </Link>
            .
          </p>
        </Container>
      </Section>

      <JsonLd
        data={[
          ...servicesJsonLd(),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
    </>
  );
}
