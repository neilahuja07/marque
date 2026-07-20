import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Privacy Policy — Marque",
  description: "Marque's privacy policy. Learn how we collect, use and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Marque",
    description: "Marque's privacy policy. Learn how we collect, use and protect your personal information.",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <h1 className="font-display text-[32px] text-ink">Privacy Policy</h1>
            <p className="mt-3 text-[13px] text-slate">Last updated: June 2025</p>

            <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-slate">
              <section>
                <h2 className="font-display text-[18px] text-ink">1. Information we collect</h2>
                <p className="mt-3">
                  When you use Marque, we collect information you provide directly: your name, email address, and payment information when you make a purchase. We also collect usage data such as pages visited, resources downloaded, and browsing behaviour to improve our service.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">2. How we use your information</h2>
                <p className="mt-3">
                  We use your information to process transactions, deliver purchased resources, send order confirmations and download links, respond to support requests, and improve our platform. We do not sell your personal information to third parties.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">3. Payment security</h2>
                <p className="mt-3">
                  All payment transactions are processed through secure, encrypted payment processors. We do not store your full credit card details on our servers. All sensitive payment data is handled by our PCI-compliant payment providers.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">4. Cookies</h2>
                <p className="mt-3">
                  We use essential cookies to maintain your session and preferences. We may also use analytics cookies to understand how visitors interact with our site. You can manage cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">5. Data retention</h2>
                <p className="mt-3">
                  We retain your account information and purchase history for as long as your account is active. You may request deletion of your account and associated data at any time by contacting support.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">6. Your rights</h2>
                <p className="mt-3">
                  You have the right to access, correct, or delete your personal data. You may also request a copy of all data we hold about you. To exercise these rights, please contact us at privacy@marque.com.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">7. Contact</h2>
                <p className="mt-3">
                  If you have questions about this privacy policy, please contact us at privacy@marque.com.
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
