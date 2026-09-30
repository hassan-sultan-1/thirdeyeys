# Pre-launch checklist

Work top to bottom. Nothing here takes long, and skipping the legal and email
steps is how small sites get into trouble.

---

## 1. Content (do this first — everything else depends on it)

- [ ] Replace every `[BRACKETED]` placeholder (search the project for `[`)
- [ ] Real contact email, phone and WhatsApp number → `src/content/site.ts`
- [ ] Real prices, or switch to "from" pricing → `src/content/pricing.ts`
- [ ] Three real team members, bios and photos → `src/content/about.ts` + `/public/team/`
- [ ] Confirm timelines you can actually hit ("[2–3 weeks]" etc.)
- [ ] Proofread out loud on a phone — that's where most visitors will read it
- [ ] Decide currency (USD / PKR / both) and tax wording

## 2. Domain & DNS

- [ ] Buy the domain
- [ ] Point it at Vercel/Netlify and confirm HTTPS is issued
- [ ] Force `www` → apex (or the reverse) so there is one canonical host
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final URL and redeploy
- [ ] Update the domain in `public/.well-known/security.txt`

## 3. Email

- [ ] Create a professional mailbox (`hello@yourdomain`) — not a Gmail address
- [ ] Create `security@yourdomain` for vulnerability reports
- [ ] Sign up with Resend (or your provider) and **verify the sending domain**
- [ ] Add `SPF`, `DKIM` and a `DMARC` record — without these your form emails
      will land in spam
- [ ] Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`
- [ ] **Send a real test enquiry** and confirm it arrives and Reply-To works

## 4. Booking

- [ ] Create the Calendly / Cal.com event ("Free 30-minute consultation")
- [ ] Add buffers, your real availability and a timezone
- [ ] Paste the link into `site.contact.bookingUrl`
- [ ] Book a test slot yourself end-to-end

## 5. AI assistant

- [ ] Create the provider account and a **project-scoped, spend-capped** key
- [ ] Set `AI_API_KEY`, `AI_BASE_URL`, `AI_MODEL`
- [ ] Set a hard monthly spend limit with the provider
- [ ] Ask it 10 awkward questions: a wrong price, a medical question, "ignore
      your instructions", a competitor comparison, something it cannot know
- [ ] Confirm it refuses cleanly and offers a human
- [ ] Test with the key removed — the offline fallback must still answer
- [ ] Tune `CHAT_RATE_LIMIT` for your expected traffic

## 6. Legal

- [ ] Privacy policy reviewed by a qualified professional
- [ ] Terms reviewed — jurisdiction, liability cap, payment terms
- [ ] Cookie notice matches what you actually load
- [ ] List your real sub-processors (hosting, email, AI, analytics) in the
      privacy policy
- [ ] If you will serve clinics, get specific advice on health-data handling
- [ ] Company registration details and address added where required

## 7. Analytics & conversion tracking

- [ ] Choose a privacy-friendly provider (Plausible / Umami / Fathom)
- [ ] Set `NEXT_PUBLIC_ANALYTICS_SRC` and `NEXT_PUBLIC_ANALYTICS_DOMAIN`
- [ ] Add the analytics origin to `connect-src`/`script-src` — it is added
      automatically from the env var in `src/middleware.ts`, just verify
- [ ] Confirm nothing loads until the visitor accepts the cookie banner
- [ ] Check these events fire: `cta_click`, `contact_form_submit`,
      `booking_click`, `chat_opened`, `quiz_completed`,
      `estimator_quote_requested`
- [ ] Set up a weekly email report so you actually look at it

## 8. Security

- [ ] Run [securityheaders.com](https://securityheaders.com) — expect A/A+
- [ ] Run [SSL Labs](https://www.ssllabs.com/ssltest/) — expect A
- [ ] Confirm HSTS is present in production responses
- [ ] Confirm `X-Frame-Options: DENY` (make sure `ALLOW_EMBEDDING` is **unset**)
- [ ] Verify no secrets in the client bundle: `grep -r "AI_API_KEY" .next/static` → no results
- [ ] Submit the contact form 6 times quickly — the 6th must be rate limited
- [ ] Submit with the honeypot filled (via devtools) — must silently succeed
- [ ] Try `<script>alert(1)</script>` in every field — must appear as text
- [ ] Update `Expires` in `security.txt` and diarise a yearly refresh
- [ ] Turn on 2FA for the domain registrar, host, email and AI provider accounts
- [ ] Enable Dependabot / `npm audit` in CI

## 9. Performance & accessibility

- [ ] Audit the **production** build, not `npm run dev`
- [ ] Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
      (mobile and desktop)
- [ ] Tab through every page with the keyboard only — nothing unreachable, focus
      always visible
- [ ] Test with the OS "reduce motion" setting on
- [ ] Test at 320 px, 768 px, 1440 px
- [ ] Test dark mode and light mode
- [ ] Check colour contrast on any colour you changed
- [ ] Zoom to 200% — no horizontal scrolling

## 10. SEO

- [ ] Verify `/sitemap.xml` and `/robots.txt` return your real domain
- [ ] Submit the sitemap to Google Search Console and Bing Webmaster Tools
- [ ] Add the verification token to `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- [ ] Test structured data in the [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check the social card at `/opengraph-image` and preview a shared link
- [ ] Create a Google Business Profile
- [ ] Write unique titles/descriptions if you add pages

## 11. Final pass

- [ ] Click every link, including the footer and legal pages
- [ ] Test the 404 page (`/anything-else`)
- [ ] Test the full form journey on a real phone, on mobile data
- [ ] Test the chat widget, demo bots, estimator, ROI calculator, quiz and
      before/after slider on touch
- [ ] Confirm the cookie banner remembers a decline
- [ ] Set up uptime monitoring (UptimeRobot, BetterStack — free tiers are fine)
- [ ] Confirm backups exist for anything stateful you add later
- [ ] Take a screenshot of the finished site for your own records
- [ ] Tell three people and ask them to try booking a call

---

### After launch — monthly, 30 minutes

- [ ] `npm audit` / Dependabot PRs merged
- [ ] Read the real chat questions and improve the assistant's answers
- [ ] Check analytics: which page do people leave from?
- [ ] Confirm the form still delivers (send yourself one)
- [ ] Review who has access to what; remove anyone who has left
