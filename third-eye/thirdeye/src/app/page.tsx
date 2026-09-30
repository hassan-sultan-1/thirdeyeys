/**
 * Home page — the conversion engine.
 * Order: hero → what we do → industries → how it works → why us →
 * stats → before/after → packages → FAQ preview → final CTA.
 */
import Link from "next/link";
import type { Metadata } from "next";

import { site } from "@/content/site";
import { services, processSteps, whyUs } from "@/content/services";
import { industries } from "@/content/industries";
import { tiers, currency } from "@/content/pricing";
import { generalFaqs } from "@/content/faqs";

import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { Stats } from "@/components/features/Stats";
import { BeforeAfter } from "@/components/features/BeforeAfter";
import { faqJsonLd, pageMeta, servicesJsonLd } from "@/lib/seo";
import { money } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Secure, AI-powered systems for small business",
  description:
    "Third Eye builds professional websites, AI chat assistants and workflow automation for restaurants, shops and clinics — with cybersecurity built in. Book a free consultation.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-60" />
        <div aria-hidden className="aurora start-[-15%] top-[-10%] h-[28rem] w-[28rem] bg-teal-400/25 animate-float" />
        <div aria-hidden className="aurora end-[-10%] top-[10%] h-[24rem] w-[24rem] bg-violet-500/20" />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal>
              <Eyebrow>{site.tagline}</Eyebrow>
            </div>

            <h1
              data-reveal
              data-reveal-index="1"
              className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              Websites and AI that{" "}
              <span className="text-gradient">work while you work</span>
            </h1>

            <p
              data-reveal
              data-reveal-index="2"
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
            >
              We build professional websites, AI assistants and automations for
              restaurants, shops and clinics — so customers get answers at 11pm
              and your team stops retyping the same information. Security is
              built in, not sold as an extra.
            </p>

            <div
              data-reveal
              data-reveal-index="3"
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <ButtonLink href="/contact" size="lg">
                Book free consultation
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/demos" variant="secondary" size="lg">
                <Icon name="play" size={16} />
                See live demos
              </ButtonLink>
            </div>

            <ul
              data-reveal
              data-reveal-index="4"
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted"
            >
              {[
                "30-minute call, no obligation",
                "Fixed written quotes",
                "You own everything we build",
              ].map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <Icon name="check" size={15} className="text-[var(--color-brand-ink)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Floating proof card */}
          <div data-reveal data-reveal-index="5" className="mx-auto mt-16 max-w-4xl">
            <div className="surface grid gap-px overflow-hidden rounded-2xl bg-[var(--color-line)] sm:grid-cols-3">
              {[
                { icon: "shield" as IconName, title: "Secure by default", body: "HTTPS, encryption, access control, backups and monitoring in every build." },
                { icon: "sparkles" as IconName, title: "AI that stays honest", body: "Answers from your content only. Says \"I don't know\" instead of inventing." },
                { icon: "clock" as IconName, title: "Live in weeks", body: "Most websites launch in [2–3 weeks], assistants in [1–2 weeks] more." },
              ].map((item) => (
                <div key={item.title} className="bg-[var(--color-bg-elevated)] p-6">
                  <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                    <Icon name={item.icon} />
                  </span>
                  <h2 className="text-base font-bold">{item.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============== WHAT WE DO ============== */}
      <Section tone="soft" labelledBy="what-we-do">
        <Container>
          <SectionHeading
            id="what-we-do"
            eyebrow="What we do"
            title="Four things, done properly"
            subtitle="Start with one. Add the others when they earn their place."
          />

          <ul className="grid gap-6 md:grid-cols-2">
            {services.map((s, i) => (
              <Card as="li" key={s.slug} data-reveal data-reveal-index={i} className="group flex flex-col">
                <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)] transition-transform duration-300 group-hover:scale-110">
                  <Icon name={s.icon} size={24} />
                </span>
                <h3 className="text-xl font-bold">{s.title}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{s.short}</p>
                <Link
                  href={`/services#${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-ink)] transition-all hover:gap-2.5"
                >
                  What&apos;s included
                  <Icon name="arrow-right" size={16} />
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============== INDUSTRIES ============== */}
      <Section labelledBy="industries-heading">
        <Container>
          <SectionHeading
            id="industries-heading"
            eyebrow="Industries we serve"
            title="Built around how you actually work"
            subtitle="A restaurant needs different things from a clinic. We do not sell the same box three times."
          />

          <ul className="grid gap-6 md:grid-cols-3">
            {industries.map((ind, i) => (
              <Card as="li" key={ind.slug} data-reveal data-reveal-index={i} className="flex flex-col">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                  <Icon name={ind.icon} size={24} />
                </span>
                <h3 className="mt-4 text-xl font-bold">{ind.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{ind.intro}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {ind.features.slice(0, 3).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-[var(--color-brand-ink)]" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/industries?tab=${ind.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-ink)] transition-all hover:gap-2.5"
                >
                  See the details
                  <Icon name="arrow-right" size={16} />
                </Link>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ============== HOW IT WORKS ============== */}
      <Section tone="soft" labelledBy="process-heading">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="How it works"
            title="Four steps, no surprises"
            subtitle="You know the price and the date before anything is built."
          />

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((s, i) => (
              <li key={s.step} data-reveal data-reveal-index={i} className="relative">
                <div className="surface h-full rounded-2xl p-6">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-[var(--color-brand)]/30">
                    {s.step}
                  </span>
                  <h3 className="mt-2 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -end-3 top-1/2 hidden text-[var(--color-brand)]/40 lg:block"
                  >
                    <Icon name="arrow-right" size={20} />
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ============== WHY US ============== */}
      <Section labelledBy="why-heading">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
            <div data-reveal>
              <Eyebrow>Why choose us</Eyebrow>
              <h2 id="why-heading" className="text-3xl font-bold sm:text-4xl">
                Most agencies add security at the end.{" "}
                <span className="text-gradient">We start there.</span>
              </h2>
              <p className="mt-5 leading-relaxed text-muted">
                Our background is cybersecurity and information assurance. That
                changes how we build: least privilege by default, encrypted
                everything, tested backups, and AI that cannot be talked into
                leaking your data.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                It also changes what we say. We will not claim certifications we
                do not hold, invent client results, or promise a number we cannot
                stand behind.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/security" variant="secondary">
                  <Icon name="shield" size={18} />
                  How we protect your data
                </ButtonLink>
                <ButtonLink href="/demos#security-quiz" variant="ghost">
                  Take the 2-minute security check
                </ButtonLink>
              </div>
            </div>

            <ul className="grid gap-5 sm:grid-cols-2">
              {whyUs.map((w, i) => (
                <Card as="li" key={w.title} data-reveal data-reveal-index={i}>
                  <h3 className="text-base font-bold">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{w.body}</p>
                </Card>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* ============== STATS ============== */}
      <Stats />

      {/* ============== BEFORE / AFTER ============== */}
      <Section labelledBy="redesign-heading">
        <Container>
          <SectionHeading
            id="redesign-heading"
            eyebrow="Website redesign"
            title="The difference a proper rebuild makes"
            subtitle="Drag the handle to compare a typical dated website with a modern, fast, mobile-first one."
          />
          <div data-reveal>
            <BeforeAfter />
          </div>
        </Container>
      </Section>

      {/* ============== PACKAGES ============== */}
      <Section tone="soft" labelledBy="packages-heading">
        <Container>
          <SectionHeading
            id="packages-heading"
            eyebrow="Featured packages"
            title="Clear prices, no hourly surprises"
            subtitle="One-time setup plus a monthly plan that keeps everything running and safe."
          />

          <ul className="grid gap-6 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Card
                as="li"
                key={t.id}
                data-reveal
                data-reveal-index={i}
                className={
                  t.highlight
                    ? "relative border-[var(--color-brand)] ring-1 ring-[var(--color-brand)]/40"
                    : ""
                }
              >
                {t.highlight && (
                  <span className="absolute -top-3 start-6">
                    <Badge tone="brand">
                      <Icon name="star" size={12} /> Most popular
                    </Badge>
                  </span>
                )}
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {t.best}
                </p>

                <p className="mt-5">
                  <span className="font-[family-name:var(--font-heading)] text-4xl font-bold tabular-nums">
                    {money(t.setup, currency.symbol)}
                  </span>
                  <span className="ms-1.5 text-sm text-muted">setup</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  then{" "}
                  <strong className="text-[var(--color-ink)]">
                    {money(t.monthly, currency.symbol)}
                  </strong>
                  /month
                </p>

                <ul className="mt-6 space-y-2.5">
                  {t.features.slice(0, 5).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Icon name="check" size={15} className="mt-1 shrink-0 text-[var(--color-brand-ink)]" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href="/pricing"
                  variant={t.highlight ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {t.cta}
                </ButtonLink>
              </Card>
            ))}
          </ul>

          <p className="mt-8 text-center text-sm text-muted">
            {currency.note}{" "}
            <Link href="/pricing#estimator" className="font-semibold text-[var(--color-brand-ink)] underline underline-offset-4">
              Build your own estimate →
            </Link>
          </p>
        </Container>
      </Section>

      {/* ============== FAQ PREVIEW ============== */}
      <Section labelledBy="faq-heading">
        <Container size="narrow">
          <SectionHeading
            id="faq-heading"
            eyebrow="Questions"
            title="The things people ask first"
          />
          <div data-reveal>
            <Accordion items={generalFaqs.slice(0, 5)} />
          </div>
          <p className="mt-6 text-center text-sm text-muted">
            More questions on the{" "}
            <Link href="/pricing#faq" className="font-semibold text-[var(--color-brand-ink)] underline underline-offset-4">
              pricing page
            </Link>{" "}
            — or just ask the assistant in the corner.
          </p>
        </Container>
      </Section>

      {/* ============== FINAL CTA ============== */}
      <section className="relative overflow-hidden bg-navy-900 py-20 text-navy-50 dark:bg-navy-950 sm:py-28">
        <div aria-hidden className="aurora start-[20%] top-[-40%] h-96 w-96 bg-teal-400/30" />
        <div aria-hidden className="aurora end-[10%] bottom-[-50%] h-96 w-96 bg-violet-500/25" />

        <Container className="relative text-center">
          <h2 data-reveal className="mx-auto max-w-2xl text-3xl font-bold sm:text-5xl">
            Let&apos;s find the one thing worth fixing first
          </h2>
          <p data-reveal data-reveal-index="1" className="mx-auto mt-5 max-w-xl text-lg text-navy-200">
            Thirty minutes, online, no obligation and no sales script. You will
            leave the call knowing what would help most — even if that turns out
            not to be us.
          </p>
          <div data-reveal data-reveal-index="2" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Book free consultation
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
            <ButtonLink href="/pricing#estimator" variant="onDark" size="lg">
              Estimate my price
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Structured data for search engines */}
      <JsonLd data={[...servicesJsonLd(), faqJsonLd(generalFaqs)]} />
    </>
  );
}
