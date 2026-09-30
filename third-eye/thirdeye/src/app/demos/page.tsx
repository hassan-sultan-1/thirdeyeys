/**
 * /demos — the interactive playground.
 * Contains the niche demo bots, the before/after slider and the
 * website security score quiz.
 */
import type { Metadata } from "next";
import { Suspense } from "react";

import {
  Container,
  Eyebrow,
  JsonLd,
  Section,
  SectionHeading,
  ButtonLink,
  Card,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { DemoPlayground } from "@/components/features/DemoPlayground";
import { SecurityQuiz } from "@/components/features/SecurityQuiz";
import { BeforeAfter } from "@/components/features/BeforeAfter";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Live demos — try an AI assistant for your industry",
  description:
    "Talk to a working restaurant, shop or clinic assistant, compare a website redesign, and score your own website security in two minutes.",
  path: "/demos",
});

export default function DemosPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <div aria-hidden className="aurora start-[-10%] top-[-20%] h-80 w-80 bg-teal-400/25 animate-float" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Live demos</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Try it before you <span className="text-gradient">spend anything</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Three working assistants, a redesign comparison and a free
              security check. Nothing here asks for your email.
            </p>
          </div>

          <nav aria-label="Jump to a demo" className="mt-9 flex flex-wrap justify-center gap-2" data-reveal data-reveal-index="1">
            {[
              { href: "#playground", label: "Industry assistants", icon: "chat" as const },
              { href: "#redesign", label: "Website before / after", icon: "globe" as const },
              { href: "#security-quiz", label: "Security score quiz", icon: "shield" as const },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-bg-elevated)] px-4 py-2 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
              >
                <Icon name={l.icon} size={16} />
                {l.label}
              </a>
            ))}
          </nav>
        </Container>
      </section>

      {/* Playground */}
      <Section id="playground" className="scroll-mt-24 pt-8" labelledBy="playground-heading">
        <Container>
          <SectionHeading
            id="playground-heading"
            eyebrow="Demo playground"
            title="Pick an industry and start talking"
            subtitle="These demos run entirely in your browser using a fixed script, so they're instant and always behave the same. A real assistant uses your own content."
          />
          <div data-reveal>
            <Suspense fallback={<div className="h-[32rem]" aria-busy="true" />}>
              <DemoPlayground />
            </Suspense>
          </div>
        </Container>
      </Section>

      {/* Before / after */}
      <Section id="redesign" tone="soft" className="scroll-mt-24" labelledBy="redesign-demo-heading">
        <Container>
          <SectionHeading
            id="redesign-demo-heading"
            eyebrow="Website redesign"
            title="Before and after"
            subtitle="Drag the handle to compare a typical dated site with a modern, fast, mobile-first rebuild."
          />
          <div data-reveal>
            <BeforeAfter />
          </div>
        </Container>
      </Section>

      {/* Security quiz */}
      <Section id="security-quiz" className="scroll-mt-24" labelledBy="quiz-heading">
        <Container>
          <SectionHeading
            id="quiz-heading"
            eyebrow="Free security check"
            title="How safe is your website, really?"
            subtitle="Ten plain-English questions, about two minutes. Nothing is sent anywhere — the whole thing runs in your browser."
          />
          <div data-reveal>
            <SecurityQuiz />
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="soft" labelledBy="demos-cta">
        <Container size="narrow">
          <Card hover={false} className="p-8 text-center sm:p-12" data-reveal>
            <h2 id="demos-cta" className="text-3xl font-bold">
              Want one of these trained on your business?
            </h2>
            <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted">
              Send us your menu, product list or appointment rules and we&apos;ll
              show you a working version with your own content before you commit
              to anything.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/contact?service=AI%20chat%20assistant" size="lg">
                Book free consultation
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
              <ButtonLink href="/pricing#estimator" variant="secondary" size="lg">
                See what it would cost
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Live demos", path: "/demos" },
        ])}
      />
    </>
  );
}
