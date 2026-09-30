/**
 * analytics.ts — PRIVACY-FRIENDLY ANALYTICS PLACEHOLDER
 * ---------------------------------------------------------------
 * No tracker is loaded unless you set NEXT_PUBLIC_ANALYTICS_SRC
 * (e.g. a self-hosted Plausible or Umami script). Nothing here sets
 * cookies or sends personal data.
 *
 * `track()` is a thin wrapper so conversion events are named in one
 * place. It no-ops safely when no provider is configured.
 */

export type EventName =
  | "cta_click"
  | "contact_form_start"
  | "contact_form_step"
  | "contact_form_submit"
  | "contact_form_error"
  | "booking_click"
  | "whatsapp_click"
  | "chat_opened"
  | "chat_message_sent"
  | "demo_selected"
  | "quiz_completed"
  | "estimator_quote_requested"
  | "pricing_tier_selected";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    umami?: { track: (event: string, data?: Props) => void };
    dataLayer?: unknown[];
  }
}

export function track(event: EventName, props: Props = {}) {
  if (typeof window === "undefined") return;
  try {
    // Plausible (cookie-free, GDPR friendly)
    window.plausible?.(event, { props });
    // Umami (cookie-free, self-hostable)
    window.umami?.track(event, props);
    // GTM / GA4 — only fires if you add the tag yourself
    window.dataLayer?.push({ event, ...props });

    if (process.env.NODE_ENV === "development") {
      console.debug("[analytics]", event, props);
    }
  } catch {
    /* analytics must never break the page */
  }
}
