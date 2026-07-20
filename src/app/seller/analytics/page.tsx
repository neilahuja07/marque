"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { BarChart, DonutChart } from "@/components/ui/charts";
import { sellerSidebarItems } from "@/lib/seller-sidebar";
import {
  sellerProducts,
  sellerRevenueData,
  sellerDownloadsData,
  sellerSalesBySubject,
} from "@/lib/portal-data";

const topProducts = sellerProducts
  .filter((p) => p.status === "active")
  .sort((a, b) => b.sales - a.sales)
  .slice(0, 5);

const totalRevenue = sellerProducts.reduce((s, p) => s + p.revenue, 0);
const totalSales = sellerProducts.reduce((s, p) => s + p.sales, 0);

const statIcons = {
  revenue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  sales: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  conversion: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  avg: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  ),
};

const recentActivity = [
  { type: "sale", text: "New sale: IGCSE Mathematics Paper 4 — Worked Solutions Pack", time: "2 hours ago" },
  { type: "review", text: "New 5-star review on IGCSE Physics — Complete Revision Notes", time: "5 hours ago" },
  { type: "sale", text: "New sale: O Level English 1123 — Ten-Year Past Paper Pack", time: "8 hours ago" },
  { type: "download", text: "Resource downloaded 12 times today", time: "12 hours ago" },
  { type: "sale", text: "New sale: IGCSE Chemistry — Practice Question Bank", time: "1 day ago" },
];

const activityIcons: Record<string, string> = {
  sale: "text-teal-dark bg-sage/15",
  review: "text-brass bg-brass/10",
  download: "text-ink/40 bg-parchment",
};

export default function SellerAnalyticsPage() {
  return (
    <DashboardLayout
      sidebarItems={sellerSidebarItems}
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
              label="Total revenue"
              target={`$${totalRevenue.toLocaleString()}`}
              icon={statIcons.revenue}
              trend={{ value: "+12% this month", positive: true }}
            />
            <DashboardStatCard
              label="Total sales"
              target={totalSales.toLocaleString()}
              icon={statIcons.sales}
              trend={{ value: "+8% this month", positive: true }}
            />
            <DashboardStatCard
              label="Conversion rate"
              target="3.2%"
              icon={statIcons.conversion}
              trend={{ value: "+0.4% this month", positive: true }}
            />
            <DashboardStatCard
              label="Avg order value"
              target="$7.96"
              icon={statIcons.avg}
              trend={{ value: "+$0.52 this month", positive: true }}
            />
          </div>
        </FadeIn>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          <BarChart data={sellerRevenueData} title="Revenue" height={180} />
          <BarChart data={sellerDownloadsData} title="Downloads" height={180} color="bg-sage" />
        </div>

        {/* Top Products + Sales by Subject */}
        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Top Products */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-[16px] text-ink">Top products</h2>
              <div className="mt-4 hidden overflow-hidden rounded-[8px] border border-ink/10 md:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/10 bg-parchment/50">
                      <th className="px-5 py-3 font-medium text-ink/60">Resource</th>
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
              {/* Mobile top products */}
              <div className="mt-3 space-y-2 md:hidden">
                {topProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-[8px] border border-ink/5 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[12px] font-medium text-ink line-clamp-1">{p.title}</p>
                      <p className="text-[11px] text-slate">{p.sales} sales · ${p.revenue}</p>
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

          {/* Sales by Subject */}
          <DonutChart data={sellerSalesBySubject} title="Sales by subject" />
        </div>

        {/* Recent Activity */}
        <FadeIn delay={120}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <h2 className="font-display text-[16px] text-ink">Recent activity</h2>
            <div className="mt-4 space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${activityIcons[activity.type]}`}>
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {activity.type === "sale" && <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />}
                      {activity.type === "review" && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />}
                      {activity.type === "download" && <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />}
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-ink">{activity.text}</p>
                    <p className="mt-0.5 text-[11px] text-slate">{activity.time}</p>
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
