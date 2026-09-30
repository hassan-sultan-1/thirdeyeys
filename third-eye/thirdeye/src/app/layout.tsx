/**
 * layout.tsx — ROOT LAYOUT
 * Fonts, theme bootstrap, global chrome (nav, footer, chat, cookie
 * banner) and the site-wide structured data.
 */
import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

import { site } from "@/content/site";
import { baseUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/Primitives";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { RevealProvider } from "@/components/ui/RevealProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";

/* Google Fonts are downloaded at build time and self-hosted by Next,
   so there is no third-party request and no layout shift. */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.description,
  keywords: [...site.seo.keywords],
  applicationName: site.name,
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.seo.defaultTitle,
    description: site.description,
    url: baseUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#071324" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

/**
 * Runs before first paint to apply the saved theme — prevents the
 * white flash when a dark-mode visitor loads the page.
 * It is nonced, so it satisfies the strict Content Security Policy.
 */
const themeBootstrap = `
(function(){
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = stored ? stored === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`;

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Nonce generated per request by src/middleware.ts
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  // The locale/direction come from config so Urdu (RTL) can be added
  // later by flipping `enabled` in src/content/site.ts.
  const locale = site.i18n.locales.find((l) => l.code === site.i18n.defaultLocale)!;

  return (
    <html
      lang={locale.code}
      dir={locale.dir}
      className={`${inter.variable} ${spaceGrotesk.variable} no-js`}
      suppressHydrationWarning
    >
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="min-h-dvh antialiased">
        {/* Keyboard users can jump straight past the navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-xl focus:bg-[var(--color-brand)] focus:px-5 focus:py-3 focus:font-semibold focus:text-navy-950"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" tabIndex={-1} className="focus-visible:outline-none">
          {children}
        </main>

        <Footer />

        {/* Floating chrome */}
        <BackToTop />
        <ChatWidget />
        <CookieBanner />

        {/* Behaviour + measurement */}
        <RevealProvider />
        <Analytics />

        {/* Site-wide structured data */}
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
