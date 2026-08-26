"use client";

import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

const EMAIL = "contactscholarstack@gmail.com";
const MAILTO = `mailto:${EMAIL}`;

const CARDS = [
  {
    title: "Order-Related Queries",
    body: "Have a question about your order, payment, download, or access? Email us and we'll be happy to help resolve it.",
  },
  {
    title: "Mass Subscriptions",
    body: "Looking to purchase resources for a school, tuition centre, or larger group? Get in touch with us to discuss mass subscriptions.",
  },
  {
    title: "Suggestions & Improvements",
    body: "Have an idea or suggestion that could make Scholar Stack better? We'd love to hear it.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
            <FadeIn>
              <p className="text-[12px] uppercase tracking-[0.15em] text-brass font-medium">
                Need help?
              </p>
              <h1 className="mt-5 font-display text-[36px] leading-[1.1] text-ink md:text-[44px]">
                We&apos;re here to help.
              </h1>
              <p className="mt-5 text-[15px] leading-relaxed text-slate">
                For any queries, email us at
              </p>
              <a
                href={MAILTO}
                className="mt-4 inline-block text-[18px] font-medium text-teal-dark underline underline-offset-4 decoration-ink/20 hover:decoration-teal-dark transition-colors duration-200"
              >
                {EMAIL}
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Support cards */}
        <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="grid gap-6 md:grid-cols-3">
            {CARDS.map((card, i) => (
              <FadeIn key={card.title} delay={i * 80}>
                <div className="rounded-[10px] border border-ink/10 bg-white p-8 h-full">
                  <h3 className="text-[13px] font-medium uppercase tracking-[0.1em] text-ink/60">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-slate">
                    {card.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Review / feedback section */}
        <section className="border-t border-ink/10 bg-warm-gray">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
            <FadeIn>
              <p className="text-[12px] uppercase tracking-[0.15em] text-brass font-medium">
                Reviews
              </p>
              <h2 className="mt-5 font-display text-[28px] text-ink md:text-[32px]">
                Share your feedback. Get rewarded.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-slate max-w-xl mx-auto">
                Enjoyed your resource? Email us your product review at{" "}
                <a
                  href={MAILTO}
                  className="font-medium text-teal-dark underline underline-offset-4 decoration-ink/20 hover:decoration-teal-dark transition-colors duration-200"
                >
                  {EMAIL}
                </a>{" "}
                and you may be eligible for a special discount on your next
                purchase.
              </p>
              <p className="mt-6 text-[12px] text-ink/40">
                Discount eligibility and amount are subject to review.
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
