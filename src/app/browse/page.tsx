"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar, Footer, ResourceCard } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { useProducts } from "@/lib/product-store";
import type { Product } from "@/lib/types";
import { FilterSidebar, type FilterState, defaultFilters } from "@/components/marketplace/filter-sidebar";
import { Pagination } from "@/components/marketplace/pagination";
import { MobileFilterDrawer } from "@/components/marketplace/mobile-filter-drawer";
import { EmptyState, NoResults } from "@/components/marketplace/browse-states";

const ITEMS_PER_PAGE = 9;

function sortProducts(items: Product[], sort: string) {
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

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") || undefined;
  const initialGrade = searchParams.get("grade") || undefined;

  const { products } = useProducts();
  const [filters, setFilters] = useState<FilterState>(() => ({
    ...defaultFilters,
    subjects: initialSubject ? [initialSubject] : [],
    levels: initialGrade ? [initialGrade] : [],
  }));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = products.filter((p) => p.published);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.subject.toLowerCase().includes(q) ||
          p.examCode.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    if (filters.subjects.length > 0) {
      result = result.filter((p) => filters.subjects.includes(p.subject));
    }
    if (filters.levels.length > 0) {
      result = result.filter((p) => filters.levels.includes(p.level));
    }

    return sortProducts(result, filters.sort);
  }, [products, filters, search]);

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
              {initialSubject ? `${initialSubject} resources` : "All resources"}
            </h1>
            <p className="mt-3 max-w-md text-[14px] leading-relaxed text-slate">
              Past papers, mock tests, worksheets and revision notes — every resource tagged to its exact exam code.
            </p>
          </div>
        </section>

        {/* Search + mobile filter toggle */}
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
            <div className="relative max-w-[70%]">
              <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
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
              <div className="sticky top-24 rounded-[var(--radius-card)] border border-ink/[0.06] bg-warm-gray/40 p-5">
                <FilterSidebar onFilterChange={handleFilterChange} initialSubject={initialSubject} initialGrade={initialGrade} />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results header */}
              <div className="flex items-center justify-between">
                <p className="text-[13px] text-slate/70">
                  Showing{" "}
                  <span className="font-medium text-ink">{filtered.length}</span>{" "}
                  {filtered.length === 1 ? "resource" : "resources"}
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
        initialSubject={initialSubject}
        initialGrade={initialGrade}
      />
    </>
  );
}

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowseContent />
    </Suspense>
  );
}
