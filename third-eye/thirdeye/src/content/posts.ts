/**
 * posts.ts — INSIGHTS / BLOG
 * Placeholder posts. Content is stored as structured blocks (not raw HTML)
 * so nothing is ever injected with dangerouslySetInnerHTML.
 *
 * Block types: "p" (paragraph), "h2" (section heading), "ul" (bullet list),
 * "quote" (callout box).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  readingTime: string;
  category: string;
  author: string;
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "5-signs-your-small-business-website-is-unsafe",
    title: "5 signs your small business website is unsafe",
    description:
      "You don't need to be technical to spot the warning signs. Here are five you can check in ten minutes.",
    date: "2026-09-02",
    readingTime: "5 min read",
    category: "Security",
    author: "[Team Member One]",
    blocks: [
      {
        type: "p",
        text: "Most small business websites are not attacked by a determined hacker. They are swept up by automated scanners looking for the easy stuff — an old plugin, a shared password, a form with no protection. The fixes are usually cheap. The damage is not.",
      },
      { type: "h2", text: "1. There is no padlock in the address bar" },
      {
        type: "p",
        text: "If your site loads on http rather than https, everything sent between your visitor and your site travels in the open — including anything typed into a contact form. Browsers now warn visitors about this, which costs you enquiries as well as safety.",
      },
      {
        type: "p",
        text: "Fix: a certificate is free with almost every host and takes about an hour to set up properly, including redirecting all old http links.",
      },
      { type: "h2", text: "2. Nobody can remember the last update" },
      {
        type: "p",
        text: "Website software gets security patches constantly. If your site runs a CMS with plugins and no one has logged in for a year, you are almost certainly running something with a publicly known vulnerability.",
      },
      {
        type: "p",
        text: "Fix: put a monthly 20-minute update slot in someone's calendar, or move maintenance to a support plan so it simply happens.",
      },
      { type: "h2", text: "3. Everyone uses the same login" },
      {
        type: "p",
        text: "One shared admin account means you cannot tell who changed what, you cannot remove one person's access without disrupting everyone, and the password usually gets shared in a group chat where it stays forever.",
      },
      {
        type: "ul",
        items: [
          "Give every person their own account",
          "Give each account the lowest permission level that works",
          "Turn on two-factor authentication for admins",
          "Remove access the day someone leaves",
        ],
      },
      { type: "h2", text: "4. Your contact form is a spam magnet" },
      {
        type: "p",
        text: "Constant spam is annoying, but it is also a signal: your form has no protection, which often means it has no input validation either. The same gap that lets bots submit rubbish can let an attacker submit something worse.",
      },
      {
        type: "p",
        text: "Fix: add a hidden honeypot field, rate limiting per IP address, and server-side validation. Done well, visitors notice nothing and the spam stops.",
      },
      { type: "h2", text: "5. You have backups, but you have never tested them" },
      {
        type: "p",
        text: "An untested backup is a hope, not a plan. We have seen backups that were running perfectly for two years and restored to an empty database.",
      },
      {
        type: "quote",
        text: "Ask your provider one question: 'Can you show me a restore?' If the answer is vague, you do not have a backup — you have a backup-shaped file.",
      },
      { type: "h2", text: "What to do next" },
      {
        type: "p",
        text: "Run through the five points above. If more than one applies, take our free two-minute Website Security Score quiz — it will show you the order to fix things in. If you would rather have someone look properly, book a free consultation and we will tell you honestly what needs doing.",
      },
    ],
  },
  {
    slug: "how-ai-chatbots-save-restaurants-time",
    title: "How AI chatbots save restaurants time",
    description:
      "Most restaurant calls are the same five questions. Here's how an assistant handles them without sounding like a robot.",
    date: "2026-09-12",
    readingTime: "4 min read",
    category: "AI",
    author: "[Team Member Three]",
    blocks: [
      {
        type: "p",
        text: "Watch a restaurant phone between 6pm and 9pm. Most calls are not bookings. They are 'are you open tonight', 'do you deliver to my street', 'do you have anything vegetarian', 'is there parking'. Each one pulls someone away from a table.",
      },
      { type: "h2", text: "What the assistant actually does" },
      {
        type: "p",
        text: "A well-built assistant is not trying to hold a conversation about the weather. It answers a narrow set of questions from your own information, and it takes booking requests. That narrow focus is exactly why it is reliable.",
      },
      {
        type: "ul",
        items: [
          "Opening hours, including holiday changes",
          "Menu, dietary options and allergens as you have written them",
          "Delivery area, timings and minimum order",
          "Table bookings, with a manager callback for large groups",
          "Parking, location and accessibility",
        ],
      },
      { type: "h2", text: "Where the time actually goes" },
      {
        type: "p",
        text: "Say your team answers 25 repeat questions a day at two minutes each. That is roughly 50 minutes daily, or about six hours a week — most of it during your busiest service. Shifting even two thirds of that to an assistant gives you back a shift's worth of attention every week.",
      },
      {
        type: "p",
        text: "The second saving is quieter: enquiries that arrive at 11pm. Nobody answers those today. An assistant captures them, and you wake up to a booking request instead of a missed call.",
      },
      { type: "h2", text: "The part most people get wrong" },
      {
        type: "p",
        text: "A chatbot that invents an answer is worse than no chatbot. If it guesses that you are open on a public holiday when you are not, you have upset a customer and damaged trust.",
      },
      {
        type: "quote",
        text: "The most important sentence an assistant can say is: 'I'm not sure — let me pass you to someone who is.'",
      },
      {
        type: "p",
        text: "We build assistants that answer only from your content and hand over cleanly when they hit the edge of it. Every month we read the real questions people asked and add the answers that were missing.",
      },
      { type: "h2", text: "Try it before you buy it" },
      {
        type: "p",
        text: "Our Live Demos page has a working restaurant assistant you can talk to right now. Ask it something awkward — it will tell you when it does not know.",
      },
    ],
  },
  {
    slug: "what-private-ai-means-for-clinics",
    title: "What 'private AI' actually means for a clinic",
    description:
      "Using AI in a clinic is not automatically risky — but pasting patient details into a public chatbot is. Here's the difference.",
    date: "2026-09-22",
    readingTime: "6 min read",
    category: "Privacy",
    author: "[Team Member Two]",
    blocks: [
      {
        type: "p",
        text: "Clinic staff are already using AI. Someone is drafting a letter, summarising notes or rewriting an email in a free chatbot on their phone. The question is not whether AI enters your clinic. It is whether it enters through a door you control.",
      },
      { type: "h2", text: "The real risk is the copy-paste" },
      {
        type: "p",
        text: "The risk is rarely the technology itself. It is a well-meaning staff member pasting a patient's name, age and history into a public tool to save ten minutes. Once that text leaves your systems you no longer control where it is stored, who can see it, or whether it trains a model.",
      },
      { type: "h2", text: "What private AI changes" },
      {
        type: "ul",
        items: [
          "The AI runs in an environment you control, or under a business agreement that forbids training on your data",
          "Only named staff can access it, with two-factor authentication",
          "Traffic is encrypted, and stored conversations are minimal and time-limited",
          "Logs show who asked what, so you can answer questions if you are ever challenged",
          "The assistant is scoped: it sees your published information, not your patient database",
        ],
      },
      { type: "h2", text: "Boundaries for anything patient-facing" },
      {
        type: "p",
        text: "Our position is firm and we do not bend it: a patient-facing assistant handles scheduling and published information only. Hours, location, fees, what to bring, how to reschedule. It never diagnoses, triages or advises on treatment. Any health question gets one answer — speak to the clinic, and in an emergency contact emergency services.",
      },
      {
        type: "quote",
        text: "A scheduling assistant that stays in its lane saves reception hours every week. A chatbot playing doctor is a liability with a friendly interface.",
      },
      { type: "h2", text: "A realistic starting point" },
      {
        type: "p",
        text: "You do not need to solve everything at once. Most clinics start with a one-page staff rule on what may and may not be pasted into AI tools, then an appointment assistant on the website, then private AI for internal drafting work.",
      },
      {
        type: "p",
        text: "If you want a second opinion on where your clinic stands today, book a free consultation. We will tell you what is fine, what needs tightening, and what you genuinely do not need to spend money on.",
      },
      {
        type: "p",
        text: "This article is general information, not legal advice. Have a qualified professional review your privacy documentation before you rely on it.",
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
