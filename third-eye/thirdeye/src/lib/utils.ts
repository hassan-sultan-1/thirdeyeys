/** Tiny class-name joiner (keeps bundle small — no clsx dependency). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** Format a number as currency without pulling in a heavy i18n lib. */
export function money(value: number, symbol = "$") {
  return `${symbol}${Math.round(value).toLocaleString("en-US")}`;
}

/** Human-friendly date (e.g. 22 September 2026). */
export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Clamp a number between min and max. */
export const clamp = (n: number, min: number, max: number) =>
  Math.min(Math.max(n, min), max);
