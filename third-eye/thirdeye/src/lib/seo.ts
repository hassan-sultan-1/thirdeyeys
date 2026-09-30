/**
 * seo.ts — METADATA + STRUCTURED DATA HELPERS
 * One place to build page <title>, description, canonical URL,
 * Open Graph/Twitter cards and JSON-LD.
 */
import type { Metadata } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { generalFaqs } from "@/content/faqs";

/**
 * Canonical base URL.
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL   (set this in .env.local / your host)
 *   2. site.url from the content config
 *   3. http://localhost:3000  (development fallback)
 *
 * The placeholder "https://[your-domain.com]" is not a valid URL, so
 * we detect the brackets and fall back rather than crashing the build.
 */
function resolveBaseUrl() {
  const candidates = [process.env.NEXT_PUBLIC_SITE_URL, site.url];
  for (const candidate of candidates) {
    if (!candidate || candidate.includes("[")) continue;
    try {
      return new URL(candidate).origin;
    } catch {
      /* try the next candidate */
    }
  }
  const port = process.env.PORT || "3000";
  return `http://localhost:${port}`;
}

export const baseUrl = resolveBaseUrl();

export function pageMeta({
  title,
  description,
  path = "/",
  type = "website",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = `${baseUrl}${path}`;
  const ogImage = image || `${baseUrl}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_US",
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.seo.ogImageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [ogImage],
    },
  };
}

/* ---------------- JSON-LD builders ---------------- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: site.description,
    slogan: site.tagline,
    email: site.contact.email,
    telephone: site.contact.phone,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 3 },
    areaServed: "Worldwide (remote)",
    sameAs: site.social.map((s) => s.href).filter((h) => !h.startsWith("[")),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contact.email,
        telephone: site.contact.phone,
        availableLanguage: ["English", "Urdu"],
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: "en",
  };
}

export function servicesJsonLd() {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.short,
    url: `${baseUrl}/services#${s.slug}`,
    provider: { "@id": `${baseUrl}/#organization` },
    areaServed: "Worldwide (remote)",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Small businesses: restaurants, shops and clinics",
    },
  }));
}

export function faqJsonLd(items: { q: string; a: string }[] = generalFaqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${baseUrl}${t.path}`,
    })),
  };
}
