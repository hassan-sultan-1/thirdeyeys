"use client";

/**
 * ThemeToggle — light / dark switch.
 * The initial theme is applied by an inline script in layout.tsx
 * (before paint) so there is no flash of the wrong theme.
 * Choice is stored in localStorage under "theme"; if the user has
 * never chosen, we follow the OS setting.
 */
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

const STORAGE_KEY = "theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      /* private mode — just skip persistence */
    }
    setDark(next);
  };

  // Render a stable, labelled control even before hydration resolves.
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)] ${className ?? ""}`}
    >
      <span className="sr-only">{label}</span>
      {dark === null ? (
        <Icon name="sun" className="opacity-60" />
      ) : dark ? (
        <Icon name="sun" />
      ) : (
        <Icon name="moon" />
      )}
    </button>
  );
}
