"use client";

import { use } from "react";
import Link from "next/link";
import { Navbar, Footer, ResourceCard } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { useProducts } from "@/lib/product-store";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { ProductGallery } from "@/components/marketplace/product-gallery";
import { WhatsIncluded } from "@/components/marketplace/whats-included";
import { SyllabusCoverage } from "@/components/marketplace/syllabus-coverage";
import { ResourceInfo } from "@/components/marketplace/resource-info";
import { SamplePages } from "@/components/marketplace/sample-pages";
import { ReviewsSection } from "@/components/marketplace/reviews-section";
import { ProductFAQ } from "@/components/marketplace/product-faq";
import { RatingStars } from "@/components/marketplace/rating-stars";
import { ExamCodeBadge } from "@/components/marketplace/exam-code-badge";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { getProductBySlug, products } = useProducts();
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="font-display text-[28px] text-ink">Product Not Found</h1>
            <p className="mt-2 text-[14px] text-slate">The resource you are looking for does not exist.</p>
            <Link href="/browse" className="mt-4 inline-block btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white">
              Browse Resources
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = products
    .filter((p) => p.published && p.id !== product.id && (p.subject === product.subject || p.level === product.level))
    .slice(0, 4);

  const resourceInfo = [
    { label: "Pages", value: String(product.pages) },
    { label: "Format", value: product.format || "PDF" },
    { label: "Language", value: product.language || "English" },
    { label: "Exam Board", value: product.examBoard || "Cambridge" },
    { label: "Subject", value: product.subject },
    { label: "Level", value: product.level },
    { label: "Version", value: product.version || "1.0" },
    { label: "Updated", value: product.updatedAt },
    { label: "Downloads", value: product.downloads.toLocaleString() },
  ];

  const defaultDistribution = [
    { stars: 5, count: Math.floor(product.reviewCount * 0.82) },
    { stars: 4, count: Math.floor(product.reviewCount * 0.12) },
    { stars: 3, count: Math.floor(product.reviewCount * 0.04) },
    { stars: 2, count: Math.floor(product.reviewCount * 0.015) },
    { stars: 1, count: Math.max(1, Math.floor(product.reviewCount * 0.005)) },
  ];

  const defaultReviews = [
    { name: "Student", role: "IGCSE Candidate", rating: 5, date: "2025-06-01", text: "Excellent resource. The worked solutions are clear and easy to follow." },
    { name: "Parent", role: "London, UK", rating: 5, date: "2025-05-28", text: "Very helpful for my child's revision. Highly recommended." },
    { name: "Tutor", role: "Dubai, UAE", rating: 4, date: "2025-05-22", text: "Good quality material. I use this with several of my students." },
  ];

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Breadcrumb + Hero */}
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Browse", href: "/browse" },
                { label: product.subject, href: `/categories/${product.subject.toLowerCase()}` },
                { label: product.title },
              ]}
            />
          </div>
        </section>

        {/* Main product section */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            {/* Left: Gallery */}
            <FadeIn>
              <ProductGallery
                cover={product.cover}
                title={product.title}
                type={product.type}
              />
            </FadeIn>

            {/* Right: Details */}
            <FadeIn delay={100}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <ExamCodeBadge code={product.examCode} />
                  {product.bestseller && (
                    <span className="rounded-full bg-brass/15 px-2.5 py-0.5 text-[11px] font-medium text-brass">
                      Bestseller
                    </span>
                  )}
                </div>

                <h1 className="mt-4 font-display text-[28px] leading-snug text-ink md:text-[32px]">
                  {product.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate">
                  <span>{product.subject}</span>
                  <span className="text-ink/20">·</span>
                  <span>{product.level}</span>
                  <span className="text-ink/20">·</span>
                  <span>{product.type}</span>
                  {product.session && (
                    <>
                      <span className="text-ink/20">·</span>
                      <span>{product.session}</span>
                    </>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <RatingStars rating={product.rating} count={product.reviewCount} />
                  <span className="text-[12px] text-slate">
                    {product.downloads.toLocaleString()} downloads
                  </span>
                </div>

                <p className="mt-4 text-[14px] leading-relaxed text-slate">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-3">
                  <span className="font-display text-[32px] text-ink">${product.price.toFixed(2)}</span>
                  {product.originalPrice && (
                    <span className="text-[16px] text-slate line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="rounded-full bg-teal-dark/10 px-2.5 py-0.5 text-[11px] font-medium text-teal-dark">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-teal-dark">
                  <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 8h12M10 4l4 4-4 4" />
                  </svg>
                  Instant download
                </p>

                {/* CTAs */}
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button className="btn-primary flex-1 rounded-[8px] bg-teal-dark px-6 py-3 text-[15px] font-medium text-white">
                    Add to cart
                  </button>
                  <button className="btn-primary flex-1 rounded-[8px] bg-sage px-6 py-3 text-[15px] font-medium text-ink">
                    Buy now
                  </button>
                </div>

                {/* Secondary actions */}
                <div className="mt-4 flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-[8px] py-2.5 px-3 text-[13px] text-slate transition-colors hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    Wishlist
                  </button>
                  <button className="flex items-center gap-2 rounded-[8px] py-2.5 px-3 text-[13px] text-slate transition-colors hover:text-ink">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share
                  </button>
                </div>

                {/* What's included */}
                {product.whatsIncluded && (
                  <div className="mt-6">
                    <WhatsIncluded items={product.whatsIncluded} />
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Description */}
        {product.longDescription && (
          <FadeIn>
            <section className="border-t border-ink/10 bg-white">
              <div className="mx-auto max-w-7xl px-6 py-14">
                <h2 className="font-display text-[22px] text-ink">Description</h2>
                <div className="mt-5 max-w-3xl space-y-4 text-[14px] leading-relaxed text-ink/80">
                  {product.longDescription.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Syllabus coverage */}
        {product.syllabusCoverage && (
          <FadeIn>
            <section className="mx-auto max-w-7xl px-6 py-14">
              <SyllabusCoverage topics={product.syllabusCoverage} />
            </section>
          </FadeIn>
        )}

        {/* Resource information */}
        <FadeIn>
          <section className="border-t border-ink/10 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
              <ResourceInfo info={resourceInfo} />
            </div>
          </section>
        </FadeIn>

        {/* Sample pages */}
        <FadeIn>
          <section className="mx-auto max-w-7xl px-6 py-14">
            <SamplePages />
          </section>
        </FadeIn>

        {/* Reviews */}
        <FadeIn>
          <section className="border-t border-ink/10 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
              <ReviewsSection
                rating={product.rating}
                reviewCount={product.reviewCount}
                distribution={product.ratingDistribution || defaultDistribution}
                reviews={product.reviews || defaultReviews}
              />
            </div>
          </section>
        </FadeIn>

        {/* Product FAQ */}
        {product.productFaqs && (
          <FadeIn>
            <section className="mx-auto max-w-7xl px-6 py-14">
              <ProductFAQ faqs={product.productFaqs} />
            </section>
          </FadeIn>
        )}

        {/* Related resources */}
        {related.length > 0 && (
          <FadeIn>
            <section className="border-t border-ink/10 bg-white">
              <div className="mx-auto max-w-7xl px-6 py-14">
                <h2 className="font-display text-[22px] text-ink">Related resources</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {related.map((p) => (
                    <ResourceCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Final CTA */}
        <section className="border-t border-ink/10 bg-ink">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-16 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-[28px] text-parchment">
                Find the right resource for your exam
              </h2>
              <p className="mt-2 max-w-md text-[14px] text-parchment/70">
                Browse our full collection of past papers, mock tests, worksheets and revision notes.
              </p>
            </div>
            <Link
              href="/browse"
              className="btn-primary rounded-[8px] bg-sage px-6 py-3 text-[15px] font-medium text-ink"
            >
              Browse all resources
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
