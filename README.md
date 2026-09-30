[README.md](https://github.com/user-attachments/files/32851327/README.md)
# Third Eye — website

**Smart systems. Serious security.**
Marketing + lead-generation website for a three-person studio building secure,
AI-powered digital systems for small businesses (restaurants, shops, clinics).

Built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4**
and a small serverless backend for the contact form and AI chat endpoints.

---

## 1. Quick start

```bash
# 1. install
npm install

# 2. environment
cp .env.example .env.local     # then fill in the values you need

# 3. run
npm run dev                    # http://localhost:3000

# 4. production check before deploying
npm run build && npm start
```

**Nothing in `.env.local` is required to run the site.** Without an AI key the
chat widget automatically falls back to built-in canned answers; without an
email key the contact form still validates and succeeds, logging the enquiry to
the server console.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks and lints) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## 2. Where the content lives

**You should never need to edit a component to change wording or prices.**
Everything a non-developer would want to change is in `src/content/`:

| File | Contains |
|---|---|
| `site.ts` | Company name, tagline, **contact details, WhatsApp number, booking link**, navigation, social links, default SEO |
| `pricing.ts` | **All prices**: the three packages, comparison table, pricing-estimator rates, ROI defaults, animated stats |
| `services.ts` | The four services (what's included, benefits, timelines), the 4-step process, "why us" pillars |
| `industries.ts` | Restaurant / shop / clinic problems, solutions and features (including the clinic safety boundary) |
| `faqs.ts` | Home-page FAQ + pricing FAQ (both feed FAQ structured data) |
| `about.ts` | Mission, story, values, **team members**, approach |
| `security.ts` | Security & Trust page copy |
| `quiz.ts` | The 10 security-score questions, scoring bands and advice |
| `demos.ts` | Scripts for the three demo bots **and** the chat widget's offline answers |
| `posts.ts` | Blog/insights articles (structured blocks, not raw HTML) |
| `legal.ts` | Privacy policy, terms, cookie notice templates |

> Every value written in `[SQUARE BRACKETS]` is a placeholder you must replace
> before launch. Search the repo for `[` to find them all.

### Changing prices (the most common edit)

Open `src/content/pricing.ts`:

```ts
export const tiers = [
  { id: "starter", name: "Starter", setup: 900, monthly: 59, ... },
  ...
];
```

Change `setup` / `monthly` and the home page, pricing page and the AI
assistant's answers all update together. The estimator rates are in the same
file under `estimator`.

---

## 3. Folder structure

```
src/
├─ app/                        # App Router pages (one folder = one URL)
│  ├─ layout.tsx               # fonts, theme bootstrap, nav/footer/chat, JSON-LD
│  ├─ page.tsx                 # Home
│  ├─ services/ industries/ pricing/ demos/ security/ about/ contact/
│  ├─ blog/  blog/[slug]/      # Insights index + articles
│  ├─ legal/[slug]/            # privacy · terms · cookies
│  ├─ not-found.tsx            # custom 404
│  ├─ opengraph-image.tsx      # generated 1200×630 social card
│  ├─ icon.svg                 # favicon
│  ├─ robots.ts  sitemap.ts    # generated from the content files
│  └─ api/
│     ├─ chat/route.ts         # server-side AI proxy (key never reaches browser)
│     └─ contact/route.ts      # form handler: validation, spam, rate limit, email
│
├─ components/
│  ├─ layout/                  # Navbar, Footer, Logo, ThemeToggle, BackToTop,
│  │                           # CookieBanner, Analytics
│  ├─ ui/                      # Primitives (Button/Card/Section…), Icon, Tabs,
│  │                           # Accordion, Counter, RevealProvider
│  ├─ features/                # PricingEstimator, RoiCalculator, SecurityQuiz,
│  │                           # BeforeAfter, DemoPlayground, ContactForm,
│  │                           # BookingCta, Stats
│  └─ chat/ChatWidget.tsx      # the always-on site assistant
│
├─ content/                    # ← all editable copy, prices and config
├─ lib/                        # utils, validation, rate-limit, seo, analytics,
│                              # fallback-bot
└─ middleware.ts               # per-request CSP nonce + security headers

public/
├─ logo.svg
└─ .well-known/security.txt    # RFC 9116 vulnerability reporting
```

---

## 4. Environment variables

See `.env.example` for the annotated list. Summary:

| Variable | Server/Public | Needed for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | Canonical URLs, sitemap, Open Graph |
| `AI_API_KEY` | **server only** | Live AI chat (any OpenAI-compatible provider) |
| `AI_BASE_URL`, `AI_MODEL` | server | Which provider/model to call |
| `CHAT_RATE_LIMIT` | server | Messages per IP per 10 min (default 20) |
| `RESEND_API_KEY` | **server only** | Emailing contact-form submissions |
| `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | server | Where enquiries go / verified sender |
| `CONTACT_RATE_LIMIT` | server | Submissions per IP per hour (default 5) |
| `NEXT_PUBLIC_ANALYTICS_SRC/_DOMAIN` | public | Optional cookie-free analytics |
| `ALLOW_EMBEDDING` | server | Set `true` **only** if the site must load in an iframe |

🔒 **Never prefix a secret with `NEXT_PUBLIC_`** — that exposes it to browsers.

---

## 5. How the AI chatbot works

```
Browser ──POST /api/chat──▶ Next.js route ──▶ AI provider
   ▲                            │  (AI_API_KEY lives here, server-side only)
   └──────── reply text ────────┘
```

* The system prompt is **generated from your content files**, so the assistant
  quotes your real services and prices (`src/app/api/chat/route.ts`).
* It has hard rules: no invented testimonials or certifications, no medical/
  legal/financial advice, no leaking its instructions, and "I don't know"
  instead of guessing.
* Per-IP rate limiting caps cost and abuse.
* **Fallback:** if no key is set, the provider errors, or the request times out,
  the widget answers from the canned knowledge base in `src/content/demos.ts`
  and labels the reply "Offline answer". The widget is never broken.

To switch provider, just change `AI_BASE_URL` and `AI_MODEL` (OpenAI,
OpenRouter, Groq, Together, Azure, or your own self-hosted model).

The **demo bots on `/demos` are intentionally rule-based** — instant, free,
identical in every sales demo, and impossible to hallucinate with.

---

## 6. Security notes

| Measure | Where |
|---|---|
| CSP with per-request nonce + `strict-dynamic` | `src/middleware.ts` |
| `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP | `next.config.ts` + middleware |
| HSTS (`Strict-Transport-Security`, 2 years, preload) | `next.config.ts`, production only |
| Input validation + sanitising, shared client/server | `src/lib/validation.ts` |
| HTML escaping before anything reaches an email | `src/app/api/contact/route.ts` |
| Honeypot field + submission-timing check | contact form + API |
| Per-IP rate limiting | `src/lib/rate-limit.ts` |
| Secrets server-side only | `.env.local`, never `NEXT_PUBLIC_` |
| No tracking cookies until consent | `CookieBanner` + `Analytics` |
| Vulnerability reporting | `public/.well-known/security.txt` |

**Two things to know:**

1. **Rate limiting is in-memory.** That is fine for one instance, but serverless
   platforms spin up many. For production-grade protection swap the `Map` in
   `src/lib/rate-limit.ts` for Upstash Redis or Vercel KV — the function
   signature stays the same, so only that file changes.
2. **The CSP nonce makes pages server-rendered on demand** rather than fully
   static. That is the documented Next.js trade-off for a strict CSP, and it
   still serves in milliseconds because there is no database. If you would
   rather have static pages, remove the nonce from `middleware.ts` and use a
   hash-based or `'unsafe-inline'` script policy — a weaker policy, so we
   defaulted to the safer option.

---

## 7. Accessibility & SEO

* Semantic landmarks, one `<h1>` per page, skip-to-content link.
* All interactive elements are keyboard operable: tabs (arrow keys), accordion,
  the before/after slider (a real range input), chat (Esc to close), mobile menu.
* Visible focus rings, `aria-live` regions for chat and results, labelled form
  fields with inline error messages tied via `aria-describedby`.
* `prefers-reduced-motion` disables every animation, including counters.
* Structured data: Organization, WebSite, Service ×4, FAQPage, BlogPosting,
  BreadcrumbList.
* `sitemap.xml` and `robots.txt` are generated from the content files.
* Open Graph image is generated at `/opengraph-image`.

Run a Lighthouse audit against the **production** build (`npm run build && npm start`),
not the dev server — dev mode is much slower and will understate your score.

---

## 8. Multi-language (Urdu) readiness

The structure is prepared, not enabled:

* `<html lang dir>` is driven by `site.i18n` in `src/content/site.ts`.
* Layout uses **logical CSS properties** throughout (`ms-`, `me-`, `ps-`,
  `start-`, `end-`, `border-s-`), so switching to `dir="rtl"` mirrors correctly
  with no rewrites.
* All copy already lives in `src/content/*` — an Urdu dictionary drops in
  alongside it.

To enable later: set `enabled: true` on the `ur` locale, add
`src/content/i18n/ur.ts`, and introduce a `[locale]` segment in `src/app/`.

---

## 9. Deploying

### Vercel (recommended — zero config)

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → import the repo (Next.js is detected).
3. **Settings → Environment Variables:** add everything from `.env.example`
   that you actually use. Set `NEXT_PUBLIC_SITE_URL` to your real domain.
4. Deploy, then **Settings → Domains** → add your domain and follow the DNS
   instructions. HTTPS and HTTP→HTTPS redirects are automatic.
5. Re-deploy after adding env vars so they take effect.

### Netlify

1. Import the repo; the Next.js runtime is detected automatically.
2. Build command `npm run build`, publish directory `.next`.
3. Add the same environment variables under **Site settings → Environment**.
4. Add your domain under **Domain management**; HTTPS is automatic.

### Any Node host

`npm run build && npm start` behind a reverse proxy that terminates TLS.
Make sure the proxy forwards `x-forwarded-for` so rate limiting works.

---

## 10. Editing checklist for the owner

- [ ] `src/content/site.ts` — email, phone, WhatsApp number, booking URL, socials, domain
- [ ] `src/content/pricing.ts` — all real prices
- [ ] `src/content/about.ts` — three real names, roles, bios, photos in `/public/team/`
- [ ] `src/content/legal.ts` — company name, address, jurisdiction, retention periods
- [ ] `public/.well-known/security.txt` — security email, domain, `Expires` date
- [ ] `src/content/posts.ts` — keep, edit or replace the three placeholder articles
- [ ] `.env.local` — AI key, email key, site URL

See **`LAUNCH-CHECKLIST.md`** for the full pre-launch list and
**`ASSUMPTIONS.md`** for the decisions made while building this.
