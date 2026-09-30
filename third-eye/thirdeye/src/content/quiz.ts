/**
 * quiz.ts — WEBSITE SECURITY SCORE QUIZ
 * 10 plain-language questions. Each answer carries points.
 * Score bands below produce the explanation and call to action.
 */

export type QuizOption = { label: string; points: number };
export type QuizQuestion = { id: string; q: string; help?: string; options: QuizOption[] };

export const quizQuestions: QuizQuestion[] = [
  {
    id: "https",
    q: "Does your website address start with https and show a padlock?",
    help: "Type your domain into a browser and look at the address bar.",
    options: [
      { label: "Yes, always", points: 10 },
      { label: "Not sure", points: 4 },
      { label: "No, or it shows a warning", points: 0 },
    ],
  },
  {
    id: "backups",
    q: "If your website disappeared tonight, could you restore it tomorrow?",
    options: [
      { label: "Yes — automatic backups I have tested", points: 10 },
      { label: "There are backups, but I have never tested them", points: 6 },
      { label: "No, or I do not know", points: 0 },
    ],
  },
  {
    id: "updates",
    q: "When was your website software last updated?",
    help: "Plugins, themes, CMS or framework.",
    options: [
      { label: "Within the last month", points: 10 },
      { label: "Within the last year", points: 5 },
      { label: "Over a year ago, or never", points: 0 },
    ],
  },
  {
    id: "passwords",
    q: "How do you and your staff log in to the website admin?",
    options: [
      { label: "Separate accounts, strong passwords, 2FA on", points: 10 },
      { label: "Separate accounts, no 2FA", points: 6 },
      { label: "One shared login everyone uses", points: 0 },
    ],
  },
  {
    id: "access",
    q: "Has anyone who left your business still got access to your site or accounts?",
    options: [
      { label: "No — we remove access immediately", points: 10 },
      { label: "Probably, we have not checked", points: 3 },
      { label: "Yes, or an old agency still has it", points: 0 },
    ],
  },
  {
    id: "forms",
    q: "Do your website forms get flooded with spam?",
    options: [
      { label: "No — protection is in place", points: 8 },
      { label: "Some spam gets through", points: 4 },
      { label: "Constant spam, or we have no forms", points: 2 },
    ],
  },
  {
    id: "customerdata",
    q: "Where do customer details from your website end up?",
    options: [
      { label: "A secure system only specific staff can open", points: 10 },
      { label: "A shared inbox or spreadsheet", points: 4 },
      { label: "A group chat, or I am not sure", points: 0 },
    ],
  },
  {
    id: "ai",
    q: "Do staff paste business or customer information into public AI chatbots?",
    options: [
      { label: "No — we have a clear rule about it", points: 8 },
      { label: "Maybe, we have never discussed it", points: 3 },
      { label: "Yes, regularly", points: 0 },
    ],
  },
  {
    id: "privacy",
    q: "Does your site have a privacy policy that matches what you actually do?",
    options: [
      { label: "Yes, reviewed in the last year", points: 8 },
      { label: "There is one, copied from somewhere", points: 4 },
      { label: "No privacy policy", points: 0 },
    ],
  },
  {
    id: "monitoring",
    q: "Would you know within an hour if your website went down or was defaced?",
    options: [
      { label: "Yes — monitoring alerts us", points: 8 },
      { label: "Only if a customer told us", points: 3 },
      { label: "No idea", points: 0 },
    ],
  },
];

export const maxQuizScore = quizQuestions.reduce(
  (sum, q) => sum + Math.max(...q.options.map((o) => o.points)),
  0,
);

export const quizBands = [
  {
    min: 0,
    max: 39,
    grade: "At risk",
    tone: "danger" as const,
    summary:
      "There are gaps here that an attacker or a simple accident could exploit today. The good news: most of them are quick and inexpensive to close.",
    advice: [
      "Turn on automatic backups and test a restore.",
      "Give every person their own login and switch on two-factor authentication.",
      "Remove access for anyone who has left.",
      "Get HTTPS working everywhere.",
    ],
  },
  {
    min: 40,
    max: 69,
    grade: "Needs work",
    tone: "warn" as const,
    summary:
      "The basics are partly there, but a few habits are leaving the door open. A short review would tighten this up without a rebuild.",
    advice: [
      "Test that your backups actually restore.",
      "Set a monthly update reminder for site software.",
      "Write a one-page rule on what staff may paste into AI tools.",
      "Move customer enquiries out of shared inboxes and chats.",
    ],
  },
  {
    min: 70,
    max: 89,
    grade: "Solid",
    tone: "good" as const,
    summary:
      "You are ahead of most small businesses. The remaining wins are about monitoring and proving things work rather than adding new tools.",
    advice: [
      "Add uptime and error monitoring so you hear about problems first.",
      "Schedule a quarterly access review.",
      "Review your privacy policy against what you actually collect.",
    ],
  },
  {
    min: 90,
    max: 1000,
    grade: "Strong",
    tone: "great" as const,
    summary:
      "Genuinely strong for a small business. Keep it that way with regular reviews — security drifts when nobody is watching.",
    advice: [
      "Document your incident process so it does not live in one person's head.",
      "Test a restore and a 'what if the admin is unavailable' scenario.",
      "Keep dependencies patched automatically.",
    ],
  },
];

export const quizDisclaimer =
  "This is a quick self-check, not a security audit. It gives you a sense of where to start — a real review looks at your actual systems.";
