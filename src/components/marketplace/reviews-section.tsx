"use client";

import { useState } from "react";
import { type ProductReview } from "@/lib/dummy-data";

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
  distribution: { stars: number; count: number }[];
  reviews: ProductReview[];
}

function StarRow({ count, total }: { count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-3 text-[12px]">
      <span className="w-3 text-right text-slate">{count}</span>
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/8">
        <div className="h-full rounded-full bg-brass transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function ReviewsSection({ rating, reviewCount, distribution, reviews }: ReviewsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, 3);

  return (
    <section>
      <h2 className="font-display text-[22px] text-ink">Reviews</h2>

      <div className="mt-6 grid gap-8 md:grid-cols-[200px_1fr]">
        {/* Overall rating */}
        <div className="flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-ink/10 bg-white p-6">
          <span className="font-display text-[48px] leading-none text-ink">{rating}</span>
          <div className="mt-2 flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} viewBox="0 0 20 20" className={`h-4 w-4 ${s <= Math.round(rating) ? "text-brass" : "text-ink/15"}`} fill="currentColor">
                <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.69l5.34-.78L10 1z" />
              </svg>
            ))}
          </div>
          <p className="mt-1.5 text-[13px] text-slate">{reviewCount} reviews</p>
        </div>

        {/* Distribution */}
        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3">
              <span className="w-8 text-right text-[13px] font-medium text-ink">{d.stars} ★</span>
              <StarRow count={d.count} total={reviewCount} />
            </div>
          ))}
        </div>
      </div>

      {/* Review list */}
      <div className="mt-8 space-y-4">
        {visible.map((review, i) => (
          <div key={i} className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-ink">{review.name}</p>
                <p className="text-[12px] text-slate">{review.role}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} viewBox="0 0 20 20" className={`h-3.5 w-3.5 ${s <= review.rating ? "text-brass" : "text-ink/15"}`} fill="currentColor">
                      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.51.91-5.33L2.27 6.69l5.34-.78L10 1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[11px] text-slate">{review.date}</span>
              </div>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink/80">{review.text}</p>
          </div>
        ))}
      </div>

      {reviews.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 py-2 text-[14px] font-medium text-teal-dark hover:underline"
        >
          {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
        </button>
      )}
    </section>
  );
}
