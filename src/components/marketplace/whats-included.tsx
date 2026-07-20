export function WhatsIncluded({ items }: { items: string[] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-5">
      <h3 className="text-[14px] font-medium text-ink">What&apos;s included</h3>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2.5 text-[13px] text-ink/80">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-dark/10">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
