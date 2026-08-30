import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Terms of Service — Scholar Stack",
  description: "Scholar Stack's terms of service. Read the rules and guidelines for using our platform.",
  openGraph: {
    title: "Terms of Service — Scholar Stack",
    description: "Scholar Stack's terms of service. Read the rules and guidelines for using our platform.",
    type: "website",
  },
};

const EMAIL = "contactscholarstack@gmail.com";

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <h1 className="font-display text-[32px] text-ink md:text-[36px]">Terms of Service</h1>
            <p className="mt-3 text-[13px] text-slate">Last updated: 29 August 2026</p>

            <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-slate">
              <section>
                <h2 className="font-display text-[18px] text-ink">1. Acceptance of Terms</h2>
                <p className="mt-3">
                  By accessing or using Scholar Stack, you agree to these Terms of Service. If you do not agree with these terms, please do not use the website.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">2. Our Services</h2>
                <p className="mt-3">
                  Scholar Stack provides digital educational resources, including worksheets, practice papers, revision materials, and other study resources.
                </p>
                <p className="mt-3">
                  We may update, change, add, or remove resources or website features at any time.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">3. Accounts</h2>
                <p className="mt-3">
                  Some features require you to create an account. You are responsible for keeping your account information and login credentials secure and for all activity carried out through your account.
                </p>
                <p className="mt-3">
                  You must provide accurate information when creating an account.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">4. Purchases and Payments</h2>
                <p className="mt-3">
                  All prices are displayed on the website at the time of purchase.
                </p>
                <p className="mt-3">
                  Payments are processed through our third-party payment provider. Scholar Stack does not directly store your complete payment card or banking credentials.
                </p>
                <p className="mt-3">
                  Digital resources are made available for download after successful payment and verification.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">5. Digital Products</h2>
                <p className="mt-3">
                  Purchased resources are licensed to the purchaser for personal, non-commercial educational use.
                </p>
                <p className="mt-3">You may not:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Resell or redistribute purchased resources.</li>
                  <li>Upload purchased resources to public websites or file-sharing services.</li>
                  <li>Share download links with others.</li>
                  <li>Claim Scholar Stack&apos;s resources as your own.</li>
                  <li>Copy or reproduce resources for commercial distribution.</li>
                </ul>
                <p className="mt-3">
                  We may restrict or terminate access to an account if we reasonably believe resources are being misused or redistributed.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">6. Refunds</h2>
                <p className="mt-3">
                  Because our products are digital products that may be downloaded immediately after purchase, all purchases are generally final and non-refundable, except where a refund is required by applicable law or where Scholar Stack chooses to provide one.
                </p>
                <p className="mt-3">
                  If you experience a problem with a purchase or download, contact us at{" "}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-teal-dark hover:underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">7. Intellectual Property</h2>
                <p className="mt-3">
                  All Scholar Stack content, branding, website design, text, and original educational materials are owned by Scholar Stack or their respective licensors and are protected by applicable intellectual-property laws.
                </p>
                <p className="mt-3">
                  Purchasing a resource does not transfer ownership of the intellectual property to you.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">8. Accuracy of Resources</h2>
                <p className="mt-3">
                  We aim to provide accurate and useful educational materials, but Scholar Stack does not guarantee that every resource will be completely error-free, complete, or suitable for every student&apos;s particular curriculum or examination.
                </p>
                <p className="mt-3">
                  Educational resources should be used as supplementary study material.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">9. Website Availability</h2>
                <p className="mt-3">
                  We aim to keep Scholar Stack available and functioning properly, but we do not guarantee uninterrupted or error-free access to the website or its services.
                </p>
                <p className="mt-3">
                  We may temporarily suspend services for maintenance, updates, security, or other reasons.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">10. Limitation of Liability</h2>
                <p className="mt-3">
                  To the maximum extent permitted by applicable law, Scholar Stack will not be responsible for indirect, incidental, or consequential losses arising from your use of the website or resources.
                </p>
                <p className="mt-3">
                  Nothing in these Terms limits any liability that cannot legally be limited.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">11. Changes to These Terms</h2>
                <p className="mt-3">
                  We may update these Terms from time to time. Updated Terms will be posted on this page with a new &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">12. Contact</h2>
                <p className="mt-3">
                  For questions or support regarding these Terms, contact:
                </p>
                <p className="mt-3">
                  <a href={`mailto:${EMAIL}`} className="font-medium text-teal-dark hover:underline">
                    {EMAIL}
                  </a>
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