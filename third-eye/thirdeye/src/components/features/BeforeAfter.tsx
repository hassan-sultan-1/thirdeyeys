"use client";

/**
 * BeforeAfter — draggable comparison slider.
 * ---------------------------------------------------------------
 * Works with mouse, touch AND keyboard (the handle is a real range
 * input, so arrow keys move it and screen readers announce it).
 *
 * The two "screenshots" are inline SVG mock-ups rather than images:
 * they are honest (clearly illustrations, not a real client's site),
 * weigh almost nothing, and stay sharp on any screen.
 */
import { useState } from "react";
import { Badge } from "@/components/ui/Primitives";

function OldSiteMock() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Illustration of a dated, cluttered website: small text, low contrast and a busy layout">
      <rect width="800" height="500" fill="#e8e6e1" />
      <rect x="0" y="0" width="800" height="54" fill="#b9b4aa" />
      <rect x="18" y="18" width="120" height="18" fill="#8a857c" />
      <rect x="520" y="20" width="52" height="12" fill="#8a857c" />
      <rect x="584" y="20" width="52" height="12" fill="#8a857c" />
      <rect x="648" y="20" width="52" height="12" fill="#8a857c" />
      <rect x="712" y="20" width="52" height="12" fill="#8a857c" />
      {/* clashing hero */}
      <rect x="0" y="54" width="800" height="150" fill="#cfc9bd" />
      <rect x="28" y="84" width="380" height="20" fill="#9a958b" />
      <rect x="28" y="116" width="300" height="12" fill="#a8a399" />
      <rect x="28" y="136" width="330" height="12" fill="#a8a399" />
      <rect x="28" y="162" width="96" height="26" fill="#8a857c" />
      {/* cramped body */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={28 + i * 188} y={226} width={168} height={92} fill="#dcd8d0" />
          <rect x={38 + i * 188} y={236} width={100} height={10} fill="#a8a399" />
          <rect x={38 + i * 188} y={254} width={140} height={8} fill="#bdb8ae" />
          <rect x={38 + i * 188} y={268} width={120} height={8} fill="#bdb8ae" />
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={28} y={344 + i * 16} width={740 - (i % 3) * 60} height={7} fill="#c6c1b7" />
      ))}
      <rect x="0" y="468" width="800" height="32" fill="#b9b4aa" />
    </svg>
  );
}

function NewSiteMock() {
  return (
    <svg viewBox="0 0 800 500" className="h-full w-full" role="img" aria-label="Illustration of a modern website: clear headline, generous spacing, strong call-to-action button and tidy cards">
      <defs>
        <linearGradient id="ba-hero" x1="0" y1="0" x2="800" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#071324" />
          <stop offset="1" stopColor="#0B1E38" />
        </linearGradient>
        <linearGradient id="ba-accent" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#14E0C8" />
          <stop offset="1" stopColor="#7C6CFF" />
        </linearGradient>
      </defs>
      <rect width="800" height="500" fill="#ffffff" />
      {/* nav */}
      <rect x="0" y="0" width="800" height="56" fill="#ffffff" />
      <circle cx="34" cy="28" r="10" fill="none" stroke="url(#ba-accent)" strokeWidth="2.4" />
      <rect x="52" y="22" width="66" height="12" rx="6" fill="#071324" />
      <rect x="520" y="24" width="44" height="8" rx="4" fill="#9FB3CC" />
      <rect x="578" y="24" width="44" height="8" rx="4" fill="#9FB3CC" />
      <rect x="636" y="16" width="130" height="26" rx="13" fill="#14E0C8" />
      {/* hero */}
      <rect x="0" y="56" width="800" height="248" fill="url(#ba-hero)" />
      <circle cx="690" cy="120" r="120" fill="#14E0C8" opacity="0.14" />
      <rect x="48" y="104" width="420" height="24" rx="12" fill="#ffffff" />
      <rect x="48" y="142" width="330" height="24" rx="12" fill="#14E0C8" />
      <rect x="48" y="186" width="380" height="9" rx="4.5" fill="#9FB3CC" />
      <rect x="48" y="204" width="300" height="9" rx="4.5" fill="#9FB3CC" />
      <rect x="48" y="234" width="150" height="34" rx="17" fill="#14E0C8" />
      <rect x="212" y="234" width="130" height="34" rx="17" fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.6" />
      {/* cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={48 + i * 240} y={334} width={208} height={118} rx="16" fill="#F5F8FC" stroke="#DFE7F1" />
          <circle cx={76 + i * 240} cy={366} r="13" fill="#14E0C8" opacity="0.2" />
          <rect x={64 + i * 240} y={392} width={110} height={11} rx="5.5" fill="#071324" />
          <rect x={64 + i * 240} y={412} width={160} height={8} rx="4" fill="#9FB3CC" />
          <rect x={64 + i * 240} y={428} width={130} height={8} rx="4" fill="#9FB3CC" />
        </g>
      ))}
    </svg>
  );
}

export function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <figure className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-line)] shadow-[var(--shadow-lift)]">
        <div className="relative aspect-[8/5] w-full select-none">
          {/* AFTER (base layer) */}
          <div className="absolute inset-0">
            <NewSiteMock />
          </div>

          {/* BEFORE (clipped layer) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <OldSiteMock />
          </div>

          {/* Labels */}
          <span className="pointer-events-none absolute start-3 top-3">
            <Badge tone="neutral">Before</Badge>
          </span>
          <span className="pointer-events-none absolute end-3 top-3">
            <Badge tone="brand">After</Badge>
          </span>

          {/* Divider */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(7,19,36,0.25)]"
            style={{ left: `${position}%` }}
          >
            <span className="absolute top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 7l-5 5l5 5M15 7l5 5l-5 5" />
              </svg>
            </span>
          </div>

          {/* The actual control — invisible but fully accessible */}
          <label htmlFor="ba-slider" className="sr-only">
            Reveal more of the old design or the new design
          </label>
          <input
            id="ba-slider"
            type="range"
            min={0}
            max={100}
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            aria-valuetext={`${position}% of the old design shown`}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted">
        Illustration of a typical redesign — drag the handle, or use the arrow
        keys. These are sample mock-ups, not a real client&apos;s website.
      </figcaption>
    </figure>
  );
}
