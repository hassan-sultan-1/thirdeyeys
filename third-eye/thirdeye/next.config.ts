import type { NextConfig } from "next";

/**
 * next.config.ts
 * ---------------------------------------------------------------
 * Static security headers live here (they are identical on every
 * request). The Content-Security-Policy is set in src/middleware.ts
 * because it needs a fresh nonce per request.
 */

const isProd = process.env.NODE_ENV === "production";

/** Headers applied to every response. */
const securityHeaders = [
  // Stop the browser guessing content types (MIME sniffing → XSS).
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the origin only when crossing sites — good for privacy.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Switch off powerful APIs this site never uses.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=(), browsing-topics=()",
  },
  // Legacy XSS filter (harmless on modern browsers, helps old ones).
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Don't advertise the framework.
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Isolate this origin from cross-origin window references.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

/** HTTPS enforcement — only meaningful in production, over TLS. */
const hsts = {
  key: "Strict-Transport-Security",
  value: "max-age=63072000; includeSubDomains; preload",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Never leak the framework version in response headers.
  poweredByHeader: false,

  // Trailing-slash-free canonical URLs.
  trailingSlash: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Add remote hosts here if you ever load images from a CDN.
    remotePatterns: [],
  },

  experimental: {
    // Slightly smaller client bundles.
    optimizePackageImports: [],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: isProd ? [...securityHeaders, hsts] : securityHeaders,
      },
      {
        // Long-cache immutable build assets.
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/.well-known/security.txt",
        headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
      },
    ];
  },

  async redirects() {
    return [
      // Friendly shortcuts people type or that appear in printed material.
      { source: "/book", destination: "/contact", permanent: false },
      { source: "/quote", destination: "/pricing#estimator", permanent: false },
      { source: "/demo", destination: "/demos", permanent: false },
    ];
  },
};

export default nextConfig;
