"use client";

/**
 * BookingCta — the booking calendar block.
 * ---------------------------------------------------------------
 * By default this shows a privacy-friendly CARD that links out to
 * your scheduler (Calendly, Cal.com, Google Appointments…). We do
 * NOT embed a third-party iframe by default, because that would
 * load their scripts and cookies for every visitor and weaken the
 * Content Security Policy.
 *
 * To embed instead: set your scheduler URL in src/content/site.ts,
 * flip EMBED to true below, and add the scheduler's origin to
 * `frame-src` in src/middleware.ts.
 */
import { site } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { buttonClass, Card } from "@/components/ui/Primitives";
import { track } from "@/lib/analytics";

const EMBED = false; // ← set to true once you've allowed the origin in the CSP

export function BookingCta() {
  const url = site.contact.bookingUrl;
  const configured = !url.startsWith("[");

  if (EMBED && configured) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[var(--color-line)]">
        <iframe
          src={url}
          title="Booking calendar"
          loading="lazy"
          className="h-[44rem] w-full border-0"
        />
      </div>
    );
  }

  return (
    <Card hover={false} className="overflow-hidden p-0">
      <div className="grid sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-center justify-center bg-navy-900 p-8 text-teal-300 dark:bg-navy-950">
          <Icon name="calendar" size={56} />
        </div>
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-bold">Free 30-minute consultation</h3>
          <ul className="mt-4 space-y-2">
            {[
              "Online video call — no travel, no pressure",
              "We ask what takes up your week, not what you'd spend",
              "You leave with a clear recommendation, free either way",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Icon name="check" size={15} className="mt-1 shrink-0 text-[var(--color-brand-ink)]" />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>

          {configured ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("booking_click", { location: "booking_section" })}
              className={buttonClass("primary", "md", "mt-6")}
            >
              <Icon name="calendar" size={18} />
              Choose a time
              <Icon name="external" size={15} />
            </a>
          ) : (
            <div className="mt-6 rounded-xl border border-dashed border-[var(--color-line)] p-4">
              <p className="text-sm font-medium">Booking link not set yet</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Add your Calendly or Cal.com URL to{" "}
                <code className="rounded bg-[var(--color-bg-soft)] px-1.5 py-0.5">
                  site.contact.bookingUrl
                </code>{" "}
                in <code className="rounded bg-[var(--color-bg-soft)] px-1.5 py-0.5">src/content/site.ts</code>.
                Until then, visitors can use the form above.
              </p>
            </div>
          )}

          <p className="mt-4 text-xs text-muted">
            Opens your scheduler in a new tab. We don&apos;t embed third-party
            scripts on this page, so nothing tracks you before you click.
          </p>
        </div>
      </div>
    </Card>
  );
}
