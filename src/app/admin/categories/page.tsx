"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import {
  DashboardSectionHeader,
  DashboardFilterPills,
} from "@/components/dashboard/dashboard-sub-page";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { adminCategories } from "@/lib/portal-data";

const typeFilters = [
  { label: "All", value: "all" },
  { label: "Subjects", value: "subject" },
  { label: "Levels", value: "level" },
  { label: "Resource Types", value: "resource_type" },
  { label: "Tags", value: "tag" },
];

const typeVariant: Record<string, "info" | "success" | "warning" | "default"> = {
  subject: "info",
  level: "success",
  resource_type: "warning",
  tag: "default",
};

const typeLabel: Record<string, string> = {
  subject: "Subject",
  level: "Level",
  resource_type: "Resource Type",
  tag: "Tag",
};

export default function AdminCategoriesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("subject");
  const [categories, setCategories] = useState(adminCategories);

  const filtered = categories.filter((c) => {
    return activeFilter === "all" || c.type === activeFilter;
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newCat = {
      id: `CAT-${String(categories.length + 1).padStart(3, "0")}`,
      name: newName.trim(),
      type: newType,
      count: 0,
      status: "active" as const,
    };
    setCategories([...categories, newCat]);
    setNewName("");
    setNewType("subject");
    setShowAdd(false);
  };

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader
            title="Categories"
            count={categories.length}
            actions={
              <button
                onClick={() => setShowAdd(true)}
                className="btn-primary inline-flex items-center gap-2 rounded-[8px] bg-teal-dark px-4 py-2.5 text-[13px] font-medium text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Category
              </button>
            }
          />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardFilterPills filters={typeFilters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Category Grid */}
        <FadeIn delay={40}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => (
              <div key={c.id} className="rounded-[12px] border border-ink/10 bg-white p-5 transition-all hover:shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-[16px] text-ink">{c.name}</p>
                    <Badge variant={typeVariant[c.type]} className="mt-2">{typeLabel[c.type]}</Badge>
                  </div>
                  <span className="text-[13px] font-medium text-ink">{c.count}</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block h-2 w-2 rounded-full ${c.status === "active" ? "bg-sage" : "bg-ink/20"}`} />
                    <span className="text-[12px] text-slate capitalize">{c.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="rounded-[6px] p-1.5 text-ink/40 transition-colors hover:bg-parchment hover:text-ink">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="rounded-[6px] p-1.5 text-ink/40 transition-colors hover:bg-red-50 hover:text-red-600">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
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
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[16px] text-ink">No categories found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try selecting a different filter.</p>
          </div>
        )}

        {/* Add Category Modal */}
        <Modal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          title="Add Category"
          description="Create a new category for resources."
        >
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-ink/70">Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. History"
                className="input-field mt-1.5 w-full rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-ink/70">Type</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/10 bg-parchment py-2.5 px-3.5 text-[13px] text-ink"
              >
                <option value="subject">Subject</option>
                <option value="level">Level</option>
                <option value="resource_type">Resource Type</option>
                <option value="tag">Tag</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="rounded-[8px] border border-ink/10 px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-parchment"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-[8px] bg-teal-dark px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-teal-dark/90"
              >
                Add Category
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
