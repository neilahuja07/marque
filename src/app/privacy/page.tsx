import type { Metadata } from "next";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export const metadata: Metadata = {
  title: "Privacy Policy — Scholar Stack",
  description: "Scholar Stack's privacy policy. Learn how we collect, use and protect your personal information.",
  openGraph: {
    title: "Privacy Policy — Scholar Stack",
    description: "Scholar Stack's privacy policy. Learn how we collect, use and protect your personal information.",
    type: "website",
  },
};

const EMAIL = "contactscholarstack@gmail.com";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <FadeIn>
            <h1 className="font-display text-[32px] text-ink md:text-[36px]">Privacy Policy</h1>
            <p className="mt-3 text-[13px] text-slate">Last updated: 29 August 2026</p>

            <div className="mt-10 space-y-8 text-[14px] leading-relaxed text-slate">
              <section>
                <h2 className="font-display text-[18px] text-ink">1. Introduction</h2>
                <p className="mt-3">
                  Scholar Stack respects your privacy. This Privacy Policy explains what information we collect, why we collect it, and how it is used when you use Scholar Stack.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">2. Information We Collect</h2>
                <p className="mt-3">
                  Depending on how you use Scholar Stack, we may collect:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Your name or username.</li>
                  <li>Email address.</li>
                  <li>Account and authentication information.</li>
                  <li>Purchase and order information.</li>
                  <li>Information about resources you purchase or download.</li>
                  <li>Information you provide when contacting us.</li>
                  <li>Basic technical information required to operate and secure the website.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">3. Payments</h2>
                <p className="mt-3">
                  Payments are processed through our third-party payment provider.
                </p>
                <p className="mt-3">
                  Scholar Stack does not intentionally store your complete payment card or banking credentials. Payment providers may collect and process payment information according to their own privacy policies and terms.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">4. How We Use Your Information</h2>
                <p className="mt-3">We use information to:</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Create and manage your account.</li>
                  <li>Process and verify purchases.</li>
                  <li>Provide access to purchased resources.</li>
                  <li>Provide downloads.</li>
                  <li>Respond to support requests.</li>
                  <li>Maintain and secure the website.</li>
                  <li>Prevent fraud, abuse, and unauthorized access.</li>
                  <li>Improve our services.</li>
                </ul>
                <p className="mt-3">
                  We do not sell your personal information.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">5. Third-Party Services</h2>
                <p className="mt-3">
                  Scholar Stack may use third-party services to operate the website, including services for:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Authentication and database hosting.</li>
                  <li>Payment processing.</li>
                  <li>File storage and delivery.</li>
                  <li>Website hosting and infrastructure.</li>
                </ul>
                <p className="mt-3">
                  These providers may process information as necessary to provide their services.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">6. Data Security</h2>
                <p className="mt-3">
                  We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
                </p>
                <p className="mt-3">
                  However, no online service can guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">7. Data Retention</h2>
                <p className="mt-3">
                  We retain information for as long as reasonably necessary to provide our services, maintain transaction records, meet legal obligations, resolve disputes, and protect our legitimate interests.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">8. Your Choices</h2>
                <p className="mt-3">
                  You may contact us to ask about your personal information or request correction or deletion where applicable.
                </p>
                <p className="mt-3">
                  Some information may need to be retained where required by law or reasonably necessary for legitimate business purposes.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">9. Children&apos;s Privacy</h2>
                <p className="mt-3">
                  Scholar Stack is intended to be used with appropriate parental or guardian involvement where required. We do not knowingly collect personal information from children in violation of applicable law.
                </p>
                <p className="mt-3">
                  If you believe a child has provided personal information to us improperly, contact us at{" "}
                  <a href={`mailto:${EMAIL}`} className="font-medium text-teal-dark hover:underline">
                    {EMAIL}
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">10. Changes to This Policy</h2>
                <p className="mt-3">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="font-display text-[18px] text-ink">11. Contact</h2>
                <p className="mt-3">
                  For privacy questions or requests, contact:
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