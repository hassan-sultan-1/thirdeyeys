/**
 * /pricing — three tiers, comparison table, estimator, ROI calculator, FAQ.
 * Every number comes from src/content/pricing.ts.
 */
import type { Metadata } from "next";
import { Fragment, Suspense } from "react";

import { comparison, currency, tiers } from "@/content/pricing";
import { pricingFaqs } from "@/content/faqs";
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
import { Icon } from "@/components/ui/Icon";
import { Accordion } from "@/components/ui/Accordion";
import { PricingEstimator } from "@/components/features/PricingEstimator";
import { RoiCalculator } from "@/components/features/RoiCalculator";
import { breadcrumbJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";
import { money } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Pricing — setup fee plus a simple monthly plan",
  description:
    "Three straightforward packages: Starter, Growth and Secure Pro. Build your own estimate, see what's included, and get a fixed written quote after a free consultation.",
  path: "/pricing",
});

/** Renders true / false / text cells in the comparison table. */
function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <>
        <Icon name="check" size={18} className="mx-auto text-[var(--color-brand-ink)]" title="Included" />
      </>
    );
  if (value === false)
    return (
      <>
        <Icon name="x" size={16} className="mx-auto text-[var(--color-ink-soft)]/50" title="Not included" />
      </>
    );
  return <span className="text-sm font-medium">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <div aria-hidden className="aurora end-[-10%] top-[-20%] h-80 w-80 bg-violet-500/20" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Pricing</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-6xl">
              Know the price <span className="text-gradient">before we start</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              A one-time setup fee to build it, then a monthly plan to host,
              update, back up, monitor and support it. No hourly billing, no
              surprise invoices.
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--color-brand-ink)]">
              {currency.note}
            </p>
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <Section className="pt-6" labelledBy="tiers-heading">
        <Container>
          <h2 id="tiers-heading" className="sr-only">Packages</h2>
          <ul className="grid gap-6 lg:grid-cols-3 lg:items-start">
            {tiers.map((t, i) => (
              <Card
                as="li"
                key={t.id}
                data-reveal
                data-reveal-index={i}
                hover={false}
                className={
                  t.highlight
                    ? "relative border-[var(--color-brand)] shadow-[var(--shadow-lift)] ring-1 ring-[var(--color-brand)]/40 lg:-mt-4 lg:pb-10"
                    : "relative"
                }
              >
                {t.highlight && (
                  <span className="absolute -top-3 start-6">
                    <Badge tone="brand">
                      <Icon name="star" size={12} /> Most popular
                    </Badge>
                  </span>
                )}

                <h3 className="text-2xl font-bold">{t.name}</h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted">
                  {t.best}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{t.blurb}</p>

                <div className="mt-6 rounded-xl bg-[var(--color-bg-soft)] p-4">
                  <p>
                    <span className="font-[family-name:var(--font-heading)] text-4xl font-bold tabular-nums">
                      {money(t.setup, currency.symbol)}
                    </span>
                    <span className="ms-1.5 text-sm text-muted">one-time setup</span>
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    then{" "}
                    <strong className="text-[var(--color-ink)]">
                      {money(t.monthly, currency.symbol)}
                    </strong>
                    /month, cancel with [30] days notice
                  </p>
                </div>

                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
                      <span className="text-muted">{f}</span>
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  href={`/contact?service=${encodeURIComponent(t.name + " package")}`}
                  variant={t.highlight ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {t.cta}
                  <Icon name="arrow-right" size={18} />
                </ButtonLink>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Comparison table */}
      <Section tone="soft" labelledBy="compare-heading">
        <Container>
          <SectionHeading
            id="compare-heading"
            eyebrow="Compare"
            title="What you get in each package"
            subtitle="Scroll sideways on a phone — every row is the same in both directions."
          />

          <div data-reveal className="overflow-x-auto rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)]">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <caption className="sr-only">
                Feature comparison across the Starter, Growth and Secure Pro packages
              </caption>
              <thead>
                <tr className="border-b border-[var(--color-line)]">
                  <th scope="col" className="p-4 text-sm font-bold">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.id} scope="col" className="p-4 text-center text-sm font-bold">
                      {t.name}
                      {t.highlight && (
                        <span className="ms-1.5 align-middle text-[var(--color-brand)]">
                          <Icon name="star" size={12} className="inline" />
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((group) => (
                  <Fragment key={group.group}>
                    <tr className="bg-[var(--color-bg-soft)]">
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="p-3 px-4 text-xs font-bold uppercase tracking-wider text-muted"
                      >
                        {group.group}
                      </th>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-b border-[var(--color-line)] last:border-0">
                        <th scope="row" className="p-4 text-sm font-medium">{row.label}</th>
                        <td className="p-4 text-center"><Cell value={row.starter} /></td>
                        <td className="p-4 text-center"><Cell value={row.growth} /></td>
                        <td className="p-4 text-center"><Cell value={row.securePro} /></td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Estimator */}
      <Section id="estimator" labelledBy="estimator-heading" className="scroll-mt-24">
        <Container>
          <SectionHeading
            id="estimator-heading"
            eyebrow="Pricing estimator"
            title="Build your own estimate"
            subtitle="Tick what you need and see an indicative price straight away. Send it over and we'll turn it into a fixed quote."
          />
          <div data-reveal>
            <PricingEstimator />
          </div>
        </Container>
      </Section>

      {/* ROI */}
      <Section tone="soft" id="roi" labelledBy="roi-heading" className="scroll-mt-24">
        <Container>
          <SectionHeading
            id="roi-heading"
            eyebrow="ROI calculator"
            title="What is that admin time costing you?"
            subtitle="Move the sliders to your own numbers. It's your estimate, not ours."
          />
          <div data-reveal>
            <RoiCalculator />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" labelledBy="pricing-faq-heading" className="scroll-mt-24">
        <Container size="narrow">
          <SectionHeading
            id="pricing-faq-heading"
            eyebrow="Pricing questions"
            title="The money questions, answered"
          />
          <div data-reveal>
            <Accordion items={pricingFaqs} />
          </div>

          <div className="mt-12 text-center" data-reveal>
            <ButtonLink href="/contact" size="lg">
              Get a fixed written quote
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Suspense fallback={null} />

      <JsonLd
        data={[
          faqJsonLd(pricingFaqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Pricing", path: "/pricing" },
          ]),
        ]}
      />
    </>
  );
}
