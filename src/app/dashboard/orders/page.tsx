"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardSearch, DashboardFilterPills, DashboardEmpty, DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
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

const filters = [
  { label: "All", value: "all" },
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "created" },
  { label: "Failed", value: "failed" },
];

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
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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

  const filtered = orders.filter((o) => {
    const matchSearch = !search || o.razorpay_order_id.toLowerCase().includes(search.toLowerCase()) || o.items.some((i) => i.title.toLowerCase().includes(search.toLowerCase()));
    const matchFilter = filter === "all" || o.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-7xl space-y-6">
        <FadeIn>
          <DashboardSectionHeader title="Order History" count={orders.length} />
        </FadeIn>

        <FadeIn delay={40}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search orders…" />
            <DashboardFilterPills filters={filters} active={filter} onChange={setFilter} />
          </div>
        </FadeIn>

        {loading ? (
          <FadeIn delay={60}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-[13px] text-slate">Loading orders...</p>
            </div>
          </FadeIn>
        ) : filtered.length === 0 ? (
          <FadeIn delay={60}>
            <DashboardEmpty
              icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>}
              title="No orders found"
              description={search || filter !== "all" ? "Try adjusting your search or filter." : "Your order history will appear here."}
              action={{ label: "Browse Resources", href: "/browse" }}
            />
          </FadeIn>
        ) : (
          <>
            <FadeIn delay={60}>
              <div className="hidden overflow-hidden rounded-[10px] border border-ink/10 bg-white md:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/10 bg-parchment/50">
                      <th className="px-5 py-3 font-medium text-ink/60">Order</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Date</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Items</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Amount</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Payment</th>
                      <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order) => (
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
                        <td className="px-5 py-3.5 text-slate">Razorpay</td>
                        <td className="px-5 py-3.5">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            <div className="space-y-3 md:hidden">
              {filtered.map((order, i) => (
                <FadeIn key={order.id} delay={60 + i * 40}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-mono text-[12px] text-ink">{order.razorpay_order_id}</p>
                        <p className="mt-0.5 text-[11px] text-slate">
                          {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${statusColors[order.status] || ""}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-3 space-y-1">
                      {order.items.map((item, j) => (
                        <p key={j} className="text-[12px] text-slate line-clamp-1">{item.title}</p>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between border-t border-ink/10 pt-3">
                      <div>
                        <p className="text-[13px] font-medium text-ink">{formatUsd(order.amount)}</p>
                        <p className="text-[11px] text-slate">Razorpay</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
