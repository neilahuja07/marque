import { testimonials } from "@/lib/dummy-data";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="exam-code text-[12px] text-brass">From the marginalia</p>
      <h2 className="mt-2 font-display text-[30px] text-ink">
        Students and tutors, on the record
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-6"
          >
            <blockquote className="font-display text-[17px] italic leading-relaxed text-ink">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-[13px] text-slate">
              <span className="font-medium text-ink">{t.name}</span> — {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
