"use client";

import { useState } from "react";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <section className="border-b border-ink/10 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <FadeIn>
              <p className="text-[12px] uppercase tracking-[0.15em] text-brass font-medium">Contact us</p>
              <h1 className="mt-4 font-display text-[32px] text-ink md:text-[36px]">
                Get in touch
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-slate max-w-lg mx-auto">
                Have a question, feedback, or need help? We&apos;d love to hear from you.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-[1fr_380px]">
            {/* Form */}
            <FadeIn>
              {submitted ? (
                <div className="rounded-[10px] border border-ink/10 bg-white p-8 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sage/20">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="font-display text-[20px] text-ink">Message sent</h2>
                  <p className="mt-2 text-[14px] text-slate">We&apos;ll get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-6 text-[13px] font-medium text-teal-dark hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-[10px] border border-ink/10 bg-white p-6 md:p-8">
                  <h2 className="font-display text-[18px] text-ink">Send us a message</h2>
                  <div className="mt-5 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">Name</label>
                        <input type="text" required className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40" placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">Email</label>
                        <input type="email" required className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40" placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Subject</label>
                      <select className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink">
                        <option>General enquiry</option>
                        <option>Technical support</option>
                        <option>Refund request</option>
                        <option>Bulk / institutional pricing</option>
                        <option>Partnership opportunity</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-ink/70">Message</label>
                      <textarea rows={5} required className="input-field mt-1.5 w-full resize-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40" placeholder="How can we help?" />
                    </div>
                    <button type="submit" className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white">
                      Send message
                    </button>
                  </div>
                </form>
              )}
            </FadeIn>

            {/* Contact info */}
            <FadeIn delay={100}>
              <div className="space-y-6">
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h3 className="text-[14px] font-medium text-ink">Email</h3>
                  <p className="mt-2 text-[14px] text-slate">support@marque.com</p>
                  <p className="mt-1 text-[12px] text-ink/40">We respond within 24 hours</p>
                </div>
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h3 className="text-[14px] font-medium text-ink">Response times</h3>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-[13px]">
                      <span className="text-slate">General enquiries</span>
                      <span className="text-ink">{"< 24 hours"}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-slate">Technical support</span>
                      <span className="text-ink">{"< 12 hours"}</span>
                    </div>
                    <div className="flex justify-between text-[13px]">
                      <span className="text-slate">Refund requests</span>
                      <span className="text-ink">{"< 48 hours"}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                  <h3 className="text-[14px] font-medium text-ink">Follow us</h3>
                  <div className="mt-3 flex gap-3">
                    {["Twitter", "Instagram", "LinkedIn"].map((platform) => (
                      <span key={platform} className="rounded-[6px] border border-ink/10 px-3 py-1.5 text-[12px] text-slate hover:text-ink">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
