/**
 * middleware.ts — PER-REQUEST SECURITY HEADERS
 * ---------------------------------------------------------------
 * A Content Security Policy is the single most effective defence
 * against cross-site scripting. It needs a fresh random nonce on
 * every request, which static config cannot provide — hence
 * middleware. Next.js picks the nonce up from the request headers
 * and stamps it onto its own scripts automatically.
 *
 * Static headers that never change live in next.config.ts.
 *
 * NOTE ON EMBEDDING: in production the site refuses to be framed
 * (clickjacking protection). In development we allow framing so
 * local preview tools keep working.
 */
import { NextResponse, type NextRequest } from "next/server";

const isDev = process.env.NODE_ENV !== "production";

/** Allow framing in dev, or when explicitly enabled for a preview host. */
const allowEmbedding = isDev || process.env.ALLOW_EMBEDDING === "true";

export function middleware(request: NextRequest) {
  // 128 bits of randomness, base64 encoded.
  const nonce = Buffer.from(crypto.randomUUID().replace(/-/g, ""), "hex").toString("base64");

  // Optional analytics origin (only added if you configure one).
  const analytics = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const analyticsOrigin = analytics?.startsWith("http")
    ? new URL(analytics).origin
    : "";

  const csp = [
    `default-src 'self'`,
    // 'strict-dynamic' lets the nonced Next.js bootstrap load its own
    // chunks, while still blocking anything an attacker injects.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${isDev ? "'unsafe-eval'" : ""} ${analyticsOrigin}`,
    // Tailwind/Next inject some styles inline; style attributes are
    // used for progress bars and animation delays.
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob:`,
    `font-src 'self' data:`,
    `connect-src 'self' ${analyticsOrigin} ${isDev ? "ws: wss:" : ""}`,
    `media-src 'self'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
    `frame-src 'self'`,
    allowEmbedding ? `frame-ancestors *` : `frame-ancestors 'none'`,
    `manifest-src 'self'`,
    `worker-src 'self' blob:`,
    !isDev ? `upgrade-insecure-requests` : "",
  ]
    .filter(Boolean)
    .join("; ")
    .replace(/\s{2,}/g, " ")
    .trim();

  // Pass the nonce through on the REQUEST so Next can use it while
  // rendering, and set the policy on the RESPONSE for the browser.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("content-security-policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("content-security-policy", csp);

  // Clickjacking protection for older browsers (CSP covers modern ones).
  if (!allowEmbedding) response.headers.set("X-Frame-Options", "DENY");

  return response;
}

export const config = {
  matcher: [
    /*
     * Run on every path except static assets and image optimisation —
     * they do not need a nonce and skipping them keeps things fast.
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
