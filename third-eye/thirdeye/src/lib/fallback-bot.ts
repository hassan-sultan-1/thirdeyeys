/**
 * fallback-bot.ts — OFFLINE / RULE-BASED ANSWERS
 * ---------------------------------------------------------------
 * Powers two things:
 *  1. the mini demo bots on /demos (always rule-based, by design)
 *  2. the site assistant when the AI API is unavailable
 *
 * Deliberately simple keyword scoring — predictable, instant, free,
 * and incapable of inventing an answer.
 */
import type { DemoIntent } from "@/content/demos";

export type Matched = { reply: string; followUps?: string[]; matched: boolean };

export function matchIntent(
  input: string,
  intents: DemoIntent[],
  fallback: string,
): Matched {
  const text = input.toLowerCase().trim();
  if (!text) return { reply: fallback, matched: false };

  let best: { intent: DemoIntent; score: number } | null = null;

  for (const intent of intents) {
    let score = 0;
    for (const kw of intent.keywords) {
      if (text.includes(kw)) {
        // Longer keyword matches are more specific, so weight them higher.
        score += kw.length > 6 ? 3 : kw.length > 3 ? 2 : 1;
      }
    }
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }

  if (!best) return { reply: fallback, matched: false };
  return { reply: best.intent.reply, followUps: best.intent.followUps, matched: true };
}
