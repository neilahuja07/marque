import { type ReactNode } from "react";

interface SkeletonProps {
  className?: string;
  children?: ReactNode;
}

function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[8px] bg-ink/5 ${className}`}
      aria-hidden="true"
    />
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-[12px] border border-ink/10 bg-white p-4">
      <Skeleton className="h-40 w-full rounded-[8px]" />
      <Skeleton className="mt-4 h-4 w-3/4" />
      <Skeleton className="mt-2 h-3 w-1/2" />
      <div className="mt-4 flex items-center justify-between">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-8 w-20 rounded-[8px]" />
      </div>
    </div>
  );
}

function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-[12px] border border-ink/10 bg-white">
      <div className="border-b border-ink/10 px-6 py-4">
        <Skeleton className="h-4 w-40" />
      </div>
      <div className="divide-y divide-ink/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-6 py-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-8 w-20 rounded-[8px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonDashboard() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-[12px] border border-ink/10 bg-white p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-3 h-7 w-16" />
            <Skeleton className="mt-2 h-3 w-20" />
          </div>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-[12px]" />
        <Skeleton className="h-64 rounded-[12px]" />
      </div>
    </div>
  );
}

export { Skeleton, SkeletonCard, SkeletonTable, SkeletonDashboard };
