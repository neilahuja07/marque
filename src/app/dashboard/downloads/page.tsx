"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardSearch, DashboardFilterPills, DashboardEmpty, DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { FadeIn } from "@/components/ui/fade-in";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

interface DownloadItem {
  product_id: string;
  title: string;
  purchased_at: string;
}

const filters = [
  { label: "All", value: "all" },
  { label: "Science", value: "Science" },
  { label: "Mathematics", value: "Mathematics" },
  { label: "English", value: "English" },
];

export default function DownloadsPage() {
  const { user, loading: authLoading } = useAuth();
  const [downloads, setDownloads] = useState<DownloadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchDownloads = async () => {
      const supabase = createClient();
      const { data: orders } = await supabase
        .from("orders")
        .select("id, created_at")
        .eq("user_id", user.id)
        .eq("status", "paid");

      if (orders && orders.length > 0) {
        const orderIds = orders.map((o: { id: string; created_at: string }) => o.id);
        const { data: items } = await supabase
          .from("order_items")
          .select("product_id, title, order_id")
          .in("order_id", orderIds);

        if (items) {
          const orderDates = new Map(orders.map((o: { id: string; created_at: string }) => [o.id, o.created_at]));
          const uniqueProducts = new Map<string, DownloadItem>();
          items.forEach((item: { product_id: string; title: string; order_id: string }) => {
            if (!uniqueProducts.has(item.product_id)) {
              uniqueProducts.set(item.product_id, {
                product_id: item.product_id,
                title: item.title,
                purchased_at: (orderDates.get(item.order_id) as string) || "",
              });
            }
          });
          setDownloads(Array.from(uniqueProducts.values()));
        }
      }
      setLoading(false);
    };

    fetchDownloads();
  }, [user]);

  const filtered = downloads.filter((d) => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selected.length === filtered.length) {
      setSelected([]);
    } else {
      setSelected(filtered.map((d) => d.product_id));
    }
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-7xl space-y-6">
        <FadeIn>
          <DashboardSectionHeader
            title="My Downloads"
            count={downloads.length}
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
              ) : undefined
            }
          />
        </FadeIn>

        <FadeIn delay={40}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search downloads…" />
          </div>
        </FadeIn>

        {loading ? (
          <FadeIn delay={60}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-[13px] text-slate">Loading downloads...</p>
            </div>
          </FadeIn>
        ) : filtered.length === 0 ? (
          <FadeIn delay={60}>
            <DashboardEmpty
              icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>}
              title="No downloads found"
              description={search ? "Try adjusting your search." : "Your purchased resources will appear here."}
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
                      <th className="w-10 px-4 py-3">
                        <input type="checkbox" checked={selected.length === filtered.length && filtered.length > 0} onChange={toggleAll} className="h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                      </th>
                      <th className="px-4 py-3 font-medium text-ink/60">Resource</th>
                      <th className="px-4 py-3 font-medium text-ink/60">Purchased</th>
                      <th className="px-4 py-3 font-medium text-ink/60"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((dl) => (
                      <tr key={dl.product_id} className="border-b border-ink/5 last:border-0">
                        <td className="px-4 py-3.5">
                          <input type="checkbox" checked={selected.includes(dl.product_id)} onChange={() => toggleSelect(dl.product_id)} className="h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                        </td>
                        <td className="px-4 py-3.5">
                          <p className="font-medium text-ink">{dl.title}</p>
                        </td>
                        <td className="px-4 py-3.5 text-slate">
                          {new Date(dl.purchased_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3.5">
                          <button className="rounded-[6px] bg-teal-dark/10 px-3 py-1.5 text-[12px] font-medium text-teal-dark transition-colors hover:bg-teal-dark hover:text-white">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </FadeIn>

            <div className="space-y-3 md:hidden">
              {filtered.map((dl, i) => (
                <FadeIn key={dl.product_id} delay={60 + i * 40}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <input type="checkbox" checked={selected.includes(dl.product_id)} onChange={() => toggleSelect(dl.product_id)} className="mt-1 h-4 w-4 rounded border-ink/20 accent-teal-dark" />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-medium text-ink line-clamp-2">{dl.title}</p>
                        <p className="mt-1 text-[11px] text-slate">
                          {new Date(dl.purchased_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="btn-primary w-full rounded-[6px] bg-teal-dark px-3 py-2 text-[12px] font-medium text-white">Download</button>
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
