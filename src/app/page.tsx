import type { Metadata } from "next";
import Link from "next/link";
import {
  Navbar,
  Hero,
  CategoryCard,
  ResourceCard,
  Testimonials,
  CTA,
  Footer,
} from "@/components/marketplace";
import { products, categories } from "@/lib/dummy-data";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Marque — Premium Cambridge IGCSE, O Level & A Level Resources",
  description: "Past papers, mock tests, worksheets and revision notes for Cambridge Mathematics, Science and English. Trusted by thousands of students.",
  openGraph: {
    title: "Marque — Premium Cambridge IGCSE, O Level & A Level Resources",
    description: "Past papers, mock tests, worksheets and revision notes for Cambridge Mathematics, Science and English.",
    type: "website",
    siteName: "Marque",
  },
};

export default function HomePage() {
  const bestsellers = products.filter((p) => p.bestseller);

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
                Three subjects, done properly
              </h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {categories.map((c) => (
                <CategoryCard key={c.slug} {...c} />
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

      <CTA />

      <FadeIn delay={80}>
        <Testimonials />
      </FadeIn>

      <Footer />
    </>
  );
}
