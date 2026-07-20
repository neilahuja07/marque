"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { BarChart, DonutChart } from "@/components/ui/charts";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import {
  adminRevenueData,
  adminUsersData,
  adminDownloadsData,
  adminSalesByCountry,
  adminTopSellers,
  sellerProducts,
} from "@/lib/portal-data";

const topProducts = [...sellerProducts]
  .filter((p) => p.status === "active")
  .sort((a, b) => b.downloads - a.downloads)
  .slice(0, 5);

const statIcons = {
  revenue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  downloads: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
};

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Analytics" />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard
              label="Revenue"
              target="$184,200"
              icon={statIcons.revenue}
              trend={{ value: "+18% this month", positive: true }}
            />
            <DashboardStatCard
              label="Growth"
              target="+18%"
              icon={statIcons.growth}
              trend={{ value: "+3% vs last month", positive: true }}
            />
            <DashboardStatCard
              label="Active users"
              target="12,480"
              icon={statIcons.users}
              trend={{ value: "+12% this month", positive: true }}
            />
            <DashboardStatCard
              label="Downloads"
              target="37,000"
              icon={statIcons.downloads}
              trend={{ value: "+22% this month", positive: true }}
            />
          </div>
        </FadeIn>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BarChart data={adminRevenueData} title="Revenue" height={180} />
          <BarChart data={adminUsersData} title="Active users" height={180} color="bg-sage" />
        </div>

        <BarChart data={adminDownloadsData} title="Downloads" height={180} color="bg-brass" />

        {/* Top Sellers + Sales by Country */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Top Sellers */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-[16px] text-ink">Top sellers</h2>
              <div className="mt-4 hidden overflow-hidden rounded-[8px] border border-ink/10 md:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/10 bg-parchment/50">
                      <th className="px-5 py-3 font-medium text-ink/60">Seller</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Products</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Revenue</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminTopSellers.map((s, i) => (
                      <tr key={i} className="border-b border-ink/5 last:border-0">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-[11px] font-medium text-teal-dark">
                              {s.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <p className="font-medium text-ink">{s.name}</p>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-slate">{s.products}</td>
                        <td className="px-5 py-3.5 font-medium text-ink">${s.revenue.toLocaleString()}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brass" fill="currentColor">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span className="text-[12px] font-medium text-ink">{s.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile */}
              <div className="mt-3 space-y-2 md:hidden">
                {adminTopSellers.map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-[8px] border border-ink/5 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-[11px] font-medium text-teal-dark">
                        {s.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-ink">{s.name}</p>
                        <p className="text-[11px] text-slate">{s.products} products</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-medium text-ink">${s.revenue.toLocaleString()}</p>
                      <div className="flex items-center gap-1 justify-end">
                        <svg viewBox="0 0 24 24" className="h-3 w-3 text-brass" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span className="text-[11px] font-medium text-ink">{s.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Sales by Country */}
          <DonutChart data={adminSalesByCountry} title="Sales by country" />
        </div>

        {/* Top Products */}
        <FadeIn delay={120}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <h2 className="font-display text-[16px] text-ink">Top products</h2>
            <div className="mt-4 hidden overflow-hidden rounded-[8px] border border-ink/10 md:block">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-ink/10 bg-parchment/50">
                    <th className="px-5 py-3 font-medium text-ink/60">Resource</th>
                    <th className="px-5 py-3 font-medium text-ink/60">Downloads</th>
                    <th className="px-5 py-3 font-medium text-ink/60">Sales</th>
                    <th className="px-5 py-3 font-medium text-ink/60">Revenue</th>
                    <th className="px-5 py-3 font-medium text-ink/60">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((p) => (
                    <tr key={p.id} className="border-b border-ink/5 last:border-0">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate">{p.subject} · {p.level}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate">{p.downloads.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-slate">{p.sales}</td>
                      <td className="px-5 py-3.5 font-medium text-ink">${p.revenue}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brass" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="text-[12px] font-medium text-ink">{p.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile */}
            <div className="mt-3 space-y-2 md:hidden">
              {topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-[8px] border border-ink/5 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-ink line-clamp-1">{p.title}</p>
                    <p className="text-[11px] text-slate">{p.downloads.toLocaleString()} downloads · ${p.revenue}</p>
                  </div>
                  <div className="flex items-center gap-1 ml-3">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-brass" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-[11px] font-medium text-ink">{p.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
