"use client";

import { useState } from "react";
import { allSubjects, allLevels } from "@/lib/dummy-data";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  initialSubject?: string;
}

export interface FilterState {
  subjects: string[];
  levels: string[];
  sort: string;
}

const sortOptions = [
  { label: "Most popular", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
  { label: "Price: high to low", value: "price-desc" },
  { label: "Highest rated", value: "rating" },
];

export const defaultFilters: FilterState = {
  subjects: [],
  levels: [],
  sort: "popular",
};

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label onClick={onChange} className="flex cursor-pointer items-center gap-2.5 py-1 text-[14px] text-ink/80 transition-colors hover:text-ink">
      <span
        className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-colors ${
          checked
            ? "border-teal-dark bg-teal-dark"
            : "border-ink/20 bg-white"
        }`}
      >
        {checked && (
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 6l2.5 2.5 4.5-5" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

export function FilterSidebar({ onFilterChange, initialSubject }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    subjects: initialSubject ? [initialSubject] : [],
  }));

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    onFilterChange?.(next);
  };

  const toggleArray = (key: "subjects" | "levels", value: string) => {
    const arr = filters[key];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    update({ [key]: next });
  };

  const activeCount = filters.subjects.length + filters.levels.length;

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-medium text-ink">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={() => update({ subjects: [], levels: [] })}
            className="py-1 text-[13px] text-teal-dark hover:underline"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <div className="mt-6 space-y-6">
        {/* Subject */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Subject</h4>
          <div className="mt-3 space-y-1">
            {allSubjects.map((s) => (
              <CheckboxItem
                key={s}
                label={s}
                checked={filters.subjects.includes(s)}
                onChange={() => toggleArray("subjects", s)}
              />
            ))}
          </div>
        </div>

        {/* Qualification */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Qualification</h4>
          <div className="mt-3 space-y-1">
            {allLevels.map((l) => (
              <CheckboxItem
                key={l}
                label={l}
                checked={filters.levels.includes(l)}
                onChange={() => toggleArray("levels", l)}
              />
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Sort by</h4>
          <select
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
            className="input-field mt-3 block w-full rounded-[8px] border border-ink/15 bg-white px-3 py-2.5 text-[13px] text-ink"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>
    </aside>
  );
}
