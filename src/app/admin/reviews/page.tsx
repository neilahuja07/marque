"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { FadeIn } from "@/components/ui/fade-in";
import { Badge } from "@/components/ui/badge";
import {
  DashboardSectionHeader,
  DashboardFilterPills,
} from "@/components/dashboard/dashboard-sub-page";
import { adminSidebarItems } from "@/lib/admin-sidebar";
import { adminReviews } from "@/lib/portal-data";

const filters = [
  { label: "All", value: "all" },
  { label: "Approved", value: "approved" },
  { label: "Pending", value: "pending" },
  { label: "Reported", value: "reported" },
];

const statusVariant: Record<string, "success" | "warning" | "error"> = {
  approved: "success",
  pending: "warning",
  reported: "error",
};

export default function AdminReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = adminReviews.filter((r) => {
    return activeFilter === "all" || r.status === activeFilter;
  });

  return (
    <DashboardLayout
      sidebarItems={adminSidebarItems}
      header={
        <div className="mx-auto max-w-7xl px-6 py-4">
          <DashboardSectionHeader title="Reviews" count={adminReviews.length} />
        </div>
      }
    >
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Filters */}
        <FadeIn>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardFilterPills filters={filters} active={activeFilter} onChange={setActiveFilter} />
          </div>
        </FadeIn>

        {/* Reviews List */}
        <FadeIn delay={40}>
          <div className="space-y-4">
            {filtered.map((review) => (
              <div
                key={review.id}
                className={`rounded-[12px] border bg-white p-5 transition-all hover:shadow-sm ${
                  review.status === "reported" ? "border-red-200" : "border-ink/10"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sage/15 text-[12px] font-medium text-teal-dark">
                      {review.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[13px] font-medium text-ink">{review.name}</p>
                        <Badge variant={statusVariant[review.status]}>{review.status}</Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <svg key={j} viewBox="0 0 24 24" className={`h-3 w-3 ${j < review.rating ? "text-brass" : "text-ink/10"}`} fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate">
                    {new Date(review.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>

                <p className="mt-3 text-[13px] text-slate">{review.text}</p>

                <p className="mt-2 text-[11px] text-ink/40">Product: {review.product}</p>

                <div className="mt-4 flex items-center gap-2 border-t border-ink/5 pt-4">
                  {review.status !== "approved" && (
                    <button className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink">
                      Approve
                    </button>
                  )}
                  {review.status !== "reported" && (
                    <button className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-slate transition-colors hover:border-ink/20 hover:text-ink">
                      Hide
                    </button>
                  )}
                  <button className="rounded-[6px] border border-red-200 px-3 py-1.5 text-[12px] font-medium text-red-600 transition-colors hover:bg-red-50">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-parchment text-ink/25">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-[16px] text-ink">No reviews found</h3>
            <p className="mt-1.5 max-w-sm text-[13px] text-slate">Try selecting a different filter.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
