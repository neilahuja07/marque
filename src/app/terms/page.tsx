import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Terms of Service — Marque",
  description: "Marque's terms of service. Read the rules and guidelines for using our platform.",
  openGraph: {
    title: "Terms of Service — Marque",
    description: "Marque's terms of service. Read the rules and guidelines for using our platform.",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <h1 className="font-display text-[32px] text-ink">Terms of Service</h1>
            <p className="mt-3 text-[13px] text-slate">Last updated: June 2025</p>

            <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-slate">
              <section>
                <h2 className="font-display text-[18px] text-ink">1. Acceptance of terms</h2>
                <p className="mt-3">
                  By accessing or using Marque, you agree to these Terms of Service. If you do not agree, please do not use our platform.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">2. Account registration</h2>
                <p className="mt-3">
                  You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 13 years old to use Marque.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">3. Purchases and pricing</h2>
                <p className="mt-3">
                  All prices are listed in USD. We reserve the right to change pricing at any time. When you make a purchase, you agree to pay the listed price plus applicable taxes. Payment is processed immediately.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">4. Digital resources</h2>
                <p className="mt-3">
                  All resources are digital products delivered via download. Upon successful payment, you receive a license to use the resource for personal, educational purposes. Resources may not be redistributed, resold, or shared with others.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">5. Refund policy</h2>
                <p className="mt-3">
                  We offer a 7-day money-back guarantee on all purchases. If a resource doesn&apos;t meet your expectations, contact us within 7 days of purchase for a full refund. Refunds are processed to the original payment method.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">6. Intellectual property</h2>
                <p className="mt-3">
                  All resources on Marque are owned by their respective creators. Your purchase grants you a personal license to use the resource. All intellectual property rights remain with the original creator.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">7. Limitation of liability</h2>
                <p className="mt-3">
                  Marque is provided &ldquo;as is&rdquo; without warranties of any kind. We are not liable for any damages arising from the use of our platform or resources. Our total liability shall not exceed the amount you paid for the specific resource in question.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">8. Changes to terms</h2>
                <p className="mt-3">
                  We may update these terms from time to time. Continued use of Marque after changes constitutes acceptance of the revised terms. We will notify registered users of material changes via email.
                </p>
              </section>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </>
  );
}
