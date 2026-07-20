"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { sampleOrders } from "@/lib/dummy-data";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";

const statusColors: Record<string, string> = {
  completed: "bg-sage/20 text-teal-dark",
  pending: "bg-brass/15 text-brass",
  refunded: "bg-red-50 text-red-600",
};

export default function OrdersPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Orders" }]} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-8 pb-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[26px] text-ink">Order history</h1>
              <p className="mt-1 text-[14px] text-slate">{sampleOrders.length} total orders</p>
            </div>
            <Link href="/browse" className="btn-primary hidden rounded-[8px] bg-teal-dark px-5 py-3 text-[14px] font-medium text-white sm:inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse
            </Link>
          </div>

          {/* Desktop table */}
          <FadeIn>
            <div className="mt-8 hidden overflow-hidden rounded-[10px] border border-ink/10 bg-white md:block">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-ink/10 bg-parchment/50">
                    <th className="px-5 py-3.5 font-medium text-ink/60">Order</th>
                    <th className="px-5 py-3.5 font-medium text-ink/60">Date</th>
                    <th className="px-5 py-3.5 font-medium text-ink/60">Items</th>
                    <th className="px-5 py-3.5 font-medium text-ink/60">Total</th>
                    <th className="px-5 py-3.5 font-medium text-ink/60">Status</th>
                    <th className="px-5 py-3.5 font-medium text-ink/60"></th>
                  </tr>
                </thead>
                <tbody>
                  {sampleOrders.map((order) => (
                    <tr key={order.id} className="border-b border-ink/5 last:border-0">
                      <td className="px-5 py-4 font-mono text-[12px] text-ink">{order.id}</td>
                      <td className="px-5 py-4 text-slate">{new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                      <td className="px-5 py-4">
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <p key={i} className="text-[12px] text-slate line-clamp-1">{item.title}</p>
                          ))}
                        </div>
                      </td>
                      <td className="px-5 py-4 font-medium text-ink">${order.total.toFixed(2)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <Link href="/downloads" className="text-[12px] font-medium text-teal-dark hover:underline">
                          {order.status === "completed" ? "Download" : "View"}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile cards */}
          <div className="mt-6 space-y-3 md:hidden">
            {sampleOrders.map((order, i) => (
              <FadeIn key={order.id} delay={i * 50}>
                <div className="rounded-[10px] border border-ink/10 bg-white p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[12px] text-ink">{order.id}</p>
                      <p className="mt-1 text-[12px] text-slate">
                        {new Date(order.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-[13px] text-ink line-clamp-1">{item.title}</p>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
                    <p className="text-[14px] font-medium text-ink">${order.total.toFixed(2)}</p>
                    <Link href="/downloads" className="text-[13px] font-medium text-teal-dark hover:underline">
                      {order.status === "completed" ? "Download" : "View"}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
