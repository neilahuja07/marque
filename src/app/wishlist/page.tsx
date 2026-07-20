"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar, Footer, ResourceCard } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { products } from "@/lib/dummy-data";

const initialWishlist = [products[3], products[4], products[5], products[6]];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <FadeIn>
            <div>
              <p className="exam-code text-[12px] text-brass">Saved items</p>
              <h1 className="mt-2 font-display text-[30px] text-ink">Your wishlist</h1>
              <p className="mt-2 text-[14px] text-slate">
                {items.length > 0
                  ? `${items.length} resource${items.length === 1 ? "" : "s"} saved for later.`
                  : "Resources you save will appear here."}
              </p>
            </div>
          </FadeIn>

          {items.length === 0 ? (
            <FadeIn delay={40}>
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-parchment text-ink/25">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h2 className="mt-5 font-display text-[20px] text-ink">Your wishlist is empty</h2>
                <p className="mt-2 max-w-sm text-[14px] text-slate">
                  Browse our collection and save resources you&apos;re interested in.
                </p>
                <Link
                  href="/browse"
                  className="btn-primary mt-6 rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
                >
                  Browse Resources
                </Link>
              </div>
            </FadeIn>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((product, i) => (
                <FadeIn key={product.id} delay={40 + i * 40}>
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
        </section>
      </main>

      <Footer />
    </>
  );
}
