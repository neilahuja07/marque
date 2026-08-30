"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardStatCard } from "@/components/dashboard/stat-card";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { formatUsd } from "@/lib/currency";
import { useProducts } from "@/lib/product-store";
import { adminSidebarItems } from "@/lib/admin-sidebar";

const statIcons = {
  revenue: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

interface AdminOrder {
  id: string;
  amount: number;
  status: string;
}

export default function AdminDashboardPage() {
  const { role, loading } = useAuth();
  const router = useRouter();
  const { products } = useProducts();
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.replace("/dashboard");
    }
  }, [role, loading, router]);

  useEffect(() => {
    if (role !== "admin") return;

    const fetchStats = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("orders")
        .select("id, amount, status");

      if (data) {
        setOrders(data as AdminOrder[]);
      }
      setLoadingStats(false);
    };

    fetchStats();
  }, [role]);

  if (loading || role !== "admin") {
    return null;
  }

  const totalRevenue = orders
    .filter((o) => o.status === "paid")
    .reduce((sum, o) => sum + o.amount, 0);

  const totalOrders = orders.length;

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
        <FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <DashboardStatCard label="Total revenue" target={loadingStats ? "—" : formatUsd(totalRevenue)} icon={statIcons.revenue} />
            <DashboardStatCard label="Total orders" target={loadingStats ? "—" : String(totalOrders)} icon={statIcons.orders} />
            <DashboardStatCard label="Resources" target={String(products.length)} icon={statIcons.resources} />
          </div>
        </FadeIn>
      </div>
    </DashboardLayout>
  );
}
