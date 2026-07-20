import Link from "next/link";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warm-gray">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-slate" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-[20px] text-ink">No resources yet</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-slate">
        We haven&apos;t added any resources to the catalogue. Check back soon — new materials are added every exam session.
      </p>
      <Link
        href="/"
        className="btn-primary mt-6 rounded-[8px] bg-teal-dark px-5 py-3 text-[14px] font-medium text-white"
      >
        Back to home
      </Link>
    </div>
  );
}

export function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warm-gray">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-slate" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      </div>
      <h3 className="mt-5 font-display text-[20px] text-ink">No results found</h3>
      <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-slate">
        Nothing matches your current filters. Try adjusting your selection or browse all resources.
      </p>
      <Link
        href="/browse"
        className="btn-outline mt-6 rounded-[8px] border border-ink/15 px-5 py-3 text-[14px] font-medium text-ink"
      >
        Clear filters
      </Link>
    </div>
  );
}
