/**
 * pricing.ts — ALL PRICING IN ONE PLACE
 * ---------------------------------------------------------------
 * Change every number your customers see from this single file:
 * package prices, comparison table, and the pricing estimator.
 * All figures are PLACEHOLDERS — replace them with your real prices.
 */

export const currency = {
  code: "USD",
  symbol: "$",
  /** Shown under prices. Set to "" to hide. */
  note: "Placeholder prices — replace in src/content/pricing.ts. Taxes not included.",
};

export type Tier = {
  id: "starter" | "growth" | "secure-pro";
  name: string;
  best: string;
  setup: number;
  monthly: number;
  blurb: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    best: "Best for a first professional website",
    setup: 900,
    monthly: 59,
    blurb:
      "Everything a small shop, café or single-room clinic needs to look credible online and collect enquiries.",
    features: [
      "Up to [5] page custom website",
      "Mobile-first, fast-loading build",
      "Contact form with spam protection",
      "Google Business profile setup",
      "SSL/HTTPS + weekly backups",
      "Basic SEO (titles, descriptions, sitemap)",
      "Email support, [2] business day response",
    ],
    cta: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    best: "Best for busy businesses losing time to admin",
    setup: 2400,
    monthly: 149,
    blurb:
      "The website plus an AI assistant and your first automations — built to save hours every week.",
    features: [
      "Everything in Starter",
      "Up to [12] pages",
      "AI chat assistant trained on your content",
      "Online booking / order enquiry flow",
      "[2] workflow automations (e.g. reminders, reports)",
      "Monthly performance + security report",
      "Priority support, [1] business day response",
    ],
    highlight: true,
    cta: "Choose Growth",
  },
  {
    id: "secure-pro",
    name: "Secure Pro",
    best: "Best for clinics and anyone handling sensitive data",
    setup: 4800,
    monthly: 299,
    blurb:
      "For businesses where confidentiality matters. Private AI, hardened hosting and ongoing monitoring.",
    features: [
      "Everything in Growth",
      "Unlimited pages within scope",
      "Private / self-hosted AI setup",
      "Role-based access control for your team",
      "Security review + prompt-injection testing",
      "Daily backups with restore testing",
      "Uptime + security monitoring with alerts",
      "Quarterly review call and roadmap",
    ],
    cta: "Talk about Secure Pro",
  },
];

/** Comparison table. Values: true | false | string. */
export const comparison: {
  group: string;
  rows: { label: string; starter: boolean | string; growth: boolean | string; securePro: boolean | string }[];
}[] = [
  {
    group: "Website",
    rows: [
      { label: "Custom design", starter: true, growth: true, securePro: true },
      { label: "Pages included", starter: "[5]", growth: "[12]", securePro: "Unlimited in scope" },
      { label: "Edit your own content", starter: true, growth: true, securePro: true },
      { label: "Multi-language ready (e.g. Urdu)", starter: false, growth: true, securePro: true },
    ],
  },
  {
    group: "AI",
    rows: [
      { label: "AI chat assistant", starter: false, growth: true, securePro: true },
      { label: "Booking / order capture in chat", starter: false, growth: true, securePro: true },
      { label: "WhatsApp or Messenger channel", starter: false, growth: "Add-on", securePro: true },
      { label: "Private / self-hosted AI", starter: false, growth: false, securePro: true },
    ],
  },
  {
    group: "Automation",
    rows: [
      { label: "Workflow automations", starter: false, growth: "[2]", securePro: "[6]" },
      { label: "Automatic reminders", starter: false, growth: true, securePro: true },
      { label: "Monthly reports", starter: false, growth: true, securePro: true },
    ],
  },
  {
    group: "Security & support",
    rows: [
      { label: "HTTPS, security headers, hardening", starter: true, growth: true, securePro: true },
      { label: "Backups", starter: "Weekly", growth: "Daily", securePro: "Daily + restore tests" },
      { label: "Access control for staff", starter: false, growth: true, securePro: "Role-based" },
      { label: "Security review before launch", starter: "Checklist", growth: "Checklist", securePro: "Full review" },
      { label: "Uptime & security monitoring", starter: false, growth: true, securePro: true },
      { label: "Support response", starter: "[2] days", growth: "[1] day", securePro: "[Same day]" },
    ],
  },
];

/**
 * PRICING ESTIMATOR CONFIG
 * The estimator adds a base price plus the options the visitor picks.
 * Every number here is a placeholder — tune to your real rates.
 */
export const estimator = {
  base: { setup: 600, monthly: 39, label: "Base project (design, setup, hosting config)" },
  perPage: { setup: 90, monthly: 3, label: "Per extra page" },
  pages: { min: 1, max: 20, default: 5 },
  options: [
    {
      id: "chatbot",
      label: "AI chat assistant",
      help: "Answers customer questions from your own content, 24/7.",
      setup: 800,
      monthly: 60,
    },
    {
      id: "booking",
      label: "Online booking / orders",
      help: "Let customers book a table, an appointment or place an order enquiry.",
      setup: 500,
      monthly: 25,
    },
    {
      id: "automation",
      label: "Workflow automation",
      help: "Reminders, reports and admin jobs handled automatically.",
      setup: 700,
      monthly: 45,
    },
    {
      id: "privateAi",
      label: "Private / secure AI",
      help: "For sensitive data: private hosting, access control, retention rules.",
      setup: 1600,
      monthly: 120,
    },
    {
      id: "multilingual",
      label: "Second language (e.g. Urdu)",
      help: "Full translation structure with right-to-left support.",
      setup: 450,
      monthly: 15,
    },
    {
      id: "monitoring",
      label: "Security monitoring & daily backups",
      help: "We watch uptime and threats, and test that backups actually restore.",
      setup: 250,
      monthly: 70,
    },
  ],
};

/** ROI calculator defaults (hours saved × hourly cost). */
export const roiDefaults = {
  hoursPerWeek: 6,
  hourlyCost: 12,
  staffCount: 2,
  currencySymbol: currency.symbol,
  note: "Sample figures. Your real numbers depend on your team and processes.",
};

/** Animated stats — clearly marked as sample data (no invented client claims). */
export const stats = [
  { value: 40, suffix: "%", label: "Fewer repeat phone questions", hint: "Typical target after launching an AI assistant" },
  { value: 6, suffix: " hrs", label: "Admin hours saved per week", hint: "Typical target for a first automation package" },
  { value: 2, prefix: "<", suffix: "s", label: "Page load on mobile", hint: "Performance budget we build to" },
  { value: 100, suffix: "%", label: "Sites launched with HTTPS & backups", hint: "Our own build standard" },
];
export const statsDisclaimer =
  "Sample and target figures for illustration — not client results. We do not publish testimonials or case studies until real clients approve them.";
