import { type ReactNode } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface DashboardStatCardProps {
  label: string;
  target: string;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
}

export function DashboardStatCard({ label, target, icon, trend }: DashboardStatCardProps) {
  return (
    <div className="rounded-[10px] border border-ink/10 bg-white p-5 transition-all hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-slate">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-sage/15 text-teal-dark">
          {icon}
        </span>
      </div>
      <div className="mt-3 flex items-end justify-between">
        <p className="font-display text-[24px] text-ink">
          <AnimatedCounter target={target} />
        </p>
        {trend && (
          <span className={`flex items-center gap-1 text-[12px] font-medium ${trend.positive ? "text-sage" : "text-red-500"}`}>
            {trend.positive ? (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            )}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
