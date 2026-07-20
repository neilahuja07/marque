"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { DashboardSectionHeader, DashboardEmpty } from "@/components/dashboard/dashboard-sub-page";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { BarChart } from "@/components/ui/charts";
import { sellerSidebarItems } from "@/lib/seller-sidebar";
import { sellerProducts, sellerOrders, sellerReviews, sellerRevenueData } from "@/lib/portal-data";

const statIcons = {
  revenue: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  sales: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
  products: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>,
  downloads: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
};

const totalRevenue = sellerProducts.reduce((s, p) => s + p.revenue, 0);
const totalSales = sellerProducts.reduce((s, p) => s + p.sales, 0);
const totalDownloads = sellerProducts.reduce((s, p) => s + p.downloads, 0);
const activeCount = sellerProducts.filter((p) => p.status === "active").length;

const statusColors: Record<string, string> = {
  completed: "success",
  pending: "warning",
  refunded: "error",
};

export default function SellerOverviewPage() {
  return (
    <DashboardLayout
      sidebarItems={sellerSidebarItems}
      header={
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-[22px] text-ink">Seller Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-slate">Manage your listings and track performance.</p>
          </div>
          <Link
            href="/seller/upload"
            className="btn-primary hidden items-center gap-2 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New listing
          </Link>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Stats */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard label="Total revenue" target={`$${totalRevenue.toLocaleString()}`} icon={statIcons.revenue} trend={{ value: "+12% this month", positive: true }} />
            <DashboardStatCard label="Total sales" target={totalSales.toLocaleString()} icon={statIcons.sales} trend={{ value: "+8% this month", positive: true }} />
            <DashboardStatCard label="Active listings" target={String(activeCount)} icon={statIcons.products} />
            <DashboardStatCard label="Total downloads" target={totalDownloads.toLocaleString()} icon={statIcons.downloads} trend={{ value: "+18% this month", positive: true }} />
          </div>
        </FadeIn>

        {/* Revenue chart */}
        <BarChart data={sellerRevenueData} title="Revenue overview" height={180} />

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          {/* Recent sales */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent sales</h2>
                <Link href="/seller/orders" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
              </div>
              <div className="divide-y divide-ink/5">
                {sellerOrders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                    <div>
                      <p className="font-mono text-[12px] text-ink">{order.id}</p>
                      <p className="text-[11px] text-slate">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-medium text-ink">${order.total.toFixed(2)}</p>
                      <Badge variant={statusColors[order.status] as "success" | "warning" | "error" || "default"}>{order.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Recent reviews */}
          <FadeIn delay={100}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent reviews</h2>
              </div>
              <div className="divide-y divide-ink/5">
                {sellerReviews.slice(0, 4).map((review, i) => (
                  <div key={i} className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/15 text-[10px] font-medium text-teal-dark">
                        {review.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-ink">{review.name}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <svg key={j} viewBox="0 0 24 24" className={`h-3 w-3 ${j < review.rating ? "text-brass" : "text-ink/10"}`} fill="currentColor">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2 text-[12px] text-slate line-clamp-2">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Top selling resources */}
        <FadeIn delay={120}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[16px] text-ink">Top selling resources</h2>
              <Link href="/seller/products" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
            </div>
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
                  {sellerProducts.filter((p) => p.status === "active").sort((a, b) => b.sales - a.sales).slice(0, 5).map((p) => (
                    <tr key={p.id} className="border-b border-ink/5 last:border-0">
                      <td className="px-5 py-3.5">
                        <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                        <p className="mt-0.5 text-[11px] text-slate">{p.subject} · {p.level}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate">{p.sales}</td>
                      <td className="px-5 py-3.5 font-medium text-ink">${p.revenue}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brass" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                          <span className="text-[12px] font-medium text-ink">{p.rating}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>

        {/* Quick actions */}
        <FadeIn delay={160}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <h2 className="font-display text-[16px] text-ink">Quick actions</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href="/seller/upload" className="btn-primary inline-flex items-center gap-2 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Upload resource
              </Link>
              <Link href="/seller/products" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                Manage products
              </Link>
              <Link href="/seller/analytics" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                View analytics
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
