"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Dropdown, DropdownItem, DropdownSeparator } from "@/components/ui/dropdown";
import {
  DashboardSectionHeader,
  DashboardSearch,
  DashboardFilterPills,
} from "@/components/dashboard/dashboard-sub-page";
import { sellerSidebarItems } from "@/lib/seller-sidebar";
import { sellerProducts } from "@/lib/portal-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Paused", value: "paused" },
];

const statusVariant: Record<string, "success" | "default" | "warning"> = {
  active: "success",
  draft: "default",
  paused: "warning",
};

const statusLabel: Record<string, string> = {
  active: "Active",
  draft: "Draft",
  paused: "Paused",
};

export default function SellerProductsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = sellerProducts.filter((p) => {
    const matchesFilter = activeFilter === "all" || p.status === activeFilter;
    const matchesSearch =
      search === "" ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.subject.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      sidebarItems={sellerSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Products" count={sellerProducts.length} />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search + Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search products…" />
            <DashboardFilterPills filters={filters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Desktop Table */}
        <FadeIn delay={40}>
          <div className="hidden overflow-hidden rounded-[12px] border border-ink/10 bg-white md:block">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-parchment/50">
                  <th className="px-5 py-3 font-medium text-ink/60">Resource</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Subject</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Price</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Sales</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Revenue</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Rating</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                      <p className="mt-0.5 text-[11px] text-slate">{p.level}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-slate">{p.subject}</td>
                    <td className="px-5 py-3.5 font-medium text-ink">${p.price.toFixed(2)}</td>
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
                    <td className="px-5 py-3.5">
                      <Dropdown
                        trigger={
                          <button className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </button>
                        }
                      >
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          }
                        >
                          Edit
                        </DropdownItem>
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                            </svg>
                          }
                        >
                          Duplicate
                        </DropdownItem>
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          }
                        >
                          View
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem
                          danger
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          }
                        >
                          Delete
                        </DropdownItem>
                      </Dropdown>
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
            {filtered.map((p) => (
              <div key={p.id} className="rounded-[12px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-ink line-clamp-1">{p.title}</p>
                    <p className="mt-0.5 text-[11px] text-slate">{p.subject} · {p.level}</p>
                  </div>
                  <Badge variant={statusVariant[p.status]}>{statusLabel[p.status]}</Badge>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-[11px] text-slate">Price</p>
                    <p className="text-[13px] font-medium text-ink">${p.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate">Sales</p>
                    <p className="text-[13px] font-medium text-ink">{p.sales}</p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate">Revenue</p>
                    <p className="text-[13px] font-medium text-ink">${p.revenue}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-brass" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span className="text-[12px] font-medium text-ink">{p.rating}</span>
                  </div>
                  <Dropdown
                    trigger={
                      <button className="flex h-8 w-8 items-center justify-center rounded-[6px] text-ink/40 transition-colors hover:bg-parchment hover:text-ink">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="5" r="1" />
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="12" cy="19" r="1" />
                        </svg>
                      </button>
                    }
                  >
                    <DropdownItem>Edit</DropdownItem>
                    <DropdownItem>Duplicate</DropdownItem>
                    <DropdownItem>View</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem danger>Delete</DropdownItem>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[16px] text-ink">No products found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
