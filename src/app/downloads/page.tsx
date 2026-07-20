"use client";

import Link from "next/link";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { products } from "@/lib/dummy-data";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";

const downloads = [
  { product: products[0], downloadedAt: "2025-06-10", format: "PDF" },
  { product: products[1], downloadedAt: "2025-06-10", format: "PDF" },
  { product: products[2], downloadedAt: "2025-05-22", format: "PDF" },
];

export default function DownloadsPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Dashboard", href: "/dashboard" }, { label: "Downloads" }]} />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pt-8 pb-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-[26px] text-ink">Downloads</h1>
              <p className="mt-1 text-[14px] text-slate">{downloads.length} purchased {downloads.length === 1 ? "resource" : "resources"}</p>
            </div>
            <Link href="/browse" className="btn-primary hidden rounded-[8px] bg-teal-dark px-5 py-3 text-[14px] font-medium text-white sm:inline-flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              Browse more
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((dl, i) => (
              <FadeIn key={dl.product.id} delay={i * 60}>
                <div className="group rounded-[10px] border border-ink/10 bg-white p-5 transition-all hover:border-ink/20 hover:shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-parchment">
                      <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink/25" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium text-ink line-clamp-2 group-hover:text-teal-dark">{dl.product.title}</p>
                      <p className="mt-1 text-[12px] text-slate">{dl.product.subject} · {dl.product.level}</p>
                      <p className="mt-1 text-[11px] text-ink/40">
                        Purchased {new Date(dl.downloadedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button className="btn-primary flex flex-1 items-center justify-center gap-2 rounded-[8px] bg-teal-dark px-4 py-2.5 text-[13px] font-medium text-white">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download {dl.format}
                    </button>
                    <Link
                      href={`/product/${dl.product.slug}`}
                      className="btn-outline flex items-center justify-center rounded-[8px] border border-ink/15 px-3 py-2.5 text-[13px] font-medium text-ink"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Info note */}
          <FadeIn delay={200}>
            <div className="mt-10 rounded-[10px] border border-ink/10 bg-parchment/50 p-5">
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-5 w-5 shrink-0 text-brass" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <p className="text-[13px] font-medium text-ink">Download policy</p>
                  <p className="mt-1 text-[12px] leading-relaxed text-slate">
                    You can download your purchased resources up to 10 times per file. Downloads are available for life. If you encounter any issues, contact support.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
