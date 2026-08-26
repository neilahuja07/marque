"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { FadeIn } from "@/components/ui/fade-in";
import { adminSidebarItems } from "@/lib/admin-sidebar";

const revenueIcon = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

export default function AdminDashboardPage() {
  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div>
            <h1 className="font-display text-[22px] text-ink">Admin Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-slate">Platform overview and management.</p>
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard label="Total revenue" target="$184,200" icon={revenueIcon} trend={{ value: "+18% this month", positive: true }} />
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
