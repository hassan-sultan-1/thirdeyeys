/**
 * /contact — multi-step enquiry form, booking calendar, and every
 * other way to reach us.
 */
import type { Metadata } from "next";
import { Suspense } from "react";

import { site, whatsappLink } from "@/content/site";
import {
  Card,
  Container,
  Eyebrow,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/features/ContactForm";
import { BookingCta } from "@/components/features/BookingCta";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact & booking — free 30-minute consultation",
  description:
    "Book a free consultation or send us a message. We reply within one business day. WhatsApp, email and a booking calendar — whatever suits you.",
  path: "/contact",
});

export default function ContactPage() {
  const channels = [
    {
      icon: "whatsapp" as const,
      title: "WhatsApp",
      body: "Fastest for quick questions.",
      value: site.contact.whatsapp,
      href: whatsappLink,
      external: true,
    },
    {
      icon: "mail" as const,
      title: "Email",
      body: "Best for detail and attachments.",
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: "phone" as const,
      title: "Phone",
      body: site.contact.hours,
      value: site.contact.phone,
      href: `tel:${site.contact.phone.replace(/[^\d+]/g, "")}`,
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-10 sm:pt-20">
        <div aria-hidden className="absolute inset-0 grid-backdrop opacity-50" />
        <div aria-hidden className="aurora start-[-10%] top-[-20%] h-80 w-80 bg-teal-400/20" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow>Contact &amp; booking</Eyebrow>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
              Let&apos;s talk about{" "}
              <span className="text-gradient">what would help most</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Thirty minutes, online, no obligation. Tell us what is slow,
              broken or missing and we will tell you honestly what we would do
              about it — even if the answer is &ldquo;you don&apos;t need us for that&rdquo;.
            </p>
          </div>
        </Container>
      </section>

      {/* Form + side panel */}
      <Section className="pt-8" labelledBy="form-heading">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div>
              <h2 id="form-heading" className="sr-only">Send us a message</h2>
              <div data-reveal>
                <Suspense fallback={<div className="h-[36rem] rounded-2xl border border-[var(--color-line)]" aria-busy="true" />}>
                  <ContactForm />
                </Suspense>
              </div>
            </div>

            <div className="space-y-6 lg:sticky lg:top-24">
              <Card hover={false} data-reveal>
                <h2 className="text-lg font-bold">Other ways to reach us</h2>
                <ul className="mt-5 space-y-4">
                  {channels.map((c) => (
                    <li key={c.title}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-start gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-[var(--color-bg-soft)]"
                      >
                        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)]/12 text-[var(--color-brand-ink)]">
                          <Icon name={c.icon} size={18} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-bold">{c.title}</span>
                          <span className="block truncate text-sm text-[var(--color-brand-ink)]">
                            {c.value}
                          </span>
                          <span className="block text-xs text-muted">{c.body}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-[var(--color-line)] pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                    Follow along
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {site.social.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer me"
                          className="inline-block rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <Card hover={false} data-reveal data-reveal-index="1">
                <h2 className="flex items-center gap-2 text-lg font-bold">
                  <Icon name="clock" size={18} className="text-[var(--color-brand-ink)]" />
                  What happens next
                </h2>
                <ol className="mt-4 space-y-3">
                  {[
                    "We reply within one business day — a real person, not an autoresponder.",
                    "We send a couple of times for a 30-minute video call.",
                    "On the call we ask about your week, not your budget.",
                    "You get a short written plan with a fixed price. Then you decide.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-3 text-sm">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)]/12 text-xs font-bold text-[var(--color-brand-ink)]">
                        {i + 1}
                      </span>
                      <span className="text-muted">{s}</span>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card hover={false} className="border-[var(--color-brand)]/30 bg-[var(--color-brand)]/5" data-reveal data-reveal-index="2">
                <h2 className="flex items-center gap-2 text-sm font-bold">
                  <Icon name="lock" size={16} className="text-[var(--color-brand-ink)]" />
                  Your details are safe here
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  This form is validated on both sides, protected against spam,
                  and sent over HTTPS. We only use what you send to reply to
                  you — no marketing lists, no sharing, no selling. Please
                  don&apos;t include sensitive personal or patient information.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Booking calendar */}
      <Section tone="soft" id="booking" className="scroll-mt-24" labelledBy="booking-heading">
        <Container size="narrow">
          <SectionHeading
            id="booking-heading"
            eyebrow="Booking calendar"
            title="Or just grab a slot"
            subtitle="Pick a time that suits you and we'll send the video link. No form needed."
          />
          <div data-reveal>
            <BookingCta />
          </div>
        </Container>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}
