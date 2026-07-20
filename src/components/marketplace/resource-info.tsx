interface ResourceInfoProps {
  info: { label: string; value: string }[];
}

export function ResourceInfo({ info }: ResourceInfoProps) {
  return (
    <section>
      <h2 className="font-display text-[22px] text-ink">Resource information</h2>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {info.map((item) => (
          <div
            key={item.label}
            className="rounded-[8px] border border-ink/10 bg-white px-4 py-3"
          >
            <p className="text-[11px] uppercase tracking-wide text-slate">{item.label}</p>
            <p className="mt-1 text-[13px] font-medium text-ink">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
