/**
 * Footer — sitemap-style navigation, contact details and legal links.
 * Server component: no client JS.
 */
import Link from "next/link";
import { site, whatsappLink } from "@/content/site";
import { LogoLockup } from "./Logo";
import { Container } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-[var(--color-line)] bg-[var(--color-bg-soft)]">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand block */}
          <div className="max-w-sm">
            <LogoLockup />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-4 text-sm font-semibold text-[var(--color-brand-ink)]">
              {site.tagline}
            </p>

            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[var(--color-brand-ink)]"
                >
                  <Icon name="mail" size={16} /> {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[var(--color-brand-ink)]"
                >
                  <Icon name="phone" size={16} /> {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-[var(--color-brand-ink)]"
                >
                  <Icon name="whatsapp" size={16} /> WhatsApp us
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-muted">
                <Icon name="globe" size={16} /> {site.contact.location}
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {site.footerNav.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider">{col.title}</h2>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-[var(--color-brand-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--color-line)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            © {year} {site.legalName}. All rights reserved. Built secure by default.
          </p>
          <ul className="flex flex-wrap items-center gap-4">
            {site.social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-xs font-medium text-muted transition-colors hover:text-[var(--color-brand-ink)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
