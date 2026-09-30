"use client";

/**
 * Accordion — accessible FAQ list.
 * Built on native <button aria-expanded> + region semantics so it is
 * fully keyboard operable and announced correctly by screen readers.
 */
import { useId, useState } from "react";
import { Icon } from "./Icon";
import { cn } from "@/lib/utils";

export type AccordionItem = { q: string; a: string };

export function Accordion({
  items,
  className,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([]);

  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i)
        ? prev.filter((n) => n !== i)
        : allowMultiple
          ? [...prev, i]
          : [i],
    );

  return (
    <div className={cn("divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)]", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-base font-semibold transition-colors hover:bg-[var(--color-bg-soft)] sm:px-6"
              >
                <span>{item.q}</span>
                <Icon
                  name="chevron-down"
                  className={cn(
                    "shrink-0 text-[var(--color-brand-ink)] transition-transform duration-300",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="px-5 pb-5 text-[0.98rem] leading-relaxed text-muted sm:px-6"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
