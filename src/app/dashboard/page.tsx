"use client";

import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { ContinueLearningCard } from "@/components/dashboard/continue-learning-card";
import { AchievementBadge } from "@/components/dashboard/achievement-badge";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { ResourceCard } from "@/components/marketplace/resource-card";
import { FadeIn } from "@/components/ui/fade-in";
import { products, sampleOrders } from "@/lib/dummy-data";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

/* ── Dummy data ── */
const purchasedProducts = [products[0], products[1], products[2]];
const learningProgress = [
  { ...products[0], progress: 72 },
  { ...products[1], progress: 35 },
  { ...products[2], progress: 10 },
];
const recentOrders = sampleOrders;
const recommended = products.slice(3, 7);

const downloads = [
  { product: products[0], date: "2025-06-10", lastDownloaded: "2 hours ago", status: "ready" as const },
  { product: products[1], date: "2025-06-10", lastDownloaded: "1 day ago", status: "ready" as const },
  { product: products[2], date: "2025-05-22", lastDownloaded: "3 days ago", status: "ready" as const },
];

const achievements = [
  { value: "5", label: "Resources purchased", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg> },
  { value: "320", label: "Pages completed", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg> },
  { value: "7", label: "Day study streak", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
  { value: "#3", label: "Top Mathematics learner", icon: <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg> },
];

const activityItems = [
  { icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>, label: "Downloaded IGCSE Mathematics Paper 4", date: "2 hours ago", color: "sage" as const },
  { icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>, label: "Purchased 3 resources", date: "2 days ago", color: "brass" as const },
  { icon: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, label: "Account created", date: "June 10, 2025", color: "teal" as const },
];

const statIcons = {
  downloads: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>,
  orders: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  resources: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
  wishlist: <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
};

/* ── Page ── */
export default function DashboardPage() {
  return (
    <DashboardLayout
      sidebarItems={studentSidebarItems}
      header={
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-[22px] text-ink">{getGreeting()}, Neil</h1>
            <p className="mt-0.5 text-[13px] text-slate">Continue your learning.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden md:block">
              <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search resources…"
                className="input-field w-[220px] rounded-[8px] border border-ink/10 bg-parchment py-2 pl-9 pr-4 text-[13px] text-ink placeholder:text-ink/40"
              />
            </div>
            {/* Notification */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-[8px] border border-ink/10 text-ink/50 transition-colors hover:bg-parchment hover:text-ink">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brass" />
            </button>
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/20 font-display text-[13px] font-medium text-teal-dark">
              NS
            </div>
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ── Stats ── */}
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardStatCard label="Downloads" target="3" icon={statIcons.downloads} trend={{ value: "+2 this week", positive: true }} />
            <DashboardStatCard label="Orders" target="3" icon={statIcons.orders} />
            <DashboardStatCard label="Resources owned" target="5" icon={statIcons.resources} trend={{ value: "+1 this month", positive: true }} />
            <DashboardStatCard label="Wishlist" target="5" icon={statIcons.wishlist} />
          </div>
        </FadeIn>

        {/* ── Continue Learning ── */}
        <FadeIn delay={60}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[18px] text-ink">Continue learning</h2>
              <Link href="/downloads" className="text-[13px] font-medium text-teal-dark hover:underline">View all</Link>
            </div>
            <div className="mt-5 space-y-3">
              {learningProgress.map((p) => (
                <ContinueLearningCard
                  key={p.id}
                  title={p.title}
                  subject={p.subject}
                  level={p.level}
                  progress={p.progress}
                  slug={p.slug}
                  cover={p.cover}
                />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Two-column: Recent Downloads + Recent Orders ── */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Downloads */}
          <FadeIn delay={80}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent downloads</h2>
                <Link href="/downloads" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
              </div>
              {/* Desktop table */}
              <div className="hidden sm:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/8">
                      <th className="px-5 py-3 font-medium text-ink/50">Resource</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Purchased</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Downloaded</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Status</th>
                      <th className="px-5 py-3 font-medium text-ink/50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {downloads.map((dl) => (
                      <tr key={dl.product.id} className="border-b border-ink/5 last:border-0">
                        <td className="px-5 py-3.5">
                          <p className="font-medium text-ink line-clamp-1">{dl.product.title}</p>
                          <p className="mt-0.5 text-[11px] text-slate">{dl.product.subject} · {dl.product.level}</p>
                        </td>
                        <td className="px-5 py-3.5 text-slate">{dl.date}</td>
                        <td className="px-5 py-3.5 text-slate">{dl.lastDownloaded}</td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center rounded-full bg-sage/20 px-2 py-0.5 text-[11px] font-medium text-teal-dark">Ready</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button className="rounded-[6px] bg-teal-dark/10 px-3 py-1.5 text-[12px] font-medium text-teal-dark transition-colors hover:bg-teal-dark hover:text-white">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile cards */}
              <div className="divide-y divide-ink/5 sm:hidden">
                {downloads.map((dl) => (
                  <div key={dl.product.id} className="px-5 py-4">
                    <p className="text-[13px] font-medium text-ink line-clamp-1">{dl.product.title}</p>
                    <p className="mt-1 text-[11px] text-slate">{dl.product.subject} · {dl.product.level}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[11px] text-slate">{dl.lastDownloaded}</span>
                      <button className="rounded-[6px] bg-teal-dark/10 px-3 py-1.5 text-[12px] font-medium text-teal-dark">Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Recent Orders */}
          <FadeIn delay={100}>
            <div className="rounded-[12px] border border-ink/10 bg-white">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
                <h2 className="font-display text-[16px] text-ink">Recent orders</h2>
                <Link href="/orders" className="text-[12px] font-medium text-teal-dark hover:underline">View all</Link>
              </div>
              {/* Desktop table */}
              <div className="hidden sm:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/8">
                      <th className="px-5 py-3 font-medium text-ink/50">Order</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Date</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Amount</th>
                      <th className="px-5 py-3 font-medium text-ink/50">Status</th>
                      <th className="px-5 py-3 font-medium text-ink/50"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-ink/5 last:border-0">
                        <td className="px-5 py-3.5 font-mono text-[12px] text-ink">{order.id}</td>
                        <td className="px-5 py-3.5 text-slate">{new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                        <td className="px-5 py-3.5 font-medium text-ink">${order.total.toFixed(2)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
                            order.status === "completed" ? "bg-sage/20 text-teal-dark" : order.status === "refunded" ? "bg-red-50 text-red-600" : "bg-brass/15 text-brass"
                          }`}>{order.status}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-parchment">Invoice</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Mobile cards */}
              <div className="divide-y divide-ink/5 sm:hidden">
                {recentOrders.map((order) => (
                  <div key={order.id} className="px-5 py-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[12px] text-ink">{order.id}</span>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${
                        order.status === "completed" ? "bg-sage/20 text-teal-dark" : "bg-red-50 text-red-600"
                      }`}>{order.status}</span>
                    </div>
                    <p className="mt-1 text-[12px] text-slate">{new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[13px] font-medium text-ink">${order.total.toFixed(2)}</span>
                      <button className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-ink">Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Recommended ── */}
        <FadeIn delay={120}>
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-[18px] text-ink">Recommended for you</h2>
              <Link href="/browse" className="text-[13px] font-medium text-teal-dark hover:underline">Browse all</Link>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((p) => (
                <ResourceCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Achievements + Activity ── */}
        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Achievements */}
          <FadeIn delay={140}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-[18px] text-ink">Achievements</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {achievements.map((a) => (
                  <AchievementBadge key={a.label} icon={a.icon} label={a.label} value={a.value} />
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Activity Timeline */}
          <FadeIn delay={160}>
            <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
              <h2 className="font-display text-[18px] text-ink">Activity</h2>
              <div className="mt-5">
                <ActivityTimeline items={activityItems} />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* ── Quick Actions ── */}
        <FadeIn delay={180}>
          <div className="rounded-[12px] border border-ink/10 bg-white p-5 sm:p-6">
            <h2 className="font-display text-[18px] text-ink">Quick actions</h2>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link href="/browse" className="btn-primary inline-flex items-center gap-2 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Browse Resources
              </Link>
              <Link href="/downloads" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                View Downloads
              </Link>
              <Link href="/contact" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact Support
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
