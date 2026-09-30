# Assumptions made — and what you must customise

Everything below was a judgement call made so the build could finish without
blocking on questions. Each one is easy to change.

---

## Brand decisions

| Decision | Rationale | Change it in |
|---|---|---|
| **Tagline: "Smart systems. Serious security."** | Shortest of the three options, and it says the differentiator out loud. Alternatives kept as comments: *"Secure AI for small business."* and *"See further. Stay protected."* | `src/content/site.ts` |
| **Palette: deep navy `#071324` + electric teal `#14E0C8` + violet `#7C6CFF`** | Navy reads as trustworthy/secure, teal as modern/AI, violet adds the "slightly futuristic" lift without looking like a crypto site. Meets WCAG AA in both themes. | `src/app/globals.css` (`@theme`) |
| **Fonts: Space Grotesk (headings) + Inter (body)** | Geometric-but-warm headings, extremely readable body. Both self-hosted via `next/font` — no Google request, no cookie, no layout shift. | `src/app/layout.tsx` |
| **Logo: triangle/shield aperture with an eye and pupil** | "Third Eye" = seeing more; the shield outline carries the security meaning. Pure SVG, so it is crisp at any size and themeable. | `src/components/layout/Logo.tsx`, `public/logo.svg`, `src/app/icon.svg` |
| **Company written as "Third Eye", legal entity as `[Third Eye Technologies]`** | You gave a brand name, not a registered entity. | `src/content/site.ts` |

## Product / content decisions

* **Currency is USD with placeholder amounts.** You are based in Pakistan and
  serving clients remotely, so you may want PKR or dual pricing — change
  `currency` and the numbers in `src/content/pricing.ts`.
* **Package prices** (`$900/$59`, `$2,400/$149`, `$4,800/$299`) are invented
  placeholders chosen to look plausible for small-business work. They are
  labelled as placeholders on the page and in the chatbot's answers.
* **Industries are a tabbed single page** rather than three separate pages.
  Deep links still work (`/industries?tab=clinics`) and it keeps the crawl
  budget and the nav simple. Splitting into three routes later is trivial.
* **No testimonials, client logos, case studies or awards anywhere.** You have
  none you can evidence yet. Stats are labelled "sample and target figures".
  When you have a real client who consents in writing, add a testimonials
  section — not before.
* **Blog posts are written in full**, not lorem ipsum, so the site is usable
  immediately. Author names are placeholders.
* **Legal documents are plain-language templates.** They cover the right
  ground but are not legal advice and are not jurisdiction-specific.
* **"Free security review" is used as the quiz's call to action.** It assumes
  you are willing to offer that for free. If not, change the CTA in
  `src/components/features/SecurityQuiz.tsx`.

## Technical decisions

* **Next.js 15 App Router over React+Vite.** You wanted a backend for the chat
  and form endpoints; Next gives you those as API routes on the same deploy,
  plus first-class SEO metadata, sitemap generation and image optimisation.
* **No component library, no icon library, no form library, no animation
  library.** Everything is hand-built (~103 kB shared JS). Fewer dependencies
  means a smaller supply-chain attack surface — a deliberate choice for a
  security brand, not just a performance one.
* **Scroll reveals use one shared `IntersectionObserver`** driven by a
  `data-reveal` attribute, so server components can animate without shipping
  any per-section JavaScript.
* **The demo bots are rule-based, not AI.** Instant, free, offline-proof and
  identical in every sales demo. The production assistant uses the real AI
  endpoint.
* **Email delivery assumes Resend** and is called over plain `fetch`, so there
  is no SDK dependency. Swapping to Postmark/SendGrid/SES is ~10 lines in
  `src/app/api/contact/route.ts`.
* **Rate limiting is in-memory** — correct for a single instance, best-effort
  on serverless. Swap in Upstash Redis or Vercel KV for production
  (`src/lib/rate-limit.ts`, same interface).
* **Strict CSP with a per-request nonce** means pages are server-rendered on
  demand rather than statically cached. That is the documented Next.js
  trade-off for a strong policy, and we chose security over the last few
  milliseconds. Documented in the README if you want to reverse it.
* **The booking calendar links out instead of embedding.** Embedding Calendly
  would load their scripts and cookies for every visitor and force a looser
  CSP. Flip `EMBED` in `src/components/features/BookingCta.tsx` if you prefer
  the embed — and add the origin to `frame-src` in `src/middleware.ts`.
* **Analytics loads nothing by default** and is gated behind cookie consent.
* **No CMS.** Content lives in typed TypeScript files, which is faster, free
  and version-controlled. If a non-technical person must edit copy without
  touching Git, add Sanity/Contentful later — the content shape already
  matches a CMS schema.

## What you must customise before launch

1. **All `[BRACKETED]` placeholders.** Search the project for `[` — they appear
   in `site.ts`, `pricing.ts`, `about.ts`, `legal.ts`, `security.txt` and a few
   copy lines (e.g. "[2–3 weeks]").
2. **Contact details** — email, phone, WhatsApp number, booking URL, socials.
3. **Real prices** in `src/content/pricing.ts`.
4. **Three real team members** in `src/content/about.ts` (photos go in
   `/public/team/`, then set `photo: "/team/name.jpg"`).
5. **Legal documents** reviewed by a qualified professional in your
   jurisdiction — especially before you take on clinic clients.
6. **`.env.local`** — `NEXT_PUBLIC_SITE_URL`, `AI_API_KEY`, `RESEND_API_KEY`,
   `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
7. **`public/.well-known/security.txt`** — security email, canonical URL and a
   future `Expires` date (it must be refreshed periodically).
8. **Decide on currency** (USD vs PKR) and whether to show prices at all for
   Secure Pro, or switch it to "from / on request".
