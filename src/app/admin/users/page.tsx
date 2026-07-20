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
import { adminUsers } from "@/lib/portal-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Students", value: "student" },
  { label: "Sellers", value: "seller" },
  { label: "Admins", value: "admin" },
  { label: "Suspended", value: "suspended" },
];

const roleVariant: Record<string, "info" | "success" | "warning"> = {
  student: "info",
  seller: "success",
  admin: "warning",
};

const statusVariant: Record<string, "success" | "error"> = {
  active: "success",
  suspended: "error",
};

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = adminUsers.filter((u) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "suspended" ? u.status === "suspended" : u.role === activeFilter);
    const matchesSearch =
      search === "" ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Users" count={adminUsers.length} />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Search + Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search users…" />
            <DashboardFilterPills filters={filters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Desktop Table */}
        <FadeIn delay={40}>
          <div className="hidden overflow-hidden rounded-[12px] border border-ink/10 bg-white md:block">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-ink/10 bg-parchment/50">
                  <th className="px-5 py-3 font-medium text-ink/60">User</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Role</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Joined</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Orders</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Status</th>
                  <th className="px-5 py-3 font-medium text-ink/60">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-ink/5 last:border-0">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-[11px] font-medium text-teal-dark">
                          {u.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-ink">{u.name}</p>
                          <p className="text-[11px] text-slate">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={roleVariant[u.role]}>{u.role}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-slate">
                      {new Date(u.joined).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-3.5 text-slate">{u.orders}</td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusVariant[u.status]}>{u.status}</Badge>
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
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          }
                        >
                          View Profile
                        </DropdownItem>
                        <DropdownItem
                          icon={
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                            </svg>
                          }
                        >
                          Suspend
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
            {filtered.map((u) => (
              <div key={u.id} className="rounded-[12px] border border-ink/10 bg-white p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/15 text-[11px] font-medium text-teal-dark">
                      {u.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-ink">{u.name}</p>
                      <p className="text-[11px] text-slate">{u.email}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[u.status]}>{u.status}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-ink/5 pt-3">
                  <Badge variant={roleVariant[u.role]}>{u.role}</Badge>
                  <p className="text-[12px] text-slate">{u.orders} orders</p>
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
            <h3 className="mt-4 font-display text-[16px] text-ink">No users found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
