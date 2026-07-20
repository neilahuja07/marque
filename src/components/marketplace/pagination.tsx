import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink/10 text-ink/60 transition-all hover:border-ink/20 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`dots-${i}`} className="px-1 text-[13px] text-slate">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange?.(page)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[8px] text-[14px] font-medium transition-all",
              page === currentPage
                ? "bg-teal-dark text-white"
                : "border border-ink/10 text-ink/60 hover:border-ink/20 hover:text-ink"
            )}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink/10 text-ink/60 transition-all hover:border-ink/20 hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
}
