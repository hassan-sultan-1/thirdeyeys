/**
 * /blog — Insights index.
 */
import type { Metadata } from "next";
import Link from "next/link";

import { posts } from "@/content/posts";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = pageMeta({
  title: "Insights — practical advice for small business owners",
  description:
    "Short, jargon-free articles on website security, AI assistants and privacy — written for people who run restaurants, shops and clinics.",
  path: "/blog",
});

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Insights</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Useful things, <span className="text-gradient">plainly written</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              No hype and no scare tactics. Just what we would tell a friend who
              runs a small business.
            </p>
          </div>
        </Container>
      </section>

      <Section className="pt-8">
        <Container>
          <ul className="grid gap-6 md:grid-cols-3">
            {sorted.map((post, i) => (
              <Card as="li" key={post.slug} data-reveal data-reveal-index={i} className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Badge tone="brand">{post.category}</Badge>
                  <span className="text-xs text-muted">{post.readingTime}</span>
                </div>

                <h2 className="mt-4 text-xl font-bold leading-snug">
                  <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-[var(--color-brand-ink)]">
                    {/* Stretch the link across the card for easier tapping */}
                    <span className="absolute inset-0" aria-hidden />
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[var(--color-line)] pt-4 text-xs text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="inline-flex items-center gap-1 font-semibold text-[var(--color-brand-ink)]">
                    Read <Icon name="arrow-right" size={14} />
                  </span>
                </div>
              </Card>
            ))}
          </ul>

          <p className="mt-10 text-center text-sm text-muted">
            These are placeholder articles — edit or replace them in{" "}
            <code className="rounded bg-[var(--color-bg-soft)] px-1.5 py-0.5">src/content/posts.ts</code>.
          </p>
        </Container>
      </Section>

      <Section tone="soft">
        <Container size="narrow" className="text-center">
          <h2 className="text-3xl font-bold" data-reveal>
            Rather just ask us directly?
          </h2>
          <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted" data-reveal data-reveal-index="1">
            The free consultation covers whatever is on your mind — no article
            required.
          </p>
          <div className="mt-8" data-reveal data-reveal-index="2">
            <ButtonLink href="/contact" size="lg">
              Book free consultation
              <Icon name="arrow-right" size={18} />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog" },
        ])}
      />
    </>
  );
}
