"use client";

import { type ReactNode, type ChangeEvent } from "react";

/* ── Dashboard Search Bar ── */
interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function DashboardSearch({ value, onChange, placeholder = "Search…" }: DashboardSearchProps) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-field w-full rounded-[8px] border border-ink/10 bg-white py-2.5 pl-10 pr-4 text-[13px] text-ink placeholder:text-ink/40"
      />
    </div>
  );
}

/* ── Filter Pills ── */
interface FilterPill {
  label: string;
  value: string;
}

interface DashboardFilterPillsProps {
  filters: FilterPill[];
  active: string;
  onChange: (value: string) => void;
}

export function DashboardFilterPills({ filters, active, onChange }: DashboardFilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-colors ${
            active === f.value
              ? "bg-teal-dark text-white"
              : "border border-ink/10 bg-white text-slate hover:border-ink/20 hover:text-ink"
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

/* ── Dashboard Empty State ── */
interface DashboardEmptyProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; href: string };
}

export function DashboardEmpty({ icon, title, description, action }: DashboardEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-[16px] text-ink">{title}</h3>
      <p className="mt-1.5 max-w-sm text-[13px] text-slate">{description}</p>
      {action && (
        <a
          href={action.href}
          className="btn-primary mt-5 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}

/* ── Dashboard Section Header ── */
interface DashboardSectionHeaderProps {
  title: string;
  count?: number;
  actions?: ReactNode;
}

export function DashboardSectionHeader({ title, count, actions }: DashboardSectionHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <h1 className="font-display text-[22px] text-ink">{title}</h1>
        {count !== undefined && (
          <span className="rounded-full bg-parchment px-2.5 py-0.5 text-[12px] font-medium text-slate">{count}</span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
