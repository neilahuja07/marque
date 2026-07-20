"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { faqs } from "@/lib/dummy-data";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <FadeIn>
              <p className="text-[12px] uppercase tracking-[0.15em] text-brass font-medium">FAQ</p>
              <h1 className="mt-4 font-display text-[32px] text-ink md:text-[36px]">
                Frequently asked questions
              </h1>
              <p className="mt-4 text-[15px] text-slate max-w-lg mx-auto">
                Everything you need to know about Marque.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <FadeIn>
            <div className="space-y-2">
              {faqs.map((item, i) => (
                <div key={i} className="rounded-[10px] border border-ink/10 bg-white overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-[15px] font-medium text-ink pr-4">{item.question}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-5 w-5 shrink-0 text-ink/40 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {openIndex === i && (
                    <div className="px-6 pb-5">
                      <p className="text-[14px] leading-relaxed text-slate">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-12 rounded-[10px] border border-ink/10 bg-parchment/50 p-6 text-center">
              <p className="text-[14px] text-slate">Still have questions?</p>
              <a href="/contact" className="mt-2 inline-block text-[14px] font-medium text-teal-dark hover:underline">
                Contact us →
              </a>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
