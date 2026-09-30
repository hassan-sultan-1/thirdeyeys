"use client";

/**
 * RevealProvider — global scroll-reveal engine.
 * ---------------------------------------------------------------
 * Any element (even in a server component) can opt in with the
 * `data-reveal` attribute — no wrapper component, no extra JS per
 * section. One IntersectionObserver handles the whole page, and a
 * MutationObserver picks up elements added after navigation.
 *
 * Accessibility: if the user prefers reduced motion we simply mark
 * everything visible and never animate.
 */
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    // Remove the .no-js fallback once React has hydrated.
    document.documentElement.classList.remove("no-js");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = () => Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      targets().forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger siblings for a pleasant cascade.
          const index = Number(el.dataset.revealIndex ?? 0);
          el.style.setProperty("--reveal-delay", `${Math.min(index, 6) * 70}ms`);
          el.classList.add("is-visible");
          observer.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () =>
      targets().forEach((el) => {
        if (!el.classList.contains("is-visible")) observer.observe(el);
      });

    observeAll();

    // Watch for content added by client-side interactions/navigation.
    const mutation = new MutationObserver(observeAll);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, [pathname]);

  return null;
}
