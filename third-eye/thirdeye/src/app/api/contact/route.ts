/**
 * POST /api/contact — LEAD / BOOKING FORM ENDPOINT
 * ---------------------------------------------------------------
 * Security measures, in order of execution:
 *  1. per-IP rate limiting            (spam + abuse)
 *  2. payload size guard              (DoS)
 *  3. schema validation + sanitising  (shared with the client)
 *  4. honeypot + timing heuristics    (bots)
 *  5. HTML escaping of every value    (email injection / XSS)
 *
 * Delivery: if RESEND_API_KEY is set the enquiry is emailed via the
 * Resend HTTP API (no SDK — one less dependency). Otherwise the
 * submission is logged to the server console so the form still works
 * in development. Nothing is written to disk or a database: we store
 * no personal data we do not need.
 */
import { NextResponse } from "next/server";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { escapeHtml, spamReason, validateContact } from "@/lib/validation";
import { site } from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RATE_LIMIT = Number(process.env.CONTACT_RATE_LIMIT ?? 5); // submissions
const RATE_WINDOW_MS = 60 * 60 * 1000; // per hour per IP
const MAX_BODY_BYTES = 12_000;

export async function POST(req: Request) {
  /* -------- 1. rate limit -------- */
  const ip = clientIp(req);
  const limit = rateLimit(`contact:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later or email us directly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  /* -------- 2. size guard -------- */
  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "That message is too large." }, { status: 413 });
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  /* -------- 3. validate + sanitise -------- */
  const { data, errors, ok } = validateContact(parsed);
  if (!ok) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  /* -------- 4. spam heuristics -------- */
  const spam = spamReason(data);
  if (spam) {
    // Respond with success so bots learn nothing from the difference.
    console.warn(`[contact] dropped submission (${spam})`);
    return NextResponse.json({ ok: true, id: "ok" });
  }

  /* -------- 5. escape everything before it touches an email -------- */
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    phone: escapeHtml(data.phone || "—"),
    business: escapeHtml(data.business || "—"),
    industry: escapeHtml(data.industry || "—"),
    service: escapeHtml(data.service || "—"),
    budget: escapeHtml(data.budget || "—"),
    message: escapeHtml(data.message).replace(/\n/g, "<br />"),
  };

  const subject = `New enquiry — ${safe.name}${safe.business !== "—" ? ` (${safe.business})` : ""}`;
  const html = `
    <h2 style="font-family:system-ui,sans-serif">New enquiry from the website</h2>
    <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0"><strong>Name</strong></td><td>${safe.name}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Email</strong></td><td>${safe.email}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Phone</strong></td><td>${safe.phone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Business</strong></td><td>${safe.business}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Industry</strong></td><td>${safe.industry}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Interested in</strong></td><td>${safe.service}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><strong>Budget</strong></td><td>${safe.budget}</td></tr>
    </table>
    <p style="font-family:system-ui,sans-serif;font-size:14px"><strong>Message</strong><br />${safe.message}</p>
    <hr />
    <p style="font-family:system-ui,sans-serif;font-size:12px;color:#667">Sent from ${site.url}. Reply directly to reach the sender.</p>
  `;

  /* -------- 6. deliver -------- */
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (resendKey && to && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject,
          html,
        }),
      });
      if (!res.ok) {
        console.error("[contact] email provider responded", res.status);
        return NextResponse.json(
          { ok: false, error: "We couldn't send that just now. Please email us directly." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[contact] delivery failed", err instanceof Error ? err.name : "unknown");
      return NextResponse.json(
        { ok: false, error: "We couldn't send that just now. Please email us directly." },
        { status: 502 },
      );
    }
  } else {
    // Development / not-yet-configured fallback.
    console.info(
      "[contact] no email provider configured — enquiry received from",
      data.email,
      "(set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL to enable delivery)",
    );
  }

  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
