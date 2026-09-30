/**
 * Logo — the Third Eye mark: an aperture/eye formed from a triangle,
 * with a scanning pupil. Pure inline SVG so it is crisp at any size,
 * themable with currentColor and costs no network request.
 * The standalone file version lives at /public/logo.svg.
 */
export function LogoMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="te-grad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14E0C8" />
          <stop offset="1" stopColor="#7C6CFF" />
        </linearGradient>
      </defs>
      {/* Outer shield/triangle — the "assurance" half of the mark */}
      <path
        d="M24 3.5 43.2 14v20L24 44.5 4.8 34V14L24 3.5Z"
        stroke="url(#te-grad)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      {/* Eye aperture */}
      <path
        d="M12 24s5-7.5 12-7.5S36 24 36 24s-5 7.5-12 7.5S12 24 12 24Z"
        stroke="url(#te-grad)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* Pupil */}
      <circle cx="24" cy="24" r="3.6" fill="url(#te-grad)" />
    </svg>
  );
}

export function LogoLockup({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark size={34} />
      <span className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight">
        Third<span className="text-[var(--color-brand-ink)]">Eye</span>
      </span>
    </span>
  );
}
