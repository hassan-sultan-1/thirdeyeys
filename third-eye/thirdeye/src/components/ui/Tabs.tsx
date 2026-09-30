"use client";

/**
 * Tabs — WAI-ARIA tab pattern with arrow-key navigation.
 * The active tab is mirrored in the URL (?tab=slug) so links like
 * /industries?tab=clinics open the right panel and can be shared.
 */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type TabItem = { id: string; label: string; icon?: ReactNode; panel: ReactNode };

export function Tabs({
  items,
  paramKey = "tab",
  className,
  ariaLabel,
}: {
  items: TabItem[];
  paramKey?: string;
  className?: string;
  ariaLabel: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const fromUrl = params.get(paramKey);
  const initial = items.find((i) => i.id === fromUrl)?.id ?? items[0].id;
  const [active, setActive] = useState(initial);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (fromUrl && items.some((i) => i.id === fromUrl)) setActive(fromUrl);
  }, [fromUrl, items]);

  const select = useCallback(
    (id: string, focus = false) => {
      setActive(id);
      const next = new URLSearchParams(Array.from(params.entries()));
      next.set(paramKey, id);
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
      if (focus) {
        const idx = items.findIndex((i) => i.id === id);
        refs.current[idx]?.focus();
      }
    },
    [items, paramKey, params, pathname, router],
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = items.findIndex((i) => i.id === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    select(items[next].id, true);
  };

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        onKeyDown={onKeyDown}
        className="mx-auto mb-10 flex w-full max-w-2xl flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-2 sm:flex-row"
      >
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(item.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-[var(--color-brand)] text-navy-950 shadow-[0_8px_20px_-12px_var(--color-brand)]"
                  : "text-muted hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== active}
          tabIndex={0}
          className="animate-fade-up focus-visible:outline-none"
        >
          {item.id === active ? item.panel : null}
        </div>
      ))}
    </div>
  );
}
