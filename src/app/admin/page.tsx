"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { adminOrders, adminUsers } from "@/lib/portal-data";

const statIcons = {
  users: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  resources: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
};

const roleVariant: Record<string, "info" | "success" | "warning"> = {
  student: "info",
  admin: "warning",
};

const orderStatusVariant: Record<string, "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  refunded: "error",
};

export default function AdminDashboardPage() {
  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-[22px] text-ink">Admin Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-slate">Platform overview and management.</p>
          </div>
          <button className="btn-outline hidden items-center gap-2 rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink sm:inline-flex">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export
          </button>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard label="Total users" target="12,480" icon={statIcons.users} trend={{ value: "+12% this month", positive: true }} />
            <DashboardStatCard label="Total revenue" target="$184,200" icon={statIcons.revenue} trend={{ value: "+18% this month", positive: true }} />
            <DashboardStatCard label="Resources" target="1,256" icon={statIcons.resources} />
            <DashboardStatCard label="Orders today" target="47" icon={statIcons.orders} trend={{ value: "+5% today", positive: true }} />
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent orders */}
          <FadeIn delay={60}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent orders</h2>
                <Link href="/admin/orders" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-ink/5">
                {adminOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="font-mono text-[12px] text-ink">{order.id}</p>
                      <p className="text-[11px] text-slate">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-medium text-ink">${order.total.toFixed(2)}</p>
                      <Badge variant={orderStatusVariant[order.status]}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Recent users */}
          <FadeIn delay={100}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent users</h2>
                <Link href="/admin/users" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-ink/5">
                {adminUsers.slice(0, 5).map((user) => (
                  <div key={user.id} className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-[11px] font-medium text-teal-dark">
                        {user.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-ink">{user.name}</p>
                        <p className="text-[11px] text-slate">{user.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={roleVariant[user.role]}>{user.role}</Badge>
                      <p className="mt-1 text-[11px] text-ink/40">
                        {new Date(user.joined).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Quick actions */}
        <FadeIn delay={160}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <h2 className="font-display text-[16px] text-ink">Quick actions</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href="/admin/users" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                Manage users
              </Link>
              <Link href="/admin/resources" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                Review listings
              </Link>
              <Link href="/admin/orders" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                Process refunds
              </Link>
              <Link href="/admin/analytics" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                View analytics
              </Link>
              <Link href="/admin/settings" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                Site settings
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
