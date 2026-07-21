"use client";

import type { Product } from "@/lib/types";
import { ExamCodeBadge } from "./exam-code-badge";

interface CartItemProps {
  product: Product;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  onRemove: () => void;
  onSaveForLater?: () => void;
}

export function CartItem({ product, quantity, onQuantityChange, onRemove, onSaveForLater }: CartItemProps) {
  return (
    <div className="flex gap-4 rounded-[var(--radius-card)] border border-ink/10 bg-white p-4 sm:p-5">
      {/* Thumbnail */}
      <div className={`relative h-24 w-20 shrink-0 overflow-hidden rounded-[8px] bg-gradient-to-br ${product.cover}`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <span className="absolute bottom-1.5 left-1.5 rounded bg-white/95 px-1.5 py-0.5 text-[9px] font-medium text-ink">
          {product.type}
        </span>
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[14px] font-medium text-ink">{product.title}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-slate">
              <span>{product.subject}</span>
              <span className="text-ink/20">·</span>
              <span>{product.pages} pages</span>
            </div>
          </div>
          <span className="shrink-0 font-display text-[18px] text-ink">
            ${(product.price * quantity).toFixed(2)}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <ExamCodeBadge code={product.examCode} />
          <span className="flex items-center gap-1 rounded bg-teal-dark/8 px-1.5 py-0.5 text-[10px] font-medium text-teal-dark">
            <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M7 3l3 3-3 3" />
            </svg>
            Instant download
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-4 pt-3">
          {/* Quantity */}
          <div className="flex items-center rounded-[6px] border border-ink/15">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:text-ink"
              aria-label="Decrease quantity"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 8h10" />
              </svg>
            </button>
            <span className="flex h-10 w-10 items-center justify-center border-x border-ink/15 text-[13px] font-medium text-ink">
              {quantity}
            </span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center text-ink/60 transition-colors hover:text-ink"
              aria-label="Increase quantity"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M8 3v10M3 8h10" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {onSaveForLater && (
              <button
                onClick={onSaveForLater}
                className="py-1.5 text-[13px] text-slate transition-colors hover:text-ink"
              >
                Save for later
              </button>
            )}
            <button
              onClick={onRemove}
              className="py-1.5 text-[13px] text-slate transition-colors hover:text-red-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
