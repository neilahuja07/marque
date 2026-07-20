"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { InvoiceModal } from "@/components/ui/invoice-modal";
import {
  DashboardSectionHeader,
  DashboardSearch,
  DashboardFilterPills,
} from "@/components/dashboard/dashboard-sub-page";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { adminOrders } from "@/lib/portal-data";
import type { Order } from "@/lib/dummy-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Refunded", value: "refunded" },
];

const statusVariant: Record<string, "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  refunded: "error",
};

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [refundOrder, setRefundOrder] = useState<Order | null>(null);

  const filtered = adminOrders.filter((o) => {
    const matchesFilter = activeFilter === "all" || o.status === activeFilter;
    const matchesSearch =
      search === "" ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.title.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Orders" count={adminOrders.length} />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search + Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search orders…" />
            <DashboardFilterPills filters={filters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Desktop Table */}
        <FadeIn delay={40}>
          <div className="hidden overflow-hidden rounded-[12px] border border-ink/10 bg-white md:block">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-parchment/50">
                  <th className="px-5 py-3 font-medium text-ink/60">Order</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Date</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Items</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Amount</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Payment</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="font-mono text-[12px] font-medium text-ink">{o.id}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      {new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5 text-slate">{o.items.length}</td>
                    <td className="px-5 py-3.5 font-medium text-ink">${o.total.toFixed(2)}</td>
                    <td className="px-5 py-3.5 text-slate">Stripe</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setInvoiceOrder(o)}
                          className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink"
                        >
                          Invoice
                        </button>
                        {o.status !== "refunded" && (
                          <button
                            onClick={() => setRefundOrder(o)}
                            className="rounded-[6px] border border-red-200 px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50"
                          >
                            Refund
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile Cards */}
        <FadeIn delay={60}>
          <div className="space-y-3 md:hidden">
            {filtered.map((o) => (
              <div key={o.id} className="rounded-[12px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[12px] font-medium text-ink">{o.id}</p>
                    <p className="mt-0.5 text-[11px] text-slate">
                      {new Date(o.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <Badge variant={statusVariant[o.status]}>{o.status}</Badge>
                </div>
                <div className="mt-3">
                  <p className="text-[12px] text-slate">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                  <p className="mt-1 text-[12px] text-ink line-clamp-1">{o.items.map((i) => i.title).join(", ")}</p>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                  <span className="text-[13px] font-medium text-ink">${o.total.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setInvoiceOrder(o)}
                      className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink"
                    >
                      Invoice
                    </button>
                    {o.status !== "refunded" && (
                      <button
                        onClick={() => setRefundOrder(o)}
                        className="rounded-[6px] border border-red-200 px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50"
                      >
                        Refund
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[16px] text-ink">No orders found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try adjusting your search or filter.</p>
          </div>
        )}

        <InvoiceModal
          isOpen={invoiceOrder !== null}
          onClose={() => setInvoiceOrder(null)}
          order={invoiceOrder}
        />

        <Modal
          isOpen={refundOrder !== null}
          onClose={() => setRefundOrder(null)}
          title="Confirm Refund"
          description={`Are you sure you want to refund order ${refundOrder?.id}? This action cannot be undone.`}
        >
          <div className="mt-2 flex justify-end gap-3">
            <button
              onClick={() => setRefundOrder(null)}
              className="rounded-[8px] border border-ink/10 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
            >
              Cancel
            </button>
            <button
              onClick={() => setRefundOrder(null)}
              className="rounded-[8px] bg-red-600 px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-red-700"
            >
              Process Refund
            </button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
