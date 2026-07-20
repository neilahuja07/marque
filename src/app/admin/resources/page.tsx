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
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { adminResources } from "@/lib/portal-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Featured", value: "featured" },
];

const statusVariant: Record<string, "success" | "warning" | "error"> = {
  approved: "success",
  pending: "warning",
  rejected: "error",
};

export default function AdminResourcesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = adminResources.filter((r) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "featured" ? r.featured : r.status === activeFilter);
    const matchesSearch =
      search === "" ||
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.seller.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Resources" count={adminResources.length} />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search + Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search resources…" />
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
                  <th className="px-5 py-3 font-medium text-ink/60">Subject</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Submitted</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ink line-clamp-1">{r.title}</p>
                        {r.featured && (
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brass" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-slate">{r.seller}</p>
                    </td>
                    <td className="px-5 py-3.5 text-slate">{r.subject}</td>
                    <td className="px-5 py-3.5 text-slate">
                      {new Date(r.submitted).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
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
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          }
                        >
                          Approve
                        </DropdownItem>
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                          }
                        >
                          Reject
                        </DropdownItem>
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                          }
                        >
                          Feature
                        </DropdownItem>
                        <DropdownSeparator />
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          }
                        >
                          Edit Metadata
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
            {filtered.map((r) => (
              <div key={r.id} className="rounded-[12px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-ink line-clamp-1">{r.title}</p>
                      {r.featured && (
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 text-brass" fill="currentColor">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate">{r.seller} · {r.subject}</p>
                  </div>
                  <Badge variant={statusVariant[r.status]}>{r.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                  <p className="text-[11px] text-slate">
                    {new Date(r.submitted).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </p>
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
                    <DropdownItem>Approve</DropdownItem>
                    <DropdownItem>Reject</DropdownItem>
                    <DropdownItem>Feature</DropdownItem>
                    <DropdownSeparator />
                    <DropdownItem>Edit Metadata</DropdownItem>
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
            <h3 className="mt-4 font-display text-[16px] text-ink">No resources found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
