import type { Metadata } from "next";
import { Navbar, Footer, Statistics, Testimonials } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "About — Marque",
  description: "Learn about Marque's mission to provide premium Cambridge IGCSE, O Level and A Level study resources.",
  openGraph: {
    title: "About — Marque",
    description: "Learn about Marque's mission to provide premium Cambridge IGCSE, O Level and A Level study resources.",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <FadeIn>
              <p className="text-[12px] uppercase tracking-[0.15em] text-brass font-medium">About Marque</p>
              <h1 className="mt-4 font-display text-[32px] leading-tight text-ink md:text-[40px]">
                Premium study resources for ambitious students
              </h1>
              <p className="mt-5 text-[15px] leading-relaxed text-slate max-w-2xl mx-auto">
                Marque was founded to help Cambridge IGCSE, O Level and A Level students access the highest-quality study materials — curated, verified, and designed to make revision genuinely effective.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Mission */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <FadeIn>
              <div className="rounded-[12px] bg-parchment p-8 md:p-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-teal-dark/10">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <h2 className="mt-6 font-display text-[22px] text-ink">Our mission</h2>
                <p className="mt-4 text-[14px] leading-relaxed text-slate">
                  We believe every student deserves access to excellent study materials, regardless of where they are in the world. Our resources are created by experienced educators and examiners who understand what it takes to succeed.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">
                  Every resource on Marque is carefully vetted for accuracy, relevance, and quality before it reaches your hands.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-sage/15">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-ink">Curated by examiners</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate">Resources created and reviewed by Cambridge examiners and experienced teachers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-sage/15">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-ink">Instant access</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate">Download immediately after purchase. No waiting, no shipping, no hassle.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-sage/15">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-ink">Lifetime access</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate">Buy once, access forever. Re-download anytime from your account.</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Stats */}
        <Statistics />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <section className="bg-teal-dark">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center">
            <FadeIn>
              <h2 className="font-display text-[24px] text-white">Start exploring resources today</h2>
              <p className="mt-3 text-[14px] text-white/70">Join thousands of students preparing for their exams with Marque.</p>
              <a href="/browse" className="mt-6 inline-flex rounded-[8px] bg-white px-6 py-3 text-[14px] font-medium text-teal-dark transition-all hover:shadow-lg hover:translate-y-[-1px]">
                Browse resources
              </a>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
