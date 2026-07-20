"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardSearch, DashboardFilterPills, DashboardEmpty, DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { FadeIn } from "@/components/ui/fade-in";
import { products } from "@/lib/dummy-data";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

const downloadsData = [
  { product: products[0], purchasedAt: "2025-06-10", lastDownloaded: "2 hours ago", format: "PDF", downloads: 4 },
  { product: products[1], purchasedAt: "2025-06-10", lastDownloaded: "1 day ago", format: "PDF", downloads: 2 },
  { product: products[2], purchasedAt: "2025-05-22", lastDownloaded: "3 days ago", format: "PDF", downloads: 7 },
];

const filters = [
  { label: "All", value: "all" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "Science", value: "Science" },
  { label: "English", value: "English" },
];

export default function DownloadsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return downloadsData.filter((d) => {
      const matchSearch = !search || d.product.title.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "all" || d.product.subject === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((d) => d.product.id));
    }
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-7xl space-y-6">
        <FadeIn>
          <DashboardSectionHeader
            title="My Downloads"
            count={downloadsData.length}
            actions={
              selected.length > 0 ? (
                <button className="btn-primary inline-flex items-center gap-2 rounded-[8px] bg-teal-dark px-4 py-2.5 text-[13px] font-medium text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download ({selected.length})
                </button>
              ) : (
                <button className="btn-outline inline-flex items-center gap-2 rounded-[8px] border border-ink/15 px-4 py-2.5 text-[13px] font-medium text-ink">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Bulk Download
                </button>
              )
            }
          />
        </FadeIn>

        {/* Search + Filters */}
        <FadeIn delay={40}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search downloads…" />
            <DashboardFilterPills filters={filters} active={filter} onChange={setFilter} />
          </div>
        </FadeIn>

        {filtered.length === 0 ? (
          <FadeIn delay={60}>
            <DashboardEmpty
              icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>}
              title="No downloads found"
              description="Try adjusting your search or filters."
              action={{ label: "Browse Resources", href: "/browse" }}
            />
          </FadeIn>
        ) : (
          <>
            {/* Desktop table */}
            <FadeIn delay={60}>
              <div className="hidden overflow-hidden rounded-[10px] border border-ink/10 bg-white md:block">
                <table className="w-full text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-ink/10 bg-parchment/50">
                      <th className="w-10 px-4 py-3">
                        <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                      </th>
                      <th className="px-4 py-3 font-medium text-ink/60">Resource</th>
                      <th className="px-4 py-3 font-medium text-ink/60">Purchased</th>
                      <th className="px-4 py-3 font-medium text-ink/60">Last Downloaded</th>
                      <th className="px-4 py-3 font-medium text-ink/60">Format</th>
                      <th className="px-4 py-3 font-medium text-ink/60">Downloads</th>
                      <th className="px-4 py-3 font-medium text-ink/60"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((dl) => (
                      <tr key={dl.product.id} className="border-b border-ink/5 last:border-0">
                        <td className="px-4 py-3.5">
                          <input type="checkbox" checked={selected.includes(dl.product.id)} onChange={() => toggleSelect(dl.product.id)} className="h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                        </td>
                        <td className="px-4 py-3.5">
                          <Link href={`/product/${dl.product.slug}`} className="font-medium text-ink hover:text-teal-dark">{dl.product.title}</Link>
                          <p className="mt-0.5 text-[11px] text-slate">{dl.product.subject} · {dl.product.level}</p>
                        </td>
                        <td className="px-4 py-3.5 text-slate">{dl.purchasedAt}</td>
                        <td className="px-4 py-3.5 text-slate">{dl.lastDownloaded}</td>
                        <td className="px-4 py-3.5"><span className="rounded bg-parchment px-2 py-0.5 text-[11px] font-medium text-slate">{dl.format}</span></td>
                        <td className="px-4 py-3.5 text-slate">{dl.downloads}/10</td>
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button className="rounded-[6px] bg-teal-dark/10 px-3 py-1.5 text-[12px] font-medium text-teal-dark transition-colors hover:bg-teal-dark hover:text-white">Download</button>
                            <Link href={`/product/${dl.product.slug}`} className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-parchment">Preview</Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            {/* Mobile cards */}
            <div className="space-y-3 md:hidden">
              {filtered.map((dl, i) => (
                <FadeIn key={dl.product.id} delay={60 + i * 40}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selected.includes(dl.product.id)} onChange={() => toggleSelect(dl.product.id)} className="mt-1 h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                      <div className="min-w-0 flex-1">
                        <Link href={`/product/${dl.product.slug}`} className="text-[13px] font-medium text-ink hover:text-teal-dark line-clamp-2">{dl.product.title}</Link>
                        <p className="mt-1 text-[11px] text-slate">{dl.product.subject} · {dl.product.level}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate">
                      <span>{dl.purchasedAt}</span>
                      <span>{dl.downloads}/10 downloads</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button className="btn-primary flex-1 rounded-[6px] bg-teal-dark px-3 py-2 text-[12px] font-medium text-white">Download</button>
                      <Link href={`/product/${dl.product.slug}`} className="btn-outline flex-1 rounded-[6px] border border-ink/15 px-3 py-2 text-center text-[12px] font-medium text-ink">Preview</Link>
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
