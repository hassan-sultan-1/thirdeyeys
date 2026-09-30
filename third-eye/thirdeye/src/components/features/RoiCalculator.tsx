"use client";

/**
 * RoiCalculator — "what is this admin time actually costing you?"
 * hours saved per week × hourly cost × staff = weekly / monthly / yearly.
 * Deliberately simple and honest: the visitor supplies every number.
 */
import { useId, useState } from "react";
import { roiDefaults } from "@/content/pricing";
import { Card } from "@/components/ui/Primitives";
import { money } from "@/lib/utils";

export function RoiCalculator() {
  const id = useId();
  const [hours, setHours] = useState(roiDefaults.hoursPerWeek);
  const [rate, setRate] = useState(roiDefaults.hourlyCost);
  const [staff, setStaff] = useState(roiDefaults.staffCount);

  const weekly = hours * rate * staff;
  const monthly = weekly * 4.33;
  const yearly = weekly * 52;
  const sym = roiDefaults.currencySymbol;

  const sliders = [
    {
      key: "hours",
      label: "Hours of repetitive admin saved per person, per week",
      value: hours,
      min: 1,
      max: 30,
      step: 1,
      set: setHours,
      format: (v: number) => `${v} hrs`,
    },
    {
      key: "rate",
      label: "Roughly what an hour of that person's time costs you",
      value: rate,
      min: 3,
      max: 80,
      step: 1,
      set: setRate,
      format: (v: number) => `${sym}${v}/hr`,
    },
    {
      key: "staff",
      label: "How many people does this affect?",
      value: staff,
      min: 1,
      max: 20,
      step: 1,
      set: setStaff,
      format: (v: number) => `${v} ${v === 1 ? "person" : "people"}`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card hover={false} className="p-6 sm:p-8">
        <fieldset className="space-y-7 border-0 p-0">
          <legend className="sr-only">Your numbers</legend>
          {sliders.map((s) => (
            <div key={s.key}>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <label htmlFor={`${id}-${s.key}`} className="text-sm font-medium">
                  {s.label}
                </label>
                <output
                  htmlFor={`${id}-${s.key}`}
                  className="shrink-0 rounded-lg bg-[var(--color-bg-soft)] px-3 py-1 text-sm font-bold tabular-nums text-[var(--color-brand-ink)]"
                >
                  {s.format(s.value)}
                </output>
              </div>
              <input
                id={`${id}-${s.key}`}
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-line)] accent-[var(--color-brand)]"
              />
            </div>
          ))}
        </fieldset>
      </Card>

      <Card hover={false} className="flex flex-col justify-center p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-brand-ink)]">
          Potential value of the time you get back
        </p>
        <dl className="mt-5 space-y-4" aria-live="polite">
          <div>
            <dt className="text-sm text-muted">Every week</dt>
            <dd className="font-[family-name:var(--font-heading)] text-2xl font-bold tabular-nums">
              {money(weekly, sym)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Every month</dt>
            <dd className="font-[family-name:var(--font-heading)] text-3xl font-bold tabular-nums">
              {money(monthly, sym)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Over a year</dt>
            <dd className="font-[family-name:var(--font-heading)] text-4xl font-bold tabular-nums text-[var(--color-brand-ink)]">
              {money(yearly, sym)}
            </dd>
          </div>
        </dl>
        <p className="mt-6 border-t border-[var(--color-line)] pt-4 text-xs leading-relaxed text-muted">
          {roiDefaults.note} This is the value of time freed up, not cash in
          the bank — the benefit shows up as capacity, fewer errors and better
          service. We will not pretend otherwise.
        </p>
      </Card>
    </div>
  );
}
