"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { formatUsd } from "@/lib/currency";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

interface OrderItem {
  id: string;
  product_id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  razorpay_order_id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  items: OrderItem[];
}

const statIcons = {
  downloads: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  resources: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
};

const statusColors: Record<string, string> = {
  paid: "bg-sage/20 text-teal-dark",
  created: "bg-brass/15 text-brass",
  failed: "bg-red-50 text-red-600",
  refunded: "bg-red-50 text-red-600",
};

export default function DashboardPage() {
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
        .select("id, razorpay_order_id, amount, currency, status, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersData && ordersData.length > 0) {
        const ordersWithItems = await Promise.all(
          ordersData.map(async (order: { id: string; razorpay_order_id: string; amount: number; currency: string; status: string; created_at: string }) => {
            const { data: items } = await supabase
              .from("order_items")
              .select("id, product_id, title, price, quantity")
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

  const totalDownloads = orders.reduce((sum, order) => {
    return sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  const uniqueProducts = new Set(orders.flatMap((order) => order.items.map((item) => item.product_id))).size;

  const recentOrders = orders.slice(0, 5);

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  return (
    <DashboardLayout
      sidebarItems={studentSidebarItems}
      header={
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="font-display text-[22px] text-ink">Dashboard</h1>
            <p className="mt-0.5 text-[13px] text-slate">
              {authLoading ? "Loading..." : `Welcome back, ${displayName}`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/20 font-display text-[13px] font-medium text-teal-dark">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-8">
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardStatCard label="Downloads" target={String(totalDownloads)} icon={statIcons.downloads} />
            <DashboardStatCard label="Orders" target={String(orders.length)} icon={statIcons.orders} />
            <DashboardStatCard label="Resources owned" target={String(uniqueProducts)} icon={statIcons.resources} />
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="rounded-[12px] border border-ink/10 bg-white">
            <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
              <h2 className="font-display text-[16px] text-ink">Recent orders</h2>
              <Link href="/dashboard/orders" className="text-[12px] font-medium text-teal-dark hover:underline">
                View all
              </Link>
            </div>
            {loading ? (
              <div className="px-5 py-8 text-center text-[13px] text-slate">Loading orders...</div>
            ) : recentOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-[16px] text-ink">No orders yet</h3>
                <p className="mt-1.5 max-w-sm text-[13px] text-slate">Your purchased resources will appear here.</p>
                <Link href="/browse" className="btn-primary mt-5 rounded-[8px] bg-teal-dark px-5 py-2.5 text-[13px] font-medium text-white">
                  Browse Resources
                </Link>
              </div>
            ) : (
              <>
                <div className="hidden sm:block">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-ink/8">
                        <th className="px-5 py-3 font-medium text-ink/50">Order</th>
                        <th className="px-5 py-3 font-medium text-ink/50">Date</th>
                        <th className="px-5 py-3 font-medium text-ink/50">Items</th>
                        <th className="px-5 py-3 font-medium text-ink/50">Amount</th>
                        <th className="px-5 py-3 font-medium text-ink/50">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-ink/5 last:border-0">
                          <td className="px-5 py-3.5 font-mono text-[12px] text-ink">{order.razorpay_order_id}</td>
                          <td className="px-5 py-3.5 text-slate">
                            {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="space-y-0.5">
                              {order.items.map((item, i) => (
                                <p key={i} className="text-slate line-clamp-1">{item.title}</p>
                              ))}
                            </div>
                          </td>
                          <td className="px-5 py-3.5 font-medium text-ink">{formatUsd(order.amount)}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="divide-y divide-ink/5 sm:hidden">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="px-5 py-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[12px] text-ink">{order.razorpay_order_id}</span>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[12px] text-slate">
                        {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[13px] font-medium text-ink">{formatUsd(order.amount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
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
              <Link href="/dashboard/downloads" className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-5 py-2.5 text-[13px] font-medium text-ink">
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
