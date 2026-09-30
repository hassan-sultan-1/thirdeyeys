"use client";

/**
 * SecurityQuiz — 10-question self-check producing a score, a band,
 * plain-language advice and a call to action.
 * Nothing is sent anywhere: the whole quiz runs in the browser.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { maxQuizScore, quizBands, quizDisclaimer, quizQuestions } from "@/content/quiz";
import { Badge, buttonClass, Card } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";

export function SecurityQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [done, setDone] = useState(false);

  const total = quizQuestions.length;
  const current = quizQuestions[step];
  const progress = done ? 100 : Math.round((step / total) * 100);

  const score = useMemo(
    () => Object.values(answers).reduce((a, b) => a + b, 0),
    [answers],
  );
  const percent = Math.round((score / maxQuizScore) * 100);
  const band = quizBands.find((b) => percent >= b.min && percent <= b.max) ?? quizBands[0];

  const answer = (points: number) => {
    const next = { ...answers, [current.id]: points };
    setAnswers(next);
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      const finalScore = Object.values(next).reduce((a, b) => a + b, 0);
      const finalPercent = Math.round((finalScore / maxQuizScore) * 100);
      track("quiz_completed", { score: finalPercent });
      setDone(true);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setDone(false);
  };

  const toneClasses = {
    danger: "text-rose-600 dark:text-rose-400",
    warn: "text-amber-600 dark:text-amber-400",
    good: "text-emerald-600 dark:text-emerald-400",
    great: "text-[var(--color-brand-ink)]",
  } as const;

  return (
    <Card hover={false} className="mx-auto max-w-2xl overflow-hidden p-0">
      {/* Progress */}
      <div className="border-b border-[var(--color-line)] px-6 py-4 sm:px-8">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-muted">
          <span>{done ? "Your result" : `Question ${step + 1} of ${total}`}</span>
          <span>{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Quiz progress"
          className="h-1.5 overflow-hidden rounded-full bg-[var(--color-bg-soft)]"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand)] to-violet-500 transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!done ? (
        <div className="p-6 sm:p-8">
          <fieldset className="border-0 p-0">
            <legend className="mb-1 font-[family-name:var(--font-heading)] text-xl font-bold">
              {current.q}
            </legend>
            {current.help && <p className="mb-5 text-sm text-muted">{current.help}</p>}
            <div className="mt-5 space-y-3">
              {current.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => answer(o.points)}
                  className="flex w-full items-center justify-between gap-4 rounded-xl border border-[var(--color-line)] px-5 py-4 text-start text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[var(--color-brand)] hover:bg-[var(--color-brand)]/6"
                >
                  {o.label}
                  <Icon name="arrow-right" size={16} className="shrink-0 text-[var(--color-brand-ink)]" />
                </button>
              ))}
            </div>
          </fieldset>

          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-[var(--color-ink)]"
            >
              <Icon name="arrow-right" size={14} className="rotate-180" />
              Back
            </button>
          )}
        </div>
      ) : (
        <div className="animate-fade-up p-6 sm:p-8">
          <div className="flex flex-wrap items-end gap-4">
            <p
              className={cn(
                "font-[family-name:var(--font-heading)] text-6xl font-bold tabular-nums",
                toneClasses[band.tone],
              )}
            >
              {percent}
              <span className="text-2xl text-muted">/100</span>
            </p>
            <Badge
              tone={
                band.tone === "danger" ? "danger" : band.tone === "warn" ? "warn" : "good"
              }
              className="mb-2"
            >
              {band.grade}
            </Badge>
          </div>

          <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{band.summary}</p>

          <h3 className="mt-7 text-sm font-bold uppercase tracking-wider">
            Where to start
          </h3>
          <ul className="mt-3 space-y-2.5">
            {band.advice.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-sm leading-relaxed">
                <Icon name="check" size={16} className="mt-1 shrink-0 text-[var(--color-brand-ink)]" />
                {a}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact?service=Free%20security%20review&message=I%20took%20the%20website%20security%20quiz%20and%20would%20like%20a%20free%20security%20review."
              onClick={() => track("cta_click", { location: "quiz_result", label: "Book free security review" })}
              className={buttonClass("primary", "md", "flex-1")}
            >
              Book a free security review
              <Icon name="arrow-right" size={18} />
            </Link>
            <button type="button" onClick={restart} className={buttonClass("secondary", "md")}>
              <Icon name="reset" size={16} />
              Start again
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted">{quizDisclaimer}</p>
        </div>
      )}
    </Card>
  );
}
