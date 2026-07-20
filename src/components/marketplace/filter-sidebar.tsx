"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { allSubjects, allLevels, allTypes } from "@/lib/dummy-data";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

export interface FilterState {
  subjects: string[];
  levels: string[];
  types: string[];
  priceRange: string;
  sort: string;
}

const priceRanges = [
  { label: "All prices", value: "all" },
  { label: "Under $5", value: "0-5" },
  { label: "$5 – $10", value: "5-10" },
  { label: "$10 – $15", value: "10-15" },
  { label: "Over $15", value: "15+" },
];

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
  types: [],
  priceRange: "all",
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
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[14px] text-ink/80 transition-colors hover:text-ink">
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

export function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    onFilterChange?.(next);
  };

  const toggleArray = (key: "subjects" | "levels" | "types", value: string) => {
    const arr = filters[key];
    const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
    update({ [key]: next });
  };

  const activeCount =
    filters.subjects.length + filters.levels.length + filters.types.length +
    (filters.priceRange !== "all" ? 1 : 0);

  return (
    <aside className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[14px] font-medium text-ink">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={() => update({ subjects: [], levels: [], types: [], priceRange: "all" })}
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

        {/* Level */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Level</h4>
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

        {/* Resource Type */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Resource type</h4>
          <div className="mt-3 space-y-1">
            {allTypes.map((t) => (
              <CheckboxItem
                key={t}
                label={t}
                checked={filters.types.includes(t)}
                onChange={() => toggleArray("types", t)}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <h4 className="text-[13px] font-medium text-ink">Price</h4>
          <div className="mt-3 space-y-1">
            {priceRanges.map((p) => (
              <CheckboxItem
                key={p.value}
                label={p.label}
                checked={filters.priceRange === p.value}
                onChange={() => update({ priceRange: p.value })}
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
