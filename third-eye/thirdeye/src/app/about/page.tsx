/**
 * /about — mission, story, values, team and approach.
 * Team members are placeholders in src/content/about.ts.
 */
import type { Metadata } from "next";
import Image from "next/image";

import { about } from "@/content/about";
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
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About us — a three-person, fully remote studio",
  description:
    "Who we are, what we believe, and how we work. A small online team building secure, AI-powered systems for small businesses.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>About Third Eye</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Small team. <span className="text-gradient">Serious standards.</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{about.mission}</p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <Section className="pt-8" labelledBy="story-heading">
        <Container size="narrow">
          <h2 id="story-heading" className="sr-only">Our story</h2>
          <div className="space-y-5" data-reveal>
            {about.story.map((p, i) => (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-xl leading-relaxed font-medium"
                    : "text-[1.05rem] leading-relaxed text-muted"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section tone="soft" labelledBy="values-heading">
        <Container>
          <SectionHeading id="values-heading" eyebrow="What we believe" title="Four things we will not compromise on" />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Card as="li" key={v.title} data-reveal data-reveal-index={i}>
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                  <Icon name="check" size={20} />
                </span>
                <h3 className="text-base font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
              </Card>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Team */}
      <Section labelledBy="team-heading">
        <Container>
          <SectionHeading
            id="team-heading"
            eyebrow="The team"
            title="Three people, and you talk to all of them"
            subtitle="No account managers, no handoffs to a junior after you sign."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {about.team.map((m, i) => (
              <Card as="li" key={m.name} data-reveal data-reveal-index={i} className="text-center">
                {m.photo ? (
                  <Image
                    src={m.photo}
                    alt={`Portrait of ${m.name}`}
                    width={96}
                    height={96}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden
                    className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand)]/25 to-violet-500/25 font-[family-name:var(--font-heading)] text-2xl font-bold text-[var(--color-brand-ink)]"
                  >
                    {m.initials}
                  </span>
                )}
                <h3 className="mt-5 text-lg font-bold">{m.name}</h3>
                <p className="text-sm font-medium text-[var(--color-brand-ink)]">{m.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{m.bio}</p>
                <ul className="mt-4 flex justify-center gap-3">
                  {m.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-muted underline underline-offset-4 transition-colors hover:text-[var(--color-brand-ink)]"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-muted">
            Team details are placeholders — replace them in
            <code className="mx-1 rounded bg-[var(--color-bg-soft)] px-1.5 py-0.5">src/content/about.ts</code>
            before launch.
          </p>
        </Container>
      </Section>

      {/* Approach */}
      <Section tone="soft" labelledBy="approach-heading">
        <Container>
          <SectionHeading id="approach-heading" eyebrow="Our approach" title="How a project actually runs" />
          <ol className="grid gap-6 md:grid-cols-2">
            {about.approach.map((a, i) => (
              <li key={a.title} data-reveal data-reveal-index={i} className="surface flex gap-5 rounded-2xl p-6">
                <span className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[var(--color-brand)]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CTA */}
      <Section labelledBy="about-cta">
        <Container size="narrow" className="text-center">
          <h2 id="about-cta" className="text-3xl font-bold" data-reveal>
            Work with people who pick up the phone
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted" data-reveal data-reveal-index="1">
            We are online {site.contact.hours}. The free consultation is a real
            conversation, not a pitch deck.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row" data-reveal data-reveal-index="2">
            <ButtonLink href="/contact" size="lg">
              Book free consultation
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
            <ButtonLink href="/blog" variant="secondary" size="lg">
              Read our insights
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
