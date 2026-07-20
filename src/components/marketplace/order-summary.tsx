"use client";

import { useState } from "react";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  tax: number;
}

export function OrderSummary({ subtotal, discount, tax }: OrderSummaryProps) {
  const [coupon, setCoupon] = useState("");
  const total = subtotal - discount + tax;

  return (
    <div className="sticky top-24 rounded-[var(--radius-card)] border border-ink/10 bg-white p-5">
      <h2 className="text-[15px] font-medium text-ink">Order summary</h2>

      <div className="mt-4 space-y-3 text-[13px]">
        <div className="flex justify-between text-ink/80">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-teal-dark">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-ink/80">
          <span>Estimated tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-ink/10 pt-3">
          <div className="flex justify-between text-[15px] font-medium text-ink">
            <span>Total</span>
            <span className="font-display text-[18px]">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Coupon */}
      <div className="mt-5">
        <label className="text-[12px] font-medium text-ink">Coupon code</label>
        <div className="mt-1.5 flex gap-2">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter code"
            className="input-field min-w-0 flex-1 rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-2.5 text-[14px] text-ink placeholder:text-ink/40"
          />
          <button className="btn-outline shrink-0 rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink">
            Apply
          </button>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-5 space-y-2.5">
        <Link
          href="/checkout"
          className="btn-primary block w-full rounded-[8px] bg-teal-dark px-6 py-3 text-center text-[14px] font-medium text-white"
        >
          Proceed to checkout
        </Link>
        <Link
          href="/browse"
          className="btn-outline block w-full rounded-[8px] border border-ink/15 px-6 py-3 text-center text-[14px] font-medium text-ink"
        >
          Continue browsing
        </Link>
      </div>
    </div>
  );
}
