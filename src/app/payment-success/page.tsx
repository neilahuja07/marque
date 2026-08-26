"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <FadeIn>
            <div className="mx-auto max-w-md text-center">
              <div className="flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage/20">
                  <svg viewBox="0 0 24 24" className="h-10 w-10 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              <h1 className="mt-6 font-display text-[28px] text-ink">
                Payment successful
              </h1>
              <p className="mt-3 text-[14px] leading-relaxed text-slate">
                Thank you for your purchase! Your order has been confirmed and
                your resources are ready to download.
              </p>

              {orderId && (
                <div className="mt-6 rounded-[8px] bg-parchment/60 px-5 py-4 text-left">
                  <p className="text-[12px] text-slate">Order ID</p>
                  <p className="mt-0.5 font-mono text-[13px] text-ink">{orderId}</p>
                  {paymentId && (
                    <>
                      <p className="mt-3 text-[12px] text-slate">Payment ID</p>
                      <p className="mt-0.5 font-mono text-[13px] text-ink">{paymentId}</p>
                    </>
                  )}
                </div>
              )}

              <div className="mt-8 space-y-3">
                <Link
                  href="/dashboard/downloads"
                  className="btn-primary block w-full rounded-[8px] bg-teal-dark px-6 py-3 text-center text-[14px] font-medium text-white"
                >
                  View Downloads
                </Link>
                <Link
                  href="/browse"
                  className="btn-outline block w-full rounded-[8px] border border-ink/15 px-6 py-3 text-center text-[14px] font-medium text-ink"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </FadeIn>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
