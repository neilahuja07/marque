import Link from "next/link";

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-gray">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-slate" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L21 8H6" />
          <circle cx="9.5" cy="20.5" r="1.5" />
          <circle cx="17.5" cy="20.5" r="1.5" />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-[22px] text-ink">Your cart is empty</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-slate">
        You haven&apos;t added any resources yet. Browse our collection of past papers, mock tests and revision notes.
      </p>
      <Link
        href="/browse"
        className="btn-primary mt-6 rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
      >
        Browse resources
      </Link>
    </div>
  );
}
