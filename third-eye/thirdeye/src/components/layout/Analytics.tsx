"use client";

/**
 * Analytics — consent-gated, privacy-friendly analytics loader.
 * ---------------------------------------------------------------
 * Nothing loads unless BOTH are true:
 *   1. NEXT_PUBLIC_ANALYTICS_SRC is set (e.g. a Plausible/Umami script)
 *   2. the visitor accepted analytics in the cookie banner
 *
 * Swap in any provider you like — the rest of the app only ever calls
 * track() from src/lib/analytics.ts.
 */
import Script from "next/script";
import { useEffect, useState } from "react";

const SRC = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
const DOMAIN = process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN;

export function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        setAllowed(localStorage.getItem("cookie-consent") === "accepted");
      } catch {
        setAllowed(false);
      }
    };
    check();
    window.addEventListener("cookie-consent-granted", check);
    return () => window.removeEventListener("cookie-consent-granted", check);
  }, []);

  if (!SRC || !allowed) return null;

  return (
    <Script
      src={SRC}
      data-domain={DOMAIN}
      strategy="afterInteractive"
      defer
    />
  );
}
