"use client";

import { useEffect } from "react";
import { FilterSidebar, type FilterState } from "./filter-sidebar";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  onFilterChange?: (filters: FilterState) => void;
}

export function MobileFilterDrawer({ open, onClose, onFilterChange }: MobileFilterDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-parchment shadow-xl overflow-y-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink/10 bg-parchment/95 backdrop-blur px-6 py-4">
          <h2 className="font-display text-[18px] text-ink">Filters</h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-ink/15 text-ink/60 transition-colors hover:text-ink"
            aria-label="Close filters"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-6">
          <FilterSidebar onFilterChange={onFilterChange} />
        </div>
      </div>
    </div>
  );
}
