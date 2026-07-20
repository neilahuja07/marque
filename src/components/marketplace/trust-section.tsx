export function TrustSection() {
  const items = [
    { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Secure Checkout" },
    { icon: "M2 8h12M10 4l4 4-4 4", label: "Instant Digital Delivery" },
    { icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M9 12l2 2 4-4", label: "Lifetime Access" },
    { icon: "M4 6h16v12H4V6z M8 2v4 M16 2v4", label: "Download on Any Device" },
    { icon: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3", label: "Free Future Updates" },
  ];

  return (
    <div className="rounded-[var(--radius-card)] border border-ink/10 bg-white p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 text-[13px] text-ink/80">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-dark/8">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
            </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
