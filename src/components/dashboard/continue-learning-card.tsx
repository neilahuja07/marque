import Link from "next/link";

interface ContinueLearningCardProps {
  title: string;
  subject: string;
  level: string;
  progress: number;
  slug: string;
  cover: string;
}

export function ContinueLearningCard({ title, subject, level, progress, slug, cover }: ContinueLearningCardProps) {
  return (
    <Link
      href={`/product/${slug}`}
      className="group flex items-center gap-5 rounded-[10px] border border-ink/10 bg-white p-4 transition-all hover:border-ink/20 hover:shadow-sm sm:p-5"
    >
      {/* Thumbnail */}
      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br ${cover}`}>
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white/30" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-medium text-ink line-clamp-1 group-hover:text-teal-dark">{title}</p>
        <p className="mt-1 text-[12px] text-slate">{subject} · {level}</p>
        <div className="mt-2.5 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-parchment">
            <div
              className="h-full rounded-full bg-teal-dark transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[11px] font-medium text-slate">{progress}%</span>
        </div>
      </div>

      {/* Action */}
      <span className="hidden shrink-0 rounded-[8px] bg-teal-dark/10 px-4 py-2.5 text-[13px] font-medium text-teal-dark transition-colors group-hover:bg-teal-dark group-hover:text-white sm:block">
        Continue
      </span>
    </Link>
  );
}
