"use client";

/**
 * DemoPlayground — pick a niche, talk to that industry's assistant.
 * ---------------------------------------------------------------
 * These demos are rule-based on purpose (see src/content/demos.ts):
 * instant, free, offline-proof and identical every time you show a
 * client. A real deployment uses the AI endpoint with your content.
 */
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { demos, type Demo } from "@/content/demos";
import { matchIntent } from "@/lib/fallback-bot";
import { Icon } from "@/components/ui/Icon";
import { Badge, buttonClass } from "@/components/ui/Primitives";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

type Msg = { role: "user" | "bot"; text: string };

export function DemoPlayground() {
  const [active, setActive] = useState<Demo>(demos[0]);
  const [messages, setMessages] = useState<Msg[]>([{ role: "bot", text: demos[0].greeting }]);
  const [chips, setChips] = useState<string[]>(demos[0].starters);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const switchDemo = (demo: Demo) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActive(demo);
    setMessages([{ role: "bot", text: demo.greeting }]);
    setChips(demo.starters);
    setInput("");
    setTyping(false);
    track("demo_selected", { niche: demo.slug });
  };

  const send = (raw: string) => {
    const text = raw.trim().slice(0, 300);
    if (!text || typing) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setChips([]);
    setTyping(true);

    const { reply, followUps } = matchIntent(text, active.intents, active.fallback);
    // A short, human-feeling pause — not a fake "thinking" delay.
    timerRef.current = setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: reply }]);
      setChips(followUps ?? active.starters.slice(0, 2));
      setTyping(false);
    }, 550);
  };

  return (
    <div>
      {/* Niche selector */}
      <div
        role="tablist"
        aria-label="Choose an industry demo"
        className="mx-auto mb-8 flex w-full max-w-xl flex-col gap-2 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-2 sm:flex-row"
      >
        {demos.map((d) => {
          const isActive = d.slug === active.slug;
          return (
            <button
              key={d.slug}
              role="tab"
              aria-selected={isActive}
              onClick={() => switchDemo(d)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                isActive
                  ? "bg-[var(--color-brand)] text-navy-950 shadow-[0_8px_20px_-12px_var(--color-brand)]"
                  : "text-muted hover:bg-[var(--color-bg-soft)] hover:text-[var(--color-ink)]",
              )}
            >
              <Icon name={d.icon} size={17} />
              {d.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-start">
        {/* Context panel */}
        <div className="order-2 lg:order-1">
          <Badge tone="neutral" className="mb-3">
            <Icon name="info" size={13} /> Sample business
          </Badge>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl font-bold">
            {active.business}
          </h3>
          <p className="mt-3 leading-relaxed text-muted">{active.blurb}</p>

          <h4 className="mt-7 text-sm font-bold uppercase tracking-wider">Try asking</h4>
          <ul className="mt-3 flex flex-wrap gap-2">
            {active.starters.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-[var(--color-line)] px-3.5 py-1.5 text-xs font-medium text-muted transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>

          {active.slug === "clinics" && (
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/8 p-4">
              <p className="text-sm leading-relaxed">
                <strong className="font-semibold">Safety boundary:</strong> ask this
                demo a medical question and watch what it does. Clinic assistants
                we build handle scheduling and published information only — never
                diagnosis, triage or treatment advice.
              </p>
            </div>
          )}

          <Link
            href="/contact?service=AI%20chat%20assistant&message=I%20tried%20the%20live%20demo%20and%20would%20like%20one%20for%20my%20business."
            onClick={() => track("cta_click", { location: "demo", label: "Get this for my business" })}
            className={buttonClass("primary", "md", "mt-7")}
          >
            Get this for my business
            <Icon name="arrow-right" size={18} />
          </Link>
        </div>

        {/* Chat window */}
        <div className="order-1 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-lift)] lg:order-2">
          <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand-ink)]">
              <Icon name={active.icon} size={18} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{active.business}</p>
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Assistant online
              </p>
            </div>
          </div>

          <div
            ref={logRef}
            role="log"
            aria-live="polite"
            aria-label={`${active.label} demo conversation`}
            className="h-[26rem] space-y-3 overflow-y-auto p-4"
          >
            {messages.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "rounded-br-sm bg-[var(--color-brand)] text-navy-950"
                      : "rounded-bl-sm bg-[var(--color-bg-soft)]",
                  )}
                >
                  <span className="sr-only">{m.role === "user" ? "You: " : "Assistant: "}</span>
                  {m.text}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-[var(--color-bg-soft)] px-4 py-3">
                  <span className="sr-only">Assistant is typing</span>
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      aria-hidden
                      className="h-1.5 w-1.5 animate-typing rounded-full bg-[var(--color-ink-soft)]"
                      style={{ animationDelay: `${d * 160}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {chips.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {chips.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => send(c)}
                    className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-[var(--color-line)] p-3"
          >
            <div className="flex items-center gap-2">
              <label htmlFor="demo-input" className="sr-only">
                Message the {active.label} demo assistant
              </label>
              <input
                id="demo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={300}
                autoComplete="off"
                placeholder={`Ask the ${active.label.toLowerCase()} assistant…`}
                className="min-w-0 flex-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-brand)]"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)] text-navy-950 transition-transform hover:scale-105 disabled:opacity-40"
              >
                <Icon name="send" size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-muted">{active.caption}</p>
    </div>
  );
}
