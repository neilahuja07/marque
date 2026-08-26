"use client";

import Link from "next/link";
import {
  Navbar,
  Hero,
  CategoryCard,
  ResourceCard,
  Footer,
} from "@/components/marketplace";
import { useProducts } from "@/lib/product-store";
import { categories } from "@/lib/dummy-data";
import { FadeIn } from "@/components/ui/fade-in";

export default function HomePage() {
  const { products } = useProducts();
  const bestsellers = products.filter((p) => p.bestseller && p.published);

  const dynamicCategories = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.subject === c.name && p.published).length,
  }));

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <Hero />

        {/* Categories */}
        <FadeIn delay={80}>
          <section className="mx-auto max-w-7xl px-6 py-20">
            <div>
              <p className="exam-code text-[12px] text-brass">By subject</p>
              <h2 className="mt-2 font-display text-[30px] text-ink">
                Quality resources. Clear preparation.
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {dynamicCategories.map((c) => (
                <CategoryCard
                  key={c.slug}
                  {...c}
                  comingSoon={c.slug !== "science"}
                />
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Bestsellers */}
        <FadeIn delay={80}>
          <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="exam-code text-[12px] text-brass">Most downloaded</p>
                  <h2 className="mt-2 font-display text-[30px] text-ink">
                    Bestselling resources
                  </h2>
                </div>
                <Link
                  href="/browse"
                  className="hidden text-[14px] font-medium text-teal-dark hover:underline md:inline"
                >
                  Browse all →
                </Link>
              </div>
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {bestsellers.map((p) => (
                  <ResourceCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

      </main>

      <Footer />
    </>
  );
}
