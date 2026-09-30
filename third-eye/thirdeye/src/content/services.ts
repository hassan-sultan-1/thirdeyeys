/**
 * services.ts — SERVICE CONTENT
 * Edit the four service offerings here. Used on the home page cards,
 * the /services page and the Service structured data (JSON-LD).
 */

export type Service = {
  slug: string;
  icon: "globe" | "chat" | "flow" | "shield";
  title: string;
  short: string;
  what: string;
  includes: string[];
  benefits: string[];
  timeline: string;
  startingAt: string;
};

export const services: Service[] = [
  {
    slug: "websites",
    icon: "globe",
    title: "Premium Websites",
    short:
      "A fast, good-looking website that works on every phone and turns visitors into customers.",
    what: "We design and build your website from scratch — no clunky templates. It loads fast, reads well on a phone, and is written to get people to call, book or order. You get a simple way to edit your own text and photos.",
    includes: [
      "Custom design matched to your brand",
      "Mobile-first build (phone, tablet, desktop)",
      "Up to [5] pages on Starter — more on larger plans",
      "Contact, booking and enquiry forms with spam protection",
      "Google Business and local search setup",
      "Speed, accessibility and SEO basics done properly",
      "SSL/HTTPS, secure hosting setup and automatic backups",
      "Training session so your team can update content",
    ],
    benefits: [
      "Look as professional online as you do in person",
      "Get found on Google by people searching nearby",
      "Fewer phone calls for questions your site already answers",
      "Pages that load in under [2] seconds, even on mobile data",
    ],
    timeline: "Typically [2–3 weeks] from kickoff to launch.",
    startingAt: "Starter package",
  },
  {
    slug: "chatbots",
    icon: "chat",
    title: "AI Chatbots & Support Agents",
    short:
      "A friendly assistant on your website that answers questions and takes bookings 24/7.",
    what: "We train an AI assistant on your own information — your menu, opening hours, prices, services, policies. It answers customers instantly, day or night, and hands over to a human when it should. It only uses what you give it, so it does not make things up.",
    includes: [
      "Assistant trained on your menu, services, hours and FAQs",
      "Website chat widget matched to your brand",
      "Booking and enquiry capture straight into your inbox",
      "Human handover rules and 'I don't know' safety answers",
      "Optional WhatsApp or Facebook Messenger connection",
      "Monthly review of real questions so answers keep improving",
      "Conversation logs kept to a minimum and access-controlled",
    ],
    benefits: [
      "Answer customers at 11pm without staying up",
      "Cut repeat questions to staff by a large margin",
      "Capture enquiries you currently miss when the phone is busy",
      "Every conversation is a free lesson about your customers",
    ],
    timeline: "Typically [1–2 weeks] once your content is ready.",
    startingAt: "Growth package",
  },
  {
    slug: "automation",
    icon: "flow",
    title: "Workflow Automation",
    short:
      "Stop retyping the same information. We connect your tools so the admin runs itself.",
    what: "We look at the small repetitive jobs that eat your week — copying bookings into a spreadsheet, chasing confirmations, sending reminders, building the same report every Monday — and we automate them. You keep control and approval; the typing goes away.",
    includes: [
      "Half-day process review to find the best wins",
      "Automations for bookings, reminders, invoices and reports",
      "Connections between your existing tools (sheets, email, POS, calendar)",
      "Alerts when something needs a human decision",
      "Plain-English documentation of every automation",
      "Safe rollback and logging so nothing happens silently",
    ],
    benefits: [
      "Save hours of admin every week (try the ROI calculator)",
      "Fewer no-shows thanks to automatic reminders",
      "Fewer human errors in orders, bookings and invoices",
      "Your team spends time on customers, not on copy-paste",
    ],
    timeline: "Typically [1–3 weeks] per workflow, depending on the tools.",
    startingAt: "Growth package",
  },
  {
    slug: "private-ai",
    icon: "shield",
    title: "Private & Secure AI",
    short:
      "AI that works with sensitive information without sending it where it should not go.",
    what: "If you handle patient details, customer records or anything confidential, a public AI tool is the wrong place for it. We set up AI that runs in a private, access-controlled environment, with clear rules about what data it can see, where it is stored and how long it is kept.",
    includes: [
      "Data-flow review: what leaves your building and what never should",
      "Private or self-hosted AI setup, or a locked-down provider account",
      "Role-based access so staff only see what they need",
      "Encryption in transit and at rest, with key handling documented",
      "Prompt-injection and data-leak testing before go-live",
      "Retention and deletion policy written in plain language",
      "Staff guidance: what is safe to paste into AI and what is not",
    ],
    benefits: [
      "Use AI without gambling with client confidentiality",
      "A written, defensible answer when a customer asks 'is my data safe?'",
      "Reduce the risk of staff pasting private data into public chatbots",
      "Foundations that hold up if you are ever audited",
    ],
    timeline: "Typically [3–5 weeks], depending on your data and systems.",
    startingAt: "Secure Pro package",
  },
];

/** The 4-step process shown on the home page. */
export const processSteps = [
  {
    step: "01",
    title: "Free consultation",
    body: "A 30-minute call. You tell us what is slow, broken or missing. We tell you honestly what would help most — and what you do not need to buy.",
  },
  {
    step: "02",
    title: "Plan & fixed quote",
    body: "You get a short written plan: what we will build, what it costs, and when it will be live. No hourly surprises.",
  },
  {
    step: "03",
    title: "Build & secure",
    body: "We design, build and test. Security checks and accessibility checks happen during the build, not as an afterthought.",
  },
  {
    step: "04",
    title: "Launch & support",
    body: "We launch, train your team, and stay on for monitoring, backups and improvements on your monthly plan.",
  },
];

/** "Why choose us" pillars (home page). */
export const whyUs = [
  {
    title: "Security is not an add-on",
    body: "Our background is in cybersecurity and information assurance. Secure defaults, encryption, backups and access control are included in every build — not sold as an upgrade.",
  },
  {
    title: "AI that stays on topic",
    body: "Your assistant answers from your own content. When it does not know something, it says so and offers a human. No invented prices, no invented promises.",
  },
  {
    title: "Plain language, fixed prices",
    body: "No jargon and no open-ended invoices. You see the price before we start, and you own everything we build for you.",
  },
  {
    title: "Small team, direct access",
    body: "Three people, fully online. You talk to the person doing the work — not an account manager reading a script.",
  },
];
