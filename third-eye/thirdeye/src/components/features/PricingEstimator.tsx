"use client";

/**
 * PricingEstimator — pick what you need, see an indicative price.
 * All numbers come from src/content/pricing.ts (estimator.*).
 * "Request this quote" carries the selection into the contact form
 * via URL parameters, so the visitor never retypes it.
 */
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { currency, estimator } from "@/content/pricing";
import { Icon } from "@/components/ui/Icon";
import { buttonClass, Card } from "@/components/ui/Primitives";
import { money, cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function PricingEstimator() {
  const router = useRouter();
  const [pages, setPages] = useState(estimator.pages.default);
  const [selected, setSelected] = useState<string[]>(["chatbot"]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const totals = useMemo(() => {
    const extraPages = Math.max(0, pages - 1);
    let setup = estimator.base.setup + extraPages * estimator.perPage.setup;
    let monthly = estimator.base.monthly + extraPages * estimator.perPage.monthly;
    estimator.options.forEach((o) => {
      if (selected.includes(o.id)) {
        setup += o.setup;
        monthly += o.monthly;
      }
    });
    return { setup, monthly };
  }, [pages, selected]);

  const chosenLabels = estimator.options
    .filter((o) => selected.includes(o.id))
    .map((o) => o.label);

  const requestQuote = () => {
    track("estimator_quote_requested", {
      pages,
      options: chosenLabels.join(", ") || "none",
      setup: totals.setup,
      monthly: totals.monthly,
    });
    const summary =
      `I used the estimator and would like a quote for:\n` +
      `• Pages: ${pages}\n` +
      `• Extras: ${chosenLabels.length ? chosenLabels.join(", ") : "none"}\n` +
      `• Estimated setup: ${money(totals.setup, currency.symbol)}\n` +
      `• Estimated monthly: ${money(totals.monthly, currency.symbol)}\n\n` +
      `Please confirm what this would really cost for my business.`;
    const params = new URLSearchParams({
      service: chosenLabels.join(", ") || "Website",
      message: summary,
      source: "estimator",
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-start">
      {/* ---- Controls ---- */}
      <Card hover={false} className="p-6 sm:p-8">
        <fieldset className="border-0 p-0">
          <legend className="sr-only">Build your estimate</legend>

          {/* Pages slider */}
          <div className="mb-8">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <label htmlFor="pages" className="text-sm font-bold">
                How many pages do you need?
              </label>
              <output
                htmlFor="pages"
                className="rounded-lg bg-[var(--color-bg-soft)] px-3 py-1 text-sm font-bold tabular-nums text-[var(--color-brand-ink)]"
              >
                {pages} {pages === 1 ? "page" : "pages"}
              </output>
            </div>
            <input
              id="pages"
              type="range"
              min={estimator.pages.min}
              max={estimator.pages.max}
              step={1}
              value={pages}
              onChange={(e) => setPages(Number(e.target.value))}
              aria-describedby="pages-help"
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-line)] accent-[var(--color-brand)]"
            />
            <p id="pages-help" className="mt-2 text-xs text-muted">
              Home, about, services, contact and a menu or product page is usually about 5.
            </p>
          </div>

          {/* Option checkboxes */}
          <div>
            <p className="mb-3 text-sm font-bold">What would you like included?</p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {estimator.options.map((o) => {
                const active = selected.includes(o.id);
                return (
                  <li key={o.id}>
                    <label
                      className={cn(
                        "flex h-full cursor-pointer gap-3 rounded-xl border p-4 transition-all",
                        active
                          ? "border-[var(--color-brand)] bg-[var(--color-brand)]/8"
                          : "border-[var(--color-line)] hover:border-[var(--color-brand)]/50",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={active}
                        onChange={() => toggle(o.id)}
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-brand)]"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{o.label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-muted">{o.help}</span>
                        <span className="mt-1.5 block text-xs font-medium text-[var(--color-brand-ink)]">
                          +{money(o.setup, currency.symbol)} setup · +{money(o.monthly, currency.symbol)}/mo
                        </span>
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </fieldset>
      </Card>

      {/* ---- Result ---- */}
      <Card hover={false} className="sticky top-24 overflow-hidden p-0">
        <div className="bg-navy-900 p-6 text-navy-50 dark:bg-navy-950 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">
            Your estimate
          </p>

          <div className="mt-5" aria-live="polite">
            <p className="text-sm text-navy-200">One-time setup</p>
            <p className="font-[family-name:var(--font-heading)] text-4xl font-bold tabular-nums">
              {money(totals.setup, currency.symbol)}
            </p>

            <p className="mt-5 text-sm text-navy-200">Then monthly</p>
            <p className="font-[family-name:var(--font-heading)] text-3xl font-bold tabular-nums">
              {money(totals.monthly, currency.symbol)}
              <span className="text-base font-medium text-navy-200">/month</span>
            </p>
          </div>

          <ul className="mt-6 space-y-1.5 border-t border-white/10 pt-5 text-sm text-navy-100">
            <li className="flex items-start gap-2">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-teal-300" />
              {pages} {pages === 1 ? "page" : "pages"}, custom designed
            </li>
            {chosenLabels.map((l) => (
              <li key={l} className="flex items-start gap-2">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-teal-300" />
                {l}
              </li>
            ))}
            <li className="flex items-start gap-2">
              <Icon name="check" size={16} className="mt-0.5 shrink-0 text-teal-300" />
              HTTPS, backups and security headers (always included)
            </li>
          </ul>
        </div>

        <div className="p-6 sm:p-8">
          <button type="button" onClick={requestQuote} className={buttonClass("primary", "lg", "w-full")}>
            Request this quote
            <Icon name="arrow-right" size={18} />
          </button>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            Indicative only, based on placeholder rates. Your fixed written
            quote comes after a free 30-minute consultation — no obligation.
          </p>
        </div>
      </Card>
    </div>
  );
}
