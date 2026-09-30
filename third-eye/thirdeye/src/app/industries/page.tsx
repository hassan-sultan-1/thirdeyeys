/**
 * /industries — one tab per industry, deep-linkable as
 * /industries?tab=clinics (the Tabs component keeps the URL in sync).
 */
import type { Metadata } from "next";
import { Suspense } from "react";

import { industries } from "@/content/industries";
import {
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { Tabs } from "@/components/ui/Tabs";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Industries — restaurants, shops and clinics",
  description:
    "Typical problems and practical solutions for restaurants, retail shops and clinics. Clinic assistants handle scheduling and information only — never medical advice.",
  path: "/industries",
});

function IndustryPanel({ slug }: { slug: string }) {
  const ind = industries.find((i) => i.slug === slug)!;
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{ind.headline}</h2>
        <p className="mt-4 leading-relaxed text-muted">{ind.intro}</p>

        <h3 className="mt-8 text-sm font-bold uppercase tracking-wider">
          What usually goes wrong
        </h3>
        <ul className="mt-4 space-y-2.5">
          {ind.problems.map((p) => (
            <li key={p} className="flex items-start gap-2.5 text-sm">
              <Icon name="x" size={16} className="mt-0.5 shrink-0 text-rose-500" />
              <span className="text-muted">{p}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-2xl border border-[var(--color-brand)]/30 bg-[var(--color-brand)]/6 p-5">
          <h3 className="text-sm font-bold uppercase tracking-wider">Our solution</h3>
          <p className="mt-2.5 leading-relaxed text-muted">{ind.solution}</p>
        </div>

        {ind.note && (
          <div className="mt-6 rounded-2xl border border-amber-500/35 bg-amber-500/8 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <Icon name="alert" size={15} /> Safety boundary
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed">{ind.note}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?industry=${ind.slug}`}>
            Talk about my {ind.slug === "clinics" ? "clinic" : ind.slug === "shops" ? "shop" : "restaurant"}
            <Icon name="arrow-right" size={18} />
          </ButtonLink>
          <ButtonLink href={`/demos?niche=${ind.slug}`} variant="secondary">
            <Icon name="play" size={16} />
            Try the {ind.slug === "clinics" ? "clinic" : ind.slug === "shops" ? "shop" : "restaurant"} demo
          </ButtonLink>
        </div>
      </div>

      <Card hover={false} className="lg:sticky lg:top-24">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
          <Icon name={ind.icon} size={24} />
        </span>
        <h3 className="mt-4 text-lg font-bold">Example features</h3>
        <p className="mt-1 text-sm text-muted">
          A typical build for a business like yours.
        </p>
        <ul className="mt-5 space-y-3">
          {ind.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[var(--color-brand-ink)]" />
              <span className="text-muted">{f}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export default function IndustriesPage() {
  const tabItems = industries.map((ind) => ({
    id: ind.slug,
    label: ind.name,
    icon: <Icon name={ind.icon} size={17} />,
    panel: <IndustryPanel slug={ind.slug} />,
  }));

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Industries</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              We build for <span className="text-gradient">three kinds of business</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Because knowing an industry well beats knowing every industry
              badly. Pick yours to see the typical problems and what we do
              about them.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-6">
        <Container>
          <Suspense fallback={<div className="h-96" aria-busy="true" />}>
            <Tabs items={tabItems} ariaLabel="Choose your industry" />
          </Suspense>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />
    </>
  );
}
