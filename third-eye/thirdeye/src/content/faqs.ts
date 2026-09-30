/**
 * faqs.ts — FREQUENTLY ASKED QUESTIONS
 * `general` powers the home page preview + FAQ structured data.
 * `pricing` powers the FAQ block on the pricing page.
 */

export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "How long does a project take?",
    a: "A Starter website is usually live in [2–3 weeks]. Adding an AI assistant takes about [1–2 weeks] more, and private AI work takes [3–5 weeks]. We give you a date in writing before we start.",
  },
  {
    q: "Do I need to be technical?",
    a: "No. We handle the technical side and explain decisions in plain language. At the end we train you and your staff on the few things you will want to change yourself, like menu items or opening hours.",
  },
  {
    q: "Who owns the website and the content?",
    a: "You do. The design, content and code we build for you are yours. We can hand over the domain, hosting and repository at any time.",
  },
  {
    q: "Will the AI assistant make things up?",
    a: "We build it to answer only from the information you give us. If it is asked something outside that, it says it is not sure and offers to connect the customer to a human. We review real questions every month and improve the answers.",
  },
  {
    q: "Is my customer data safe?",
    a: "We collect as little as possible, encrypt it in transit and at rest, control who can access it, and delete it on a schedule. See the Security & Trust page for exactly how, in plain language.",
  },
  {
    q: "Do you work with businesses outside your city?",
    a: "Yes. We are a fully online team and work with clients remotely by video call, email and WhatsApp.",
  },
  {
    q: "What if I already have a website?",
    a: "We can improve what you have or rebuild it. The free consultation includes an honest opinion on which is cheaper for you — sometimes keeping your current site and adding an assistant is the better deal.",
  },
  {
    q: "Do you offer refunds?",
    a: "Projects are milestone-based, so you approve and pay in stages. Monthly plans can be cancelled with [30] days notice. Full terms are on the Terms page.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why is there a setup fee and a monthly fee?",
    a: "The setup fee covers building the thing. The monthly fee covers keeping it alive and safe: hosting, updates, backups, monitoring, small content changes and support.",
  },
  {
    q: "Can I pay the setup fee in instalments?",
    a: "Yes. Standard split is [50%] to start and [50%] at launch. Larger projects can be split across milestones.",
  },
  {
    q: "What is not included?",
    a: "Third-party costs are separate and billed at cost: your domain name, any paid software you choose, payment gateway fees, stock photography and AI usage above the fair-use limit in your plan.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes, up or down, at the start of any month. Moving up only costs the difference in setup work for the new features.",
  },
  {
    q: "What happens if I cancel the monthly plan?",
    a: "You keep your website and content. We hand over the files, help you move to your own hosting, and stop billing after the notice period. Nothing is held hostage.",
  },
  {
    q: "Are these prices final?",
    a: "The prices shown are placeholders while the site is being set up. Use the estimator for a ballpark, then book a free consultation for a fixed written quote.",
  },
];
