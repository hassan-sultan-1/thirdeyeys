"use client";

/**
 * CookieBanner — consent gate for optional analytics.
 * ---------------------------------------------------------------
 * The site sets NO tracking cookies by default. This banner records
 * a single first-party preference in localStorage ("cookie-consent")
 * and only then allows the analytics script to load.
 * Declining is exactly as easy as accepting (a legal requirement in
 * several jurisdictions and simply the decent thing to do).
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Primitives";

const KEY = "cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) {
        // Small delay so it never competes with the hero for attention.
        const t = setTimeout(() => setVisible(true), 1200);
        return () => clearTimeout(t);
      }
    } catch {
      /* storage blocked — show nothing rather than nagging every load */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
    if (value === "accepted") {
      window.dispatchEvent(new CustomEvent("cookie-consent-granted"));
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="no-print fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl animate-fade-up rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-5 shadow-[var(--shadow-lift)] sm:inset-x-6 sm:bottom-6"
    >
      <h2 id="cookie-title" className="text-base font-bold">
        We keep cookies to a minimum
      </h2>
      <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-muted">
        This site needs no tracking cookies to work. With your permission we
        load privacy-friendly, cookie-free analytics so we can see which pages
        help people. No personal data, no advertising networks, no selling
        anything on. Read our{" "}
        <Link href="/legal/cookies" className="font-medium text-[var(--color-brand-ink)] underline underline-offset-4">
          cookie notice
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button type="button" onClick={() => decide("accepted")} className={buttonClass("primary", "sm")}>
          Accept analytics
        </button>
        <button type="button" onClick={() => decide("declined")} className={buttonClass("secondary", "sm")}>
          Decline
        </button>
      </div>
    </div>
  );
}
