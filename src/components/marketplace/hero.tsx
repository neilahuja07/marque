import Link from "next/link";
import { HeroAuthForm } from "./hero-auth-form";

export function Hero() {
  return (
    <section className="border-b border-ink/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <h1 className="font-display text-[40px] leading-[1.1] text-ink md:text-[56px]">
            Study material marked to the syllabus, not the guess.
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-slate">
            Past papers, mock tests, worksheets and revision notes for Cambridge
            Mathematics, Science and English — every resource tagged to its exact
            exam code and session.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/browse"
              className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[15px] font-medium text-white"
            >
              Browse resources
            </Link>
            <Link
              href="/categories"
              className="btn-outline rounded-[8px] border border-ink/15 px-6 py-3 text-[15px] font-medium text-ink"
            >
              View subjects
            </Link>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-slate">
            <li className="tick-mark">Examiner-checked mark schemes</li>
            <li className="tick-mark">Instant digital download</li>
            <li className="tick-mark">Updated every session</li>
          </ul>
        </div>

        <div className="animate-fade-in-up">
          <HeroAuthForm />
        </div>
      </div>
    </section>
  );
}
