"use client";

import { stats } from "@/lib/dummy-data";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function Statistics() {
  return (
    <section className="border-b border-ink/10 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label}>
            <AnimatedCounter
              target={s.value}
              className="font-display text-[26px] text-ink"
            />
            <p className="mt-1 text-[13px] text-slate">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
