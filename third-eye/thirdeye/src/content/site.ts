/**
 * site.ts — GLOBAL COMPANY CONFIG
 * ---------------------------------------------------------------
 * Edit everything about the company here: name, contact details,
 * navigation, social links and default SEO text.
 * Anything wrapped in [BRACKETS] is a placeholder you must replace.
 */

export const site = {
  name: "Third Eye",
  legalName: "[Third Eye Technologies]",
  tagline: "Smart systems. Serious security.",
  // Alternative taglines considered (swap in if you prefer):
  //  - "Secure AI for small business."
  //  - "See further. Stay protected."
  description:
    "We build secure, AI-powered digital systems for small businesses — professional websites, AI chat assistants, workflow automation and private AI, with cybersecurity built in from day one.",

  /** Public site URL. Used for canonical links, sitemap and Open Graph. */
  url: "https://[your-domain.com]",

  /** Contact details — replace all of these before launch. */
  contact: {
    email: "[hello@your-domain.com]",
    securityEmail: "[security@your-domain.com]",
    phone: "[+92 300 0000000]",
    /** Digits only, international format, no "+" — used to build the wa.me link. */
    whatsapp: "[923000000000]",
    location: "Fully remote — serving clients online",
    hours: "[Mon–Sat, 9am–7pm PKT]",
    /** Paste your Calendly / Cal.com / Google Calendar booking link here. */
    bookingUrl: "[https://calendly.com/your-handle/free-consultation]",
  },

  social: [
    { label: "LinkedIn", href: "[https://linkedin.com/company/your-page]" },
    { label: "Facebook", href: "[https://facebook.com/your-page]" },
    { label: "Instagram", href: "[https://instagram.com/your-handle]" },
    { label: "GitHub", href: "[https://github.com/your-org]" },
  ],

  /** Primary navigation. Order here = order in the navbar. */
  nav: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "Live Demos", href: "/demos" },
    { label: "Security", href: "/security" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
  ],

  footerNav: [
    {
      title: "Services",
      links: [
        { label: "Premium Websites", href: "/services#websites" },
        { label: "AI Chatbots & Support Agents", href: "/services#chatbots" },
        { label: "Workflow Automation", href: "/services#automation" },
        { label: "Private & Secure AI", href: "/services#private-ai" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Restaurants", href: "/industries?tab=restaurants" },
        { label: "Shops & Retail", href: "/industries?tab=shops" },
        { label: "Clinics", href: "/industries?tab=clinics" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About us", href: "/about" },
        { label: "Security & Trust", href: "/security" },
        { label: "Insights", href: "/blog" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/legal/privacy" },
        { label: "Terms of Service", href: "/legal/terms" },
        { label: "Cookie Notice", href: "/legal/cookies" },
        { label: "security.txt", href: "/.well-known/security.txt" },
      ],
    },
  ],

  /** Default SEO copy. Individual pages override the title/description. */
  seo: {
    titleTemplate: "%s | Third Eye",
    defaultTitle: "Third Eye — Secure, AI-powered systems for small business",
    keywords: [
      "small business website design",
      "AI chatbot for restaurants",
      "clinic appointment chatbot",
      "workflow automation for small business",
      "secure web development",
      "private AI for business",
    ],
    ogImageAlt: "Third Eye — secure, AI-powered digital systems for small businesses",
  },

  /**
   * i18n scaffolding. Urdu can be enabled later without restructuring:
   * set `enabled: true`, add a dictionary in src/content/i18n/ur.ts and
   * the <html> dir attribute flips to rtl automatically.
   */
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", label: "English", dir: "ltr" as const, enabled: true },
      { code: "ur", label: "اردو", dir: "rtl" as const, enabled: false },
    ],
  },
} as const;

/** Convenience: WhatsApp deep link with a friendly pre-filled message. */
export const whatsappLink = `https://wa.me/${site.contact.whatsapp.replace(
  /[^\d]/g,
  "",
)}?text=${encodeURIComponent(
  "Hi Third Eye — I'd like to ask about a website / AI assistant for my business.",
)}`;

export type Site = typeof site;
