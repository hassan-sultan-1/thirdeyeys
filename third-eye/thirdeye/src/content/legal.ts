/**
 * legal.ts — TEMPLATE LEGAL TEXT
 * ---------------------------------------------------------------
 * ⚠️  IMPORTANT: this is a plain-language TEMPLATE, not legal advice.
 * Have a qualified professional review it before launch — especially
 * if you work with clinics or handle any health information.
 *
 * Blocks: "p" paragraph · "h2" heading · "ul" list · "note" callout
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string };

export type LegalDoc = {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  description: string;
  updated: string;
  intro: string;
  blocks: LegalBlock[];
};

export const legalDocs: LegalDoc[] = [
  /* ------------------------------------------------------------ */
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "What personal information we collect, why we collect it, how long we keep it and what rights you have.",
    updated: "[1 October 2026]",
    intro:
      "We collect as little as we can and explain all of it here in plain language. If anything is unclear, email us and we will answer properly.",
    blocks: [
      { type: "h2", text: "Who we are" },
      {
        type: "p",
        text: "[Third Eye Technologies] (\"we\", \"us\") builds websites, AI assistants and automations for small businesses. For questions about this policy or your data, contact [hello@your-domain.com]. Our registered address is [full business address].",
      },

      { type: "h2", text: "What we collect" },
      {
        type: "ul",
        items: [
          "Enquiry details you send us: your name, email address, and optionally your phone number, business name, industry, the services you are interested in, a rough budget and your message.",
          "Chat assistant messages: what you type into the assistant on this website, so it can answer you.",
          "Basic technical information: your IP address and browser type are processed briefly by our hosting provider for security, spam prevention and rate limiting.",
          "Analytics, only if you accept: aggregated, cookie-free page-view statistics. No profiles, no cross-site tracking, no advertising networks.",
        ],
      },
      {
        type: "note",
        text: "We do not ask for, and ask you not to send us, sensitive personal information through this website — that includes health details, patient records, ID or passport numbers, and payment card details.",
      },

      { type: "h2", text: "Why we collect it" },
      {
        type: "ul",
        items: [
          "To reply to your enquiry and prepare a quote (this is our legitimate interest in responding to a request you made).",
          "To provide the services you engage us for, under our contract with you.",
          "To keep this website secure and available — blocking spam and abuse (legitimate interest).",
          "To understand which pages are useful, where you have consented to analytics.",
        ],
      },
      {
        type: "p",
        text: "We never sell your data, never share it with advertisers, and never add you to a marketing list without you asking.",
      },

      { type: "h2", text: "How long we keep it" },
      {
        type: "ul",
        items: [
          "Enquiries that do not become projects: deleted after [12] months.",
          "Client records: kept for the length of our work together plus [7] years where tax or legal rules require it.",
          "Chat assistant messages: retained for up to [30] days for quality and safety review, then deleted.",
          "Server security logs: [30] days.",
        ],
      },

      { type: "h2", text: "Who else sees it" },
      {
        type: "p",
        text: "We use a small number of service providers who process data on our behalf under contract. As of the date above these are: [hosting provider, e.g. Vercel], [email delivery provider, e.g. Resend], [AI provider, e.g. OpenAI] and [analytics provider, if enabled]. Each is used only for the purpose described, and we choose providers that do not train models on customer data where that option exists.",
      },
      {
        type: "p",
        text: "Some providers are based outside your country. Where data is transferred internationally, it is covered by the provider's standard contractual clauses or equivalent safeguards.",
      },

      { type: "h2", text: "How we protect it" },
      {
        type: "p",
        text: "Traffic to this site is encrypted with HTTPS. Access to enquiries is limited to the people who need it, protected by individual accounts with two-factor authentication. Form input is validated on both the browser and the server, and the site sets strict security headers. Our full approach is described on the Security & Trust page.",
      },

      { type: "h2", text: "Your rights" },
      {
        type: "ul",
        items: [
          "Ask for a copy of the personal information we hold about you.",
          "Ask us to correct anything that is wrong.",
          "Ask us to delete it, where we are not legally required to keep it.",
          "Object to processing based on legitimate interest.",
          "Withdraw consent for analytics at any time by clearing this site's data in your browser.",
        ],
      },
      {
        type: "p",
        text: "Email [hello@your-domain.com] and we will respond within [30] days. If you are unhappy with our response you can complain to your local data protection authority [name of authority in your country].",
      },

      { type: "h2", text: "AI and your information" },
      {
        type: "p",
        text: "The assistant on this website sends your message to an AI provider so it can generate a reply. It is given our published business information only — it has no access to any customer database. Please do not type personal, medical or confidential details into it. For client projects that involve sensitive data, we use private or self-hosted AI, which we describe in the project agreement.",
      },

      { type: "h2", text: "Children" },
      {
        type: "p",
        text: "This website is aimed at business owners and is not intended for children under [16]. We do not knowingly collect information from children.",
      },

      { type: "h2", text: "Changes" },
      {
        type: "p",
        text: "If we change this policy we will update the date at the top. Material changes will be highlighted on this page for at least [30] days.",
      },
    ],
  },

  /* ------------------------------------------------------------ */
  {
    slug: "terms",
    title: "Terms of Service",
    description:
      "The terms for using this website and for engaging us on a project — written to be readable.",
    updated: "[1 October 2026]",
    intro:
      "These terms cover using this website and the basics of working with us. Your signed project agreement always takes priority over anything here.",
    blocks: [
      { type: "h2", text: "Using this website" },
      {
        type: "p",
        text: "You may use this website for lawful purposes. Please do not attempt to disrupt it, scrape it at scale, probe it for vulnerabilities without telling us first, or misuse the forms and assistant. Good-faith security research is welcome — see our security.txt for how to report findings responsibly.",
      },

      { type: "h2", text: "Information on this site" },
      {
        type: "p",
        text: "We work hard to keep this site accurate, but content is provided for general information. Prices shown are indicative placeholders and are not an offer. A binding price is the one in your written quote. Sample statistics are labelled as samples and do not represent client results.",
      },

      { type: "h2", text: "The AI assistant" },
      {
        type: "p",
        text: "The assistant is a convenience, not a contract. It can be wrong. It does not give medical, legal or financial advice, and nothing it says binds us. For anything that matters, speak to a person.",
      },

      { type: "h2", text: "Quotes, payment and scope" },
      {
        type: "ul",
        items: [
          "Quotes are valid for [30] days from issue.",
          "Standard payment terms are [50%] to begin and [50%] on launch, unless your agreement says otherwise.",
          "Monthly plans are billed in advance and can be cancelled with [30] days written notice.",
          "Work outside the agreed scope is quoted separately before it starts — never added to an invoice as a surprise.",
          "Late payment beyond [14] days may pause support and hosting services after we have warned you in writing.",
        ],
      },

      { type: "h2", text: "What you provide" },
      {
        type: "p",
        text: "You provide content, images, access to accounts and timely feedback. You confirm you have the right to use any material you give us. Projects can be delayed if content or approvals are outstanding, and we will tell you when that is happening.",
      },

      { type: "h2", text: "Ownership" },
      {
        type: "p",
        text: "On full payment, you own the design, content and custom code we build for you. We keep ownership of our generic tooling, libraries and internal components, and grant you a permanent licence to use them as part of your project. Third-party software remains under its own licence. We may describe the work in our portfolio only with your permission.",
      },

      { type: "h2", text: "Support and availability" },
      {
        type: "p",
        text: "Response times depend on your plan: [2] business days on Starter, [1] business day on Growth, [same day] on Secure Pro. We aim for high availability but cannot guarantee uninterrupted service, since hosting and third-party providers are outside our direct control.",
      },

      { type: "h2", text: "Limits of liability" },
      {
        type: "p",
        text: "We take security seriously, but no system is perfect and we cannot promise one is. To the maximum extent permitted by law, our total liability for any claim is limited to the fees you paid us in the [12] months before the claim. We are not liable for indirect or consequential losses such as lost profits. Nothing here limits liability for fraud, death or personal injury caused by negligence, or anything else that cannot legally be limited.",
      },

      { type: "h2", text: "Ending the relationship" },
      {
        type: "p",
        text: "Either of us can end a monthly plan with [30] days written notice. On ending, we hand over your files, content and access, and help you migrate for up to [5] hours at no extra cost. We will not hold your website or domain hostage, ever.",
      },

      { type: "h2", text: "Governing law" },
      {
        type: "p",
        text: "These terms are governed by the laws of [your country/jurisdiction], and disputes will be handled by the courts of [your city/jurisdiction]. We would much rather talk it through first.",
      },
      {
        type: "note",
        text: "Template text. Have a qualified lawyer in your jurisdiction review this before you rely on it.",
      },
    ],
  },

  /* ------------------------------------------------------------ */
  {
    slug: "cookies",
    title: "Cookie Notice",
    description:
      "This site needs no tracking cookies to work. Here is exactly what is stored on your device and why.",
    updated: "[1 October 2026]",
    intro:
      "Most websites open with a cookie banner because they load a dozen trackers. We do not. Here is the honest, short version.",
    blocks: [
      { type: "h2", text: "What we store on your device" },
      {
        type: "ul",
        items: [
          "theme — remembers whether you chose light or dark mode. Stored in your browser's local storage, never sent to us.",
          "cookie-consent — remembers your choice about analytics so we stop asking. Local storage, never sent to us.",
          "Short-lived security values used by our hosting provider to keep the site available and block abuse.",
        ],
      },
      {
        type: "p",
        text: "That is the complete list for a visitor who declines analytics. There are no advertising cookies, no social media pixels and no cross-site tracking on this website.",
      },

      { type: "h2", text: "If you accept analytics" },
      {
        type: "p",
        text: "We load a privacy-friendly analytics script ([e.g. Plausible or Umami]) that counts page views without cookies and without building a profile of you. It tells us which pages people find useful. It does not tell us who you are.",
      },

      { type: "h2", text: "Changing your mind" },
      {
        type: "p",
        text: "You can withdraw consent at any time by clearing this site's data in your browser settings — the banner will then ask you again. You can also block storage entirely; the website will still work, it will simply forget your theme choice.",
      },

      { type: "h2", text: "Third-party pages" },
      {
        type: "p",
        text: "If you click through to our booking calendar or a social profile, that provider's own cookie policy applies. We deliberately do not embed those services on our pages, so nothing of theirs loads until you choose to go there.",
      },

      { type: "h2", text: "Questions" },
      {
        type: "p",
        text: "Email [hello@your-domain.com] and a person will answer. More detail about data handling is in our Privacy Policy.",
      },
    ],
  },
];

export const getLegalDoc = (slug: string) => legalDocs.find((d) => d.slug === slug);
