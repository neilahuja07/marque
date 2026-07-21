import Link from "next/link";
import type { Product } from "@/lib/types";
import { ExamCodeBadge } from "./exam-code-badge";
import { RatingStars } from "./rating-stars";

const typeIcon: Record<Product["type"], React.ReactNode> = {
  "Past Paper": (
    <path d="M6 2h9l3 3v17H6V2z M15 2v3h3M9 12h6M9 15h6M9 9h3" />
  ),
  "Mock Test": (
    <path d="M4 4h16v16H4V4z M8 9l2 2 4-4 M8 16h8" />
  ),
  Worksheet: (
    <path d="M4 4h16v16H4V4z M8 8h8 M8 12h8 M8 16h5" />
  ),
  "Revision Notes": (
    <path d="M5 3h11l3 3v15H5V3z M9 9h7 M9 13h7 M9 17h4" />
  ),
};

export function ResourceCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-white"
    >
      <div className={`relative flex h-40 items-end overflow-hidden bg-gradient-to-br ${product.cover} p-4`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 flex items-center justify-center opacity-90 transition-transform duration-500 group-hover:scale-105">
          <svg viewBox="0 0 24 24" className="h-16 w-16 text-white/25" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            {typeIcon[product.type]}
          </svg>
        </div>
        {product.bestseller && (
          <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm">
            Bestseller
          </span>
        )}
        <span className="relative z-10 rounded-[4px] bg-white/95 px-2 py-0.5 text-[11px] font-medium text-ink">
          {product.type}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <ExamCodeBadge code={product.examCode} />
        <h3 className="font-display text-[16px] leading-snug text-ink transition-colors group-hover:text-teal-dark">
          {product.title}
        </h3>
        <p className="text-[13px] text-slate">
          {product.subject} · {product.level} · {product.pages} pages
        </p>
        <RatingStars rating={product.rating} count={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-[19px] text-ink">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-[13px] text-slate line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-all group-hover:border-teal group-hover:bg-teal group-hover:text-white">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
