/**
 * /blog/[slug] — a single article.
 * Content comes from structured blocks (never raw HTML), so there is
 * no dangerouslySetInnerHTML anywhere in the article rendering path.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPost, posts, type Block } from "@/content/posts";
import { site } from "@/content/site";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  JsonLd,
  Section,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { baseUrl, breadcrumbJsonLd, pageMeta } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

/** Pre-render every article at build time. */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return pageMeta({ title: "Article not found", description: "", path: "/blog" });
  return pageMeta({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    type: "article",
  });
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-bold text-[var(--color-ink)]">{block.text}</h2>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 ps-6">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="border-s-4 border-[var(--color-brand)] bg-[var(--color-bg-soft)] p-5 text-[1.05rem] font-medium italic text-[var(--color-ink)]">
          {block.text}
        </blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: site.name, url: baseUrl },
    publisher: { "@id": `${baseUrl}/#organization` },
    mainEntityOfPage: `${baseUrl}/blog/${post.slug}`,
    inLanguage: "en",
  };

  return (
    <>
      <article>
        <section className="relative overflow-hidden pt-14 pb-8 sm:pt-16">
          <div aria-hidden className="absolute inset-0 grid-backdrop opacity-40" />
          <Container size="narrow" className="relative">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-[var(--color-brand-ink)]"
            >
              <Icon name="arrow-right" size={14} className="rotate-180" />
              All insights
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Badge tone="brand">{post.category}</Badge>
              <span className="text-sm text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime}
              </span>
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{post.description}</p>
            <p className="mt-6 border-t border-[var(--color-line)] pt-5 text-sm text-muted">
              Written by <span className="font-semibold text-[var(--color-ink)]">{post.author}</span>
            </p>
          </Container>
        </section>

        <Section className="pt-4">
          <Container size="narrow">
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-muted">
              {post.blocks.map((block, i) => (
                <BlockRenderer key={i} block={block} />
              ))}
            </div>

            <Card hover={false} className="mt-14 border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5 text-center">
              <h2 className="text-2xl font-bold">Want a second opinion on your setup?</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                Book a free 30-minute consultation. We&apos;ll tell you what is
                fine, what needs work, and what you can safely ignore.
              </p>
              <ButtonLink href="/contact" className="mt-6">
                Book free consultation
                <Icon name="arrow-right" size={18} />
              </ButtonLink>
            </Card>
          </Container>
        </Section>
      </article>

      {others.length > 0 && (
        <Section tone="soft" labelledBy="more-heading">
          <Container size="narrow">
            <h2 id="more-heading" className="mb-6 text-2xl font-bold">Keep reading</h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {others.map((p) => (
                <Card as="li" key={p.slug} className="relative">
                  <Badge tone="neutral">{p.category}</Badge>
                  <h3 className="mt-3 text-lg font-bold leading-snug">
                    <Link href={`/blog/${p.slug}`} className="transition-colors hover:text-[var(--color-brand-ink)]">
                      <span className="absolute inset-0" aria-hidden />
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
                </Card>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
    </>
  );
}
