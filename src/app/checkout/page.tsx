"use client";

import { useMemo, useCallback, useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { useCart, type CartItem } from "@/lib/cart-store";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { TrustSection } from "@/components/marketplace/trust-section";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/components/ui/toast";
import { formatUsd } from "@/lib/currency";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: { name?: string; email?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error: { description?: string } }) => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isBuyNow = searchParams.get("buyNow") === "true";
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  const checkoutItems: CartItem[] = useMemo(() => {
    if (isBuyNow && items.length > 0) {
      return [items[items.length - 1]];
    }
    return items;
  }, [isBuyNow, items]);

  const [guestEmail, setGuestEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    setMounted(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const total = subtotal;

  const displayItems: CartItem[] = mounted ? checkoutItems : [];

  const displaySubtotal = displayItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const displayTotal = displaySubtotal;

  const isSignedIn = !!user;
  const customerEmail = isSignedIn ? (user.email ?? "") : guestEmail;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/checkout")}`);
      return;
    }

    if (isProcessing) return;

    if (!customerEmail) {
      toast("Please enter your email address.", "error");
      return;
    }

    if (checkoutItems.length === 0) {
      toast("Your cart is empty.", "error");
      return;
    }

    setIsProcessing(true);

    try {
      const razorpayItems = checkoutItems.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const orderRes = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: razorpayItems,
          receipt: `rcpt_${Date.now()}`,
          notes: { email: customerEmail },
        }),
      });

      const resText = await orderRes.text();

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const { orderId, amount, currency } = JSON.parse(resText);

      const options: RazorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount,
        currency,
        name: "Scholar Stack",
        description: "Purchase from Scholar Stack",
        order_id: orderId,
        handler: async (response: RazorpayResponse) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                items: razorpayItems,
                email: customerEmail,
              }),
            });

            if (!verifyRes.ok) {
              throw new Error("Payment verification failed");
            }

            const { orderId: dbOrderId, paymentId } = await verifyRes.json();
            clearCart();
            router.push(
              `/payment-success?orderId=${dbOrderId}&paymentId=${paymentId}`,
            );
          } catch {
            toast(
              "Payment was received but verification failed. Contact support.",
              "error",
            );
          }
        },
        prefill: {
          email: customerEmail,
        },
        theme: { color: "#1F4B43" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        toast("Payment failed. Please try again.", "error");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (err) {
      console.error("[Checkout] Payment flow error:", err);
      toast(err instanceof Error ? err.message : JSON.stringify(err), "error");
      setIsProcessing(false);
    }
  }, [user, customerEmail, checkoutItems, total, isProcessing, toast, clearCart, router]);

  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        {/* Breadcrumb */}
        <section className="border-b border-ink/10">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Cart", href: "/cart" },
                { label: "Checkout" },
              ]}
            />
          </div>
        </section>

        {/* Heading */}
        <section className="mx-auto max-w-7xl px-6 pt-8 pb-4">
          <h1 className="font-display text-[28px] text-ink md:text-[32px]">
            Checkout
          </h1>
          <p className="mt-2 text-[14px] text-slate">
            Complete your purchase securely.
          </p>
        </section>

        {/* Checkout */}
        <section className="mx-auto max-w-7xl px-6 pb-32 pt-6 md:pb-16">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
              {/* Left */}
              <div className="space-y-8">
                {/* Purchasing as / Email */}
                <FadeIn>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                    {isSignedIn ? (
                      <>
                        <h2 className="text-[13px] uppercase tracking-[0.1em] text-ink/60 font-medium">
                          Purchasing as
                        </h2>
                        <a
                          href={`mailto:${user.email}`}
                          className="mt-2 inline-block text-[15px] font-medium text-teal-dark underline underline-offset-4 decoration-ink/20 hover:decoration-teal-dark transition-colors duration-200"
                        >
                          {user.email}
                        </a>
                        <p className="mt-3 text-[13px] text-slate">
                          Your digital resources will be delivered to your account and registered email.
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="font-display text-[18px] text-ink">Email address</h2>
                        <p className="mt-2 text-[13px] text-slate">
                          Your digital resources will be delivered to this email.
                        </p>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          className="input-field mt-4 w-full max-w-md rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                          placeholder="you@example.com"
                        />
                      </>
                    )}
                  </div>
                </FadeIn>

                {/* Back to Cart */}
                <FadeIn delay={60}>
                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-[13px] font-medium text-slate transition-colors hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back to cart
                  </Link>
                </FadeIn>
              </div>

              {/* Right: Order Summary */}
              <div className="hidden md:block">
                <FadeIn delay={80}>
                  <div className="sticky top-28 rounded-[10px] border border-ink/10 bg-white p-6">
                    <h2 className="text-[15px] font-medium text-ink">Order summary</h2>

                    {/* Items */}
                    <div className="mt-5 space-y-4">
                      {displayItems.map((item) => (
                        <div key={item.product.id} className="flex items-start gap-3">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[6px] bg-parchment">
                            <div className="flex h-full items-center justify-center">
                              <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink/20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                            </div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[13px] font-medium text-ink line-clamp-2">{item.product.title}</p>
                            <p className="mt-0.5 text-[12px] text-slate">{item.product.subject} · {item.product.level}</p>
                          </div>
                          <p className="shrink-0 text-[13px] font-medium text-ink">
                            {formatUsd(item.product.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-6 space-y-2.5 border-t border-ink/10 pt-5">
                      <div className="flex justify-between text-[13px] text-ink/80">
                        <span>Subtotal</span>
                        <span>{formatUsd(displaySubtotal)}</span>
                      </div>
                      <div className="border-t border-ink/10 pt-3">
                        <div className="flex justify-between text-[15px] font-medium text-ink">
                          <span>Total</span>
                          <span className="font-display text-[18px]">
                            {formatUsd(displayTotal)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delivery */}
                    <div className="mt-5 flex items-center gap-3 rounded-[8px] bg-parchment/60 px-4 py-3">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <div>
                        <p className="text-[13px] font-medium text-ink">Instant Digital Download</p>
                        <p className="text-[11px] text-slate">Available immediately after payment</p>
                      </div>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isProcessing || authLoading}
                      className="btn-primary mt-5 w-full rounded-[8px] bg-teal-dark px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-teal-dark/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isProcessing ? "Processing..." : "Complete Purchase"}
                    </button>

                    {/* Trust badge */}
                    <div className="mt-5 flex items-center justify-center gap-3 text-ink/30">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span className="text-[11px] uppercase tracking-wider">Secure checkout</span>
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </form>
        </section>

        {/* Trust Section */}
        <section className="border-t border-ink/10 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <FadeIn>
              <h2 className="font-display text-[20px] text-ink text-center">Why students trust Scholar Stack</h2>
              <div className="mt-6">
                <TrustSection />
              </div>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3 text-[13px] text-ink/80">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-dark/8">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  Powered by Razorpay
                </div>
                <div className="flex items-center gap-3 text-[13px] text-ink/80">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-dark/8">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 text-teal-dark" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  Instant Digital Delivery
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* Mobile sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white px-6 py-4 safe-bottom md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-slate">Total</p>
            <p className="font-display text-[20px] text-ink">
              {formatUsd(displayTotal)}
            </p>
          </div>
          <button
            type="submit"
            form="checkout-form"
            disabled={isProcessing || authLoading}
            className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isProcessing ? "Processing..." : "Complete Purchase"}
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
