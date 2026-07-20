"use client";

export function SamplePages() {
  const pages = [
    { num: 1, label: "Title page" },
    { num: 2, label: "Q1–Q3 solutions" },
    { num: 3, label: "Q4–Q6 solutions" },
    { num: 4, label: "Q7–Q9 solutions" },
    { num: 5, label: "Mark scheme summary" },
  ];

  return (
    <section>
      <h2 className="font-display text-[22px] text-ink">Sample pages</h2>
      <p className="mt-2 text-[14px] text-slate">
        Preview select pages from this resource.
      </p>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
        {pages.map((page) => (
          <div key={page.num} className="shrink-0">
            <div className="flex h-44 w-32 items-center justify-center rounded-[8px] border border-ink/10 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
              <div className="text-center">
                <svg viewBox="0 0 24 24" className="mx-auto h-8 w-8 text-ink/15" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2h9l3 3v17H6V2z M15 2v3h3" />
                </svg>
                <p className="mt-2 text-[10px] font-medium text-ink/40">Page {page.num}</p>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-slate">{page.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
