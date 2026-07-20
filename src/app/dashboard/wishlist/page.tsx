"use client";

import { useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DashboardSearch, DashboardEmpty, DashboardSectionHeader } from "@/components/dashboard/dashboard-sub-page";
import { ResourceCard } from "@/components/marketplace/resource-card";
import { FadeIn } from "@/components/ui/fade-in";
import { products } from "@/lib/dummy-data";
import { studentSidebarItems } from "@/lib/dashboard-sidebar";

const initialWishlist = [products[3], products[4], products[5], products[6]];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase())
  );

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout sidebarItems={studentSidebarItems}>
      <div className="mx-auto max-w-7xl space-y-6">
        <FadeIn>
          <DashboardSectionHeader title="Wishlist" count={items.length} />
        </FadeIn>

        {items.length > 0 && (
          <FadeIn delay={40}>
            <DashboardSearch value={search} onChange={setSearch} placeholder="Search wishlist…" />
          </FadeIn>
        )}

        {filtered.length === 0 && items.length === 0 ? (
          <FadeIn delay={60}>
            <DashboardEmpty
              icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
              title="Your wishlist is empty"
              description="Save resources you're interested in and come back later."
              action={{ label: "Browse Resources", href: "/browse" }}
            />
          </FadeIn>
        ) : filtered.length === 0 ? (
          <FadeIn delay={60}>
            <DashboardEmpty
              icon={<svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>}
              title="No results found"
              description="Try a different search term."
            />
          </FadeIn>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((product, i) => (
              <FadeIn key={product.id} delay={60 + i * 40}>
                <div className="group relative">
                  <ResourceCard product={product} />
                  <div className="absolute right-3 top-3 z-10 flex gap-1.5">
                    <button
                      onClick={() => remove(product.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink/40 shadow-sm transition-colors hover:bg-white hover:text-red-500"
                      title="Remove from wishlist"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-ink/40 shadow-sm transition-colors hover:bg-teal-dark hover:text-white"
                      title="Move to cart"
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
