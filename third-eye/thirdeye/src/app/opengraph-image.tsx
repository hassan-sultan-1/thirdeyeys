/**
 * Dynamic Open Graph image (1200×630) generated at build/request time
 * with next/og — no design tool needed, always on brand.
 */
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1000px 500px at 85% -10%, #0b3b52 0%, transparent 60%), linear-gradient(135deg, #071324 0%, #0b1e38 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
          <svg width="64" height="64" viewBox="0 0 48 48" fill="none">
            <path d="M24 3.5 43.2 14v20L24 44.5 4.8 34V14L24 3.5Z" stroke="#14E0C8" strokeWidth="2.4" />
            <path d="M12 24s5-7.5 12-7.5S36 24 36 24s-5 7.5-12 7.5S12 24 12 24Z" stroke="#14E0C8" strokeWidth="2.2" />
            <circle cx="24" cy="24" r="3.6" fill="#14E0C8" />
          </svg>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>
            Third<span style={{ color: "#14E0C8" }}>Eye</span>
          </span>
        </div>

        <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2, maxWidth: 900 }}>
          Secure, AI-powered systems for small business
        </div>

        <div style={{ marginTop: 28, fontSize: 30, color: "#9FB3CC", maxWidth: 850 }}>
          Websites · AI assistants · Automation · Private AI
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 26,
            color: "#14E0C8",
            fontWeight: 600,
          }}
        >
          Smart systems. Serious security.
        </div>
      </div>
    ),
    { ...size },
  );
}
