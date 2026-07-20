"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar, Footer, ResourceCard } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { products } from "@/lib/dummy-data";
import { FilterSidebar, type FilterState, defaultFilters } from "@/components/marketplace/filter-sidebar";
import { Pagination } from "@/components/marketplace/pagination";
import { MobileFilterDrawer } from "@/components/marketplace/mobile-filter-drawer";
import { EmptyState, NoResults } from "@/components/marketplace/browse-states";

const ITEMS_PER_PAGE = 9;

function parsePriceRange(range: string, price: number): boolean {
  if (range === "all") return true;
  if (range === "0-5") return price < 5;
  if (range === "5-10") return price >= 5 && price < 10;
  if (range === "10-15") return price >= 10 && price < 15;
  if (range === "15+") return price >= 15;
  return true;
}

function sortProducts(items: typeof products, sort: string) {
  const sorted = [...items];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "popular":
    default:
      return sorted.sort((a, b) => b.downloads - a.downloads);
  }
}

export default function BrowsePage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products;

    if (filters.subjects.length > 0) {
      result = result.filter((p) => filters.subjects.includes(p.subject));
    }
    if (filters.levels.length > 0) {
      result = result.filter((p) => filters.levels.includes(p.level));
    }
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.type));
    }
    if (filters.priceRange !== "all") {
      result = result.filter((p) => parsePriceRange(filters.priceRange, p.price));
    }

    return sortProducts(result, filters.sort);
  }, [filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handleFilterChange = (f: FilterState) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero banner */}
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="exam-code text-[12px] text-brass">Browse</p>
            <h1 className="mt-2 font-display text-[32px] text-ink md:text-[40px]">
              All resources
            </h1>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-slate">
              Past papers, mock tests, worksheets and revision notes — every resource tagged to its exact exam code.
            </p>
          </div>
        </section>

        {/* Search + mobile filter toggle */}
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
            <div className="relative flex-1">
              <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search by title, subject or exam code…"
                className="input-field w-full rounded-[8px] border border-ink/15 bg-parchment py-3 pl-10 pr-4 text-[14px] text-ink placeholder:text-ink/40"
              />
            </div>
            <button
              onClick={() => setDrawerOpen(true)}
              className="btn-outline flex items-center gap-2 rounded-[8px] border border-ink/15 px-4 py-3 text-[13px] font-medium text-ink md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Filters
            </button>
          </div>
        </section>

        {/* Content area */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex gap-10">
            {/* Desktop sidebar */}
            <div className="hidden w-56 shrink-0 md:block">
              <div className="sticky top-24">
                <FilterSidebar onFilterChange={handleFilterChange} />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results header */}
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-slate">
                  <span className="font-medium text-ink">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "resource" : "resources"} found
                </p>
              </div>

              {products.length === 0 ? (
                <EmptyState />
              ) : filtered.length === 0 ? (
                <NoResults />
              ) : (
                <>
                  <FadeIn>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {paginated.map((p) => (
                        <ResourceCard key={p.id} product={p} />
                      ))}
                    </div>
                  </FadeIn>

                  <div className="mt-10">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <MobileFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onFilterChange={handleFilterChange}
      />
    </>
  );
}
