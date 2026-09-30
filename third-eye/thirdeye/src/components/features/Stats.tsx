/**
 * Stats — animated counters.
 * The numbers are targets and build standards, clearly labelled as
 * sample data. We do not publish invented client results.
 */
import { stats, statsDisclaimer } from "@/content/pricing";
import { Counter } from "@/components/ui/Counter";
import { Container } from "@/components/ui/Primitives";

export function Stats() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="relative overflow-hidden bg-navy-900 py-16 text-navy-50 dark:bg-navy-950 sm:py-20"
    >
      <div aria-hidden className="aurora start-[-10%] top-[-30%] h-72 w-72 bg-teal-500/40" />
      <div aria-hidden className="aurora end-[-8%] bottom-[-40%] h-80 w-80 bg-violet-500/30" />

      <Container className="relative">
        <h2 id="stats-heading" className="sr-only">
          What we build towards
        </h2>

        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal data-reveal-index={i} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <p className="font-[family-name:var(--font-heading)] text-5xl font-bold tabular-nums text-teal-300">
                  <Counter value={s.value} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </p>
                <p className="mt-2 font-semibold">{s.label}</p>
                <p className="mt-1 text-sm text-navy-200">{s.hint}</p>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-navy-300">
          {statsDisclaimer}
        </p>
      </Container>
    </section>
  );
}
