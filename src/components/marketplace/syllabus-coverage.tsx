export function SyllabusCoverage({ topics }: { topics: string[] }) {
  return (
    <section>
      <h2 className="font-display text-[22px] text-ink">Syllabus coverage</h2>
      <p className="mt-2 text-[14px] text-slate">
        Every topic in this paper is covered with detailed worked solutions.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {topics.map((topic) => (
          <div
            key={topic}
            className="flex items-center gap-3 rounded-[8px] bg-white border border-ink/10 px-4 py-3 text-[13px] text-ink"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-dark/10">
              <svg viewBox="0 0 12 12" className="h-3 w-3 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 6l2.5 2.5 4.5-5" />
              </svg>
            </span>
            {topic}
          </div>
        ))}
      </div>
    </section>
  );
}
