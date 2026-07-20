"use client";

import Link from "next/link";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  email: string;
  total: number;
}

export function OrderConfirmationModal({
  isOpen,
  onClose,
  orderNumber,
  email,
  total,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md overflow-hidden rounded-[14px] border border-ink/10 bg-white shadow-2xl">
        {/* Success icon */}
        <div className="flex justify-center pt-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/20">
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pt-5 pb-8 text-center">
          <h2 className="font-display text-[22px] text-ink">Purchase successful</h2>

          <p className="mt-3 text-[14px] leading-relaxed text-slate">
            Thank you for your purchase! Your order <span className="font-mono text-[13px] font-medium text-ink">{orderNumber}</span> has been confirmed.
          </p>

          <p className="mt-2 text-[13px] text-slate">
            A confirmation email with download links has been sent to{" "}
            <span className="font-medium text-ink">{email}</span>.
          </p>

          {/* Order total */}
          <div className="mt-5 rounded-[8px] bg-parchment/60 px-5 py-3">
            <p className="text-[12px] text-slate">Amount paid</p>
            <p className="mt-0.5 font-display text-[20px] text-ink">${total.toFixed(2)}</p>
          </div>

          {/* Actions */}
          <div className="mt-6 space-y-2.5">
            <Link
              href="/downloads"
              onClick={onClose}
              className="btn-primary block w-full rounded-[8px] bg-teal-dark px-6 py-3 text-center text-[14px] font-medium text-white"
            >
              View Downloads
            </Link>
            <Link
              href="/browse"
              onClick={onClose}
              className="btn-outline block w-full rounded-[8px] border border-ink/15 px-6 py-3 text-center text-[14px] font-medium text-ink"
            >
              Continue Browsing
            </Link>
          </div>

          {/* Reassurance */}
          <p className="mt-5 text-[11px] text-ink/40">
            Your files are ready to download instantly from your account.
          </p>
        </div>
      </div>
    </div>
  );
}
