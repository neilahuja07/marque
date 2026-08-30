"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth-provider";
import { formatUsd } from "@/lib/currency";

interface OrderItem {
  title: string;
  price: number;
}

interface Order {
  id: string;
  razorpay_order_id: string;
  amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const statusColors: Record<string, string> = {
  paid: "bg-sage/20 text-teal-dark",
  created: "bg-brass/15 text-brass",
  failed: "bg-red-50 text-red-600",
  refunded: "bg-red-50 text-red-600",
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      const supabase = createClient();
      const { data: ordersData } = await supabase
        .from("orders")
        .select("id, razorpay_order_id, amount, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersData && ordersData.length > 0) {
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order: { id: string; razorpay_order_id: string; amount: number; status: string; created_at: string }) => {
            const { data: items } = await supabase
              .from("order_items")
              .select("title, price")
              .eq("order_id", order.id);
            return { ...order, items: (items || []) as OrderItem[] };
          })
        );
        setOrders(ordersWithItems as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const displayOrders = orders;

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
              <p className="mt-1 text-[14px] text-slate">
                {loading ? "Loading..." : `${displayOrders.length} total orders`}
              </p>
            </div>
            <Link href="/browse" className="btn-primary hidden rounded-[8px] bg-teal-dark px-5 py-3 text-[14px] font-medium text-white sm:inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 text-center text-[13px] text-slate">Loading orders...</div>
          ) : displayOrders.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-[16px] text-ink">No orders yet</h3>
              <p className="mt-1.5 max-w-sm text-[13px] text-slate">Your purchase history will appear here.</p>
              <Link href="/browse" className="btn-primary mt-5 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white">
                Browse Resources
              </Link>
            </div>
          ) : (
            <>
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
                      {displayOrders.map((order) => (
                        <tr key={order.id} className="border-b border-ink/5 last:border-0">
                          <td className="px-5 py-4 font-mono text-[12px] text-ink">{order.razorpay_order_id}</td>
                          <td className="px-5 py-4 text-slate">{new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                          <td className="px-5 py-4">
                            <div className="space-y-1">
                              {order.items.map((item, i) => (
                                <p key={i} className="text-[12px] text-slate line-clamp-1">{item.title}</p>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-4 font-medium text-ink">{formatUsd(order.amount)}</td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <Link href="/dashboard/downloads" className="text-[12px] font-medium text-teal-dark hover:underline">
                              {order.status === "paid" ? "Download" : "View"}
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
                {displayOrders.map((order, i) => (
                  <FadeIn key={order.id} delay={i * 50}>
                    <div className="rounded-[10px] border border-ink/10 bg-white p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono text-[12px] text-ink">{order.razorpay_order_id}</p>
                          <p className="mt-1 text-[12px] text-slate">
                            {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
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
                        <p className="text-[14px] font-medium text-ink">{formatUsd(order.amount)}</p>
                        <Link href="/dashboard/downloads" className="text-[13px] font-medium text-teal-dark hover:underline">
                          {order.status === "paid" ? "Download" : "View"}
                        </Link>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
