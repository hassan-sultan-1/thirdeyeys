/**
 * security.ts — SECURITY & TRUST PAGE CONTENT
 * Plain-language explanations only. Do NOT add certification claims here
 * unless you actually hold the certification and can evidence it.
 */

export const securityIntro = {
  headline: "How we keep your business and your customers safe",
  sub: "Security written for business owners, not engineers. Here is exactly what we do, why it matters, and what we do not claim.",
};

export const securityPractices = [
  {
    title: "Access control",
    plain: "Only the people who need something can open it.",
    detail:
      "Every system we build uses named accounts with the minimum permissions needed for the job. No shared logins. Multi-factor authentication is switched on for admin access, and we remove access the day someone leaves your team.",
    icon: "key",
  },
  {
    title: "Encryption",
    plain: "Information is scrambled so it is useless if intercepted.",
    detail:
      "Traffic to your site is HTTPS-only. Stored data is encrypted at rest by the hosting provider, and we avoid storing anything sensitive in the first place. Credentials live in a password manager or secrets store, never in code, email or chat.",
    icon: "lock",
  },
  {
    title: "Backups you can actually restore",
    plain: "If something breaks, we can put it back.",
    detail:
      "Automatic backups run on a schedule that matches your plan — weekly on Starter, daily on Growth and above. On Secure Pro we periodically restore a backup to prove it works, because an untested backup is only a hope.",
    icon: "save",
  },
  {
    title: "Monitoring and updates",
    plain: "We notice problems before your customers do.",
    detail:
      "Uptime checks, error alerts and dependency updates. When a security patch is released for something your site depends on, applying it is part of your monthly plan, not an extra invoice.",
    icon: "radar",
  },
  {
    title: "Safe handling of AI data",
    plain: "AI only sees what it needs to answer.",
    detail:
      "Assistants are given your published business information, not your customer database. We test for prompt injection — attempts to trick the assistant into revealing instructions or data — and we keep conversation logs short-lived and access-controlled. For sensitive work we use private AI so content is not used to train anyone's model.",
    icon: "brain",
  },
  {
    title: "Privacy by default",
    plain: "We collect as little as possible.",
    detail:
      "Forms ask only for what is needed to reply to an enquiry. We use privacy-friendly, cookie-free analytics where possible, set clear retention periods, and delete data when it is no longer needed. Your privacy policy states this in writing.",
    icon: "eye",
  },
  {
    title: "Secure development habits",
    plain: "The code is written defensively.",
    detail:
      "Input is validated and escaped on both the browser and the server. Forms carry spam protection and rate limiting. Security headers (Content Security Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) are set on every response. API keys stay on the server, never in the browser.",
    icon: "code",
  },
  {
    title: "Clear incident response",
    plain: "If something goes wrong, you hear it from us first.",
    detail:
      "We have a written process: contain, assess, notify you within [24] hours of confirming an issue, fix, then send a short report on what happened and what changed. You get an honest account, not silence.",
    icon: "alert",
  },
];

/** Honest statement of limits — builds more trust than vague claims. */
export const securityHonesty = {
  title: "What we do not claim",
  points: [
    "We do not hold ISO 27001, SOC 2 or HIPAA certification, and we will never imply that we do. We apply the practices these frameworks are built on.",
    "No system is unbreakable. Our job is to make an attack unlikely, difficult, quickly detected and quickly recoverable.",
    "We are not your lawyers. Have a qualified professional review your privacy policy and terms before launch, especially for clinics.",
    "Security is shared. Weak staff passwords or a shared admin login will undo good engineering, so we train your team too.",
  ],
};

/** "How we secure this site" — about thirdeye.com itself. */
export const thisSite = {
  title: "How we secure this website",
  points: [
    "Content Security Policy with per-request nonces, plus X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy on every response.",
    "HTTPS enforced with HSTS; all http requests are upgraded.",
    "AI and email API keys are stored server-side as environment variables and are never sent to the browser.",
    "Contact form input is validated and sanitised on the client and again on the server, with a honeypot field and per-IP rate limiting.",
    "No third-party trackers by default. Analytics is privacy-friendly and cookie-free, and is disabled until you consent.",
    "A security.txt file at /.well-known/security.txt tells researchers how to report a problem responsibly.",
  ],
};
