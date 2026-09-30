"use client";

/**
 * ChatWidget — the always-on site assistant.
 * ---------------------------------------------------------------
 * • Talks to /api/chat (the API key stays on the server, never here)
 * • Falls back to canned rule-based answers if the API is unavailable
 * • Fully keyboard accessible, Esc closes, focus returns to launcher
 * • Messages are rendered as plain text by React — never innerHTML —
 *   so nothing the model or the user types can inject markup
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { fallbackDefault, fallbackKnowledge } from "@/content/demos";
import { matchIntent } from "@/lib/fallback-bot";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string; offline?: boolean };

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hi! I'm the Third Eye assistant. Ask me about our services, prices, security, or book a free consultation. What brings you here today?",
};

const STARTERS = [
  "What do you build?",
  "How much does a website cost?",
  "How do you keep data safe?",
  "Book a free consultation",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Nudge first-time visitors once, gently, after they have read a bit. */
  useEffect(() => {
    const t = setTimeout(() => setUnread(true), 25000);
    return () => clearTimeout(t);
  }, []);

  /* Keep the newest message in view. */
  useEffect(() => {
    if (!open) return;
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open, busy]);

  /* Esc to close; focus management for keyboard users. */
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim().slice(0, 500);
      if (!text || busy) return;

      const next: Msg[] = [...messages, { role: "user", content: text }];
      setMessages(next);
      setInput("");
      setBusy(true);
      track("chat_message_sent", { length: text.length });

      /** Local answer used whenever the API cannot help. */
      const offlineReply = () => {
        const { reply } = matchIntent(text, fallbackKnowledge, fallbackDefault);
        setMessages((m) => [...m, { role: "assistant", content: reply, offline: true }]);
      };

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // Only the last few turns are sent: less data, lower cost.
            messages: next.slice(-8).map((m) => ({ role: m.role, content: m.content })),
          }),
        });
        clearTimeout(timeout);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          if (res.status === 429 && data?.reply) {
            setMessages((m) => [...m, { role: "assistant", content: data.reply, offline: true }]);
          } else {
            offlineReply();
          }
          return;
        }

        const data = (await res.json()) as { reply?: string; offline?: boolean };
        if (data?.reply) {
          setMessages((m) => [
            ...m,
            { role: "assistant", content: data.reply as string, offline: data.offline },
          ]);
        } else {
          offlineReply();
        }
      } catch {
        offlineReply();
      } finally {
        setBusy(false);
      }
    },
    [busy, messages],
  );

  return (
    <>
      {/* Launcher */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          setUnread(false);
          if (!open) track("chat_opened", { source: "launcher" });
        }}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? "Close the Third Eye assistant" : "Open the Third Eye assistant"}
        className={cn(
          "no-print fixed bottom-6 end-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full",
          "bg-[var(--color-brand)] text-navy-950 shadow-[0_12px_32px_-12px_var(--color-brand)]",
          "transition-transform duration-300 hover:scale-105 active:scale-95",
          !open && "animate-pulse-ring",
        )}
      >
        <Icon name={open ? "x" : "chat"} size={24} />
        {unread && !open && (
          <span
            aria-hidden
            className="absolute -top-0.5 -end-0.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--color-bg)] bg-violet-500"
          />
        )}
      </button>

      {/* Panel */}
      <div
        id="chat-panel"
        ref={panelRef}
        role="dialog"
        aria-label="Third Eye assistant"
        aria-modal="false"
        hidden={!open}
        className="no-print fixed bottom-24 end-4 z-50 flex h-[min(34rem,calc(100dvh-8rem))] w-[min(24rem,calc(100vw-2rem))] animate-fade-up flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] shadow-[var(--shadow-lift)]"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--color-line)] bg-[var(--color-bg-soft)] px-4 py-3">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand)]/15 text-[var(--color-brand-ink)]">
            <Icon name="sparkles" size={18} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">Third Eye assistant</p>
            <p className="truncate text-xs text-muted">Answers about services, pricing & booking</p>
          </div>
          <button
            type="button"
            onClick={() => { setOpen(false); launcherRef.current?.focus(); }}
            aria-label="Close assistant"
            className="ms-auto rounded-lg p-1.5 text-muted transition-colors hover:bg-[var(--color-bg)] hover:text-[var(--color-ink)]"
          >
            <Icon name="x" size={18} />
          </button>
        </div>

        {/* Message log */}
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-atomic="false"
          className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "rounded-br-sm bg-[var(--color-brand)] text-navy-950"
                    : "rounded-bl-sm bg-[var(--color-bg-soft)] text-[var(--color-ink)]",
                )}
              >
                <span className="sr-only">{m.role === "user" ? "You said: " : "Assistant said: "}</span>
                {/* Rendered as text by React — no HTML injection possible */}
                {m.content}
                {m.offline && (
                  <span className="mt-1.5 block text-[0.7rem] font-medium text-muted">
                    Offline answer
                  </span>
                )}
              </div>
            </div>
          ))}

          {busy && (
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

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-[var(--color-line)] px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand-ink)]"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="border-t border-[var(--color-line)] p-3"
        >
          <div className="flex items-center gap-2">
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Ask about pricing, security, booking…"
              className="min-w-0 flex-1 rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-brand)]"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-brand)] text-navy-950 transition-transform hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
            >
              <Icon name="send" size={18} />
            </button>
          </div>
          <p className="mt-2 text-[0.7rem] leading-snug text-muted">
            AI assistant — it can be wrong and never gives medical, legal or
            financial advice. Please don&apos;t share sensitive personal details.
          </p>
        </form>
      </div>
    </>
  );
}
