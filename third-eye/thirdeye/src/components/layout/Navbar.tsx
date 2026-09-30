"use client";

/**
 * Navbar — sticky, translucent, keyboard accessible.
 * - Highlights the current section
 * - Mobile drawer with focus trap-ish behaviour (Esc closes, body locks)
 * - Scroll progress bar doubles as a subtle "page position" cue
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { LogoLockup } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Icon } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui/Primitives";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Scroll state + reading progress
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 8);
        setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Esc closes the mobile menu; lock background scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-[var(--color-line)] bg-[color-mix(in_oklab,var(--color-bg)_88%,transparent)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      {/* reading progress */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-[var(--color-brand)] to-violet-500 transition-transform duration-150"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <nav aria-label="Main" className="mx-auto flex h-18 max-w-[88rem] items-center gap-4 px-5 py-3 sm:px-8">
        <Link
          href="/"
          className="shrink-0 rounded-lg transition-opacity hover:opacity-85"
          aria-label={`${site.name} — home`}
        >
          <LogoLockup />
        </Link>

        {/* Desktop links */}
        <ul className="ms-auto hidden items-center gap-0.5 lg:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "text-[var(--color-brand-ink)]"
                    : "text-muted hover:text-[var(--color-ink)]",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[var(--color-brand)]"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-2 lg:ms-0">
          <ThemeToggle />
          {/* Wrapped in a span so the display utility isn't fighting the
              button's own `inline-flex` — the CTA is hidden on small phones. */}
          <span className="hidden sm:block">
            <Link
              href="/contact"
              onClick={() => track("cta_click", { location: "navbar", label: "Book free consultation" })}
              className={buttonClass("primary", "sm", "whitespace-nowrap")}
            >
              Book free consultation
            </Link>
          </span>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] lg:hidden"
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="border-t border-[var(--color-line)] bg-[var(--color-bg)] lg:hidden"
      >
        <ul className="space-y-1 px-5 py-4">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-[var(--color-bg-soft)] text-[var(--color-brand-ink)]"
                    : "hover:bg-[var(--color-bg-soft)]",
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => track("cta_click", { location: "mobile_nav", label: "Book free consultation" })}
              className={buttonClass("primary", "md", "w-full")}
            >
              Book free consultation
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
