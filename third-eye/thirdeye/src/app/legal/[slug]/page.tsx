/**
 * /legal/[slug] — privacy, terms and cookie notice.
 * All text lives in src/content/legal.ts so a lawyer can review one
 * file instead of hunting through components.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getLegalDoc, legalDocs, type LegalBlock } from "@/content/legal";
import {
  Container,
  Eyebrow,
  JsonLd,
  Section,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) return pageMeta({ title: "Not found", description: "", path: "/legal" });
  return {
    ...pageMeta({
      title: doc.title,
      description: doc.description,
      path: `/legal/${doc.slug}`,
    }),
    robots: { index: true, follow: true },
  };
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-bold text-[var(--color-ink)]">{block.text}</h2>;
    case "ul":
      return (
        <ul className="list-disc space-y-2 ps-6">
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      );
    case "note":
      return (
        <div className="rounded-xl border border-amber-500/35 bg-amber-500/8 p-5">
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--color-ink)]">
            <Icon name="alert" size={17} className="mt-0.5 shrink-0" />
            {block.text}
          </p>
        </div>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = getLegalDoc(slug);
  if (!doc) notFound();

  return (
    <>
      <section className="pt-14 pb-6 sm:pt-16">
        <Container size="narrow">
          <Eyebrow>Legal</Eyebrow>
          <h1 className="text-4xl font-bold sm:text-5xl">{doc.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{doc.intro}</p>
          <p className="mt-4 text-sm text-muted">Last updated: {doc.updated}</p>

          <nav aria-label="Legal documents" className="mt-8 flex flex-wrap gap-2">
            {legalDocs.map((d) => (
              <Link
                key={d.slug}
                href={`/legal/${d.slug}`}
                aria-current={d.slug === doc.slug ? "page" : undefined}
                className={
                  d.slug === doc.slug
                    ? "rounded-full border border-[var(--color-brand)] bg-[var(--color-brand)]/10 px-4 py-2 text-sm font-semibold text-[var(--color-brand-ink)]"
                    : "rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
                }
              >
                {d.title}
              </Link>
            ))}
          </nav>
        </Container>
      </section>

      <Section className="pt-4">
        <Container size="narrow">
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-muted">
            {doc.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-soft)] p-6">
            <p className="text-sm leading-relaxed text-muted">
              <strong className="text-[var(--color-ink)]">Template notice:</strong>{" "}
              this document is a plain-language template provided with the
              website build. It is not legal advice. Please have a qualified
              professional in your jurisdiction review it — and replace every
              value in [brackets] — before launch.
            </p>
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: doc.title, path: `/legal/${doc.slug}` },
        ])}
      />
    </>
  );
}
