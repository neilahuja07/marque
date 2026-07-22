"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar, Footer } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { useCart, type CartItem } from "@/lib/cart-store";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { TrustSection } from "@/components/marketplace/trust-section";
import { PaymentMethodSelector, type PaymentMethod } from "@/components/marketplace/payment-method-selector";
import { OrderConfirmationModal } from "@/components/marketplace/order-confirmation-modal";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postalCode: string;
  notes: string;
};

const initialForm: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  postalCode: "",
  notes: "",
};

const countries = [
  "India",
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Singapore",
  "Malaysia",
  "Nigeria",
  "Kenya",
  "South Africa",
  "UAE",
  "Other",
];

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const isBuyNow = searchParams.get("buyNow") === "true";
  const { items } = useCart();

  const checkoutItems: CartItem[] = useMemo(() => {
    if (isBuyNow && items.length > 0) {
      return [items[items.length - 1]];
    }
    return items;
  }, [isBuyNow, items]);

  const [form, setForm] = useState<FormData>(initialForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [showModal, setShowModal] = useState(false);

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const discount = checkoutItems.reduce((sum, item) => {
    if (item.product.originalPrice)
      return (
        sum +
        (item.product.originalPrice - item.product.price) * item.quantity
      );
    return sum;
  }, 0);
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const total = subtotal - discount + tax;

  const orderNumber = useMemo(
    () => `MRQ-${Math.floor(10000 + Math.random() * 90000)}`,
    [],
  );

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

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

        {/* Checkout form */}
        <section className="mx-auto max-w-7xl px-6 pb-32 pt-6 md:pb-16">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
              {/* Left: Form */}
              <div className="space-y-8">
                {/* Section 1: Contact Information */}
                <FadeIn>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                    <h2 className="font-display text-[18px] text-ink">Contact information</h2>
                    <div className="mt-5">
                      <label className="block text-[13px] font-medium text-ink/70">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                        placeholder="you@example.com"
                      />
                      <p className="mt-1.5 text-[12px] text-slate">
                        Download links will be sent to this email.
                      </p>
                    </div>
                  </div>
                </FadeIn>

                {/* Section 2: Billing Details */}
                <FadeIn delay={60}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                    <h2 className="font-display text-[18px] text-ink">Billing details</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">
                          First name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.firstName}
                          onChange={(e) => update("firstName", e.target.value)}
                          className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                          placeholder="Jane"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">
                          Last name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.lastName}
                          onChange={(e) => update("lastName", e.target.value)}
                          className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                          placeholder="Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          value={form.country}
                          onChange={(e) => update("country", e.target.value)}
                          className="input-field mt-1.5 w-full appearance-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink"
                        >
                          <option value="">Select country</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[13px] font-medium text-ink/70">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.city}
                          onChange={(e) => update("city", e.target.value)}
                          className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[13px] font-medium text-ink/70">
                          Postal code
                        </label>
                        <input
                          type="text"
                          value={form.postalCode}
                          onChange={(e) => update("postalCode", e.target.value)}
                          className="input-field mt-1.5 w-full rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </FadeIn>

                {/* Section 3: Payment Method */}
                <FadeIn delay={120}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-[18px] text-ink">Payment method</h2>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded border border-ink/10 px-1.5 py-0.5 text-[10px] font-medium text-ink/50">VISA</span>
                        <span className="rounded border border-ink/10 px-1.5 py-0.5 text-[10px] font-medium text-ink/50">MC</span>
                        <span className="rounded border border-ink/10 px-1.5 py-0.5 text-[10px] font-medium text-ink/50">UPI</span>
                      </div>
                    </div>
                    <p className="mt-1 text-[12px] text-slate">
                      All transactions are secure and encrypted.
                    </p>
                    <div className="mt-5">
                      <PaymentMethodSelector value={paymentMethod} onChange={setPaymentMethod} />
                    </div>
                    <p className="mt-4 text-[12px] text-ink/40">
                      Powered by Razorpay. You will be redirected to complete payment after placing your order.
                    </p>
                  </div>
                </FadeIn>

                {/* Section 4: Order Notes */}
                <FadeIn delay={180}>
                  <div className="rounded-[10px] border border-ink/10 bg-white p-6">
                    <h2 className="font-display text-[18px] text-ink">Order notes</h2>
                    <p className="mt-1 text-[12px] text-slate">Optional — anything you'd like us to know.</p>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      className="input-field mt-4 w-full resize-none rounded-[8px] border border-ink/15 bg-parchment px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/40"
                      placeholder="e.g. Need resources for upcoming March/June exam session"
                    />
                  </div>
                </FadeIn>

                {/* Back to Cart */}
                <FadeIn delay={200}>
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

              {/* Right: Order Summary (desktop) */}
              <div className="hidden md:block">
                <FadeIn delay={100}>
                  <div className="sticky top-28 rounded-[10px] border border-ink/10 bg-white p-6">
                    <h2 className="text-[15px] font-medium text-ink">Order summary</h2>

                    {/* Items */}
                    <div className="mt-5 space-y-4">
                      {checkoutItems.map((item) => (
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
                          <p className="shrink-0 text-[13px] font-medium text-ink">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-6 space-y-2.5 border-t border-ink/10 pt-5">
                      <div className="flex justify-between text-[13px] text-ink/80">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-[13px] text-teal-dark">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[13px] text-ink/80">
                        <span>Estimated tax</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-ink/10 pt-3">
                        <div className="flex justify-between text-[15px] font-medium text-ink">
                          <span>Total</span>
                          <span className="font-display text-[18px]">${total.toFixed(2)}</span>
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
                      className="btn-primary mt-5 w-full rounded-[8px] bg-teal-dark px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-teal-dark/90"
                    >
                      Complete Purchase
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

        {/* Trust Section — full width */}
        <section className="border-t border-ink/10 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <FadeIn>
              <h2 className="font-display text-[20px] text-ink text-center">Why students trust Marque</h2>
              <div className="mt-6">
                <TrustSection />
              </div>
              {/* Extra trust items */}
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white px-6 py-4 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] text-slate">Total</p>
            <p className="font-display text-[20px] text-ink">${total.toFixed(2)}</p>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn-primary rounded-[8px] bg-teal-dark px-6 py-3 text-[14px] font-medium text-white"
          >
            Complete Purchase
          </button>
        </div>
      </div>

      <Footer />

      {/* Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        orderNumber={orderNumber}
        email={form.email || "your email"}
        total={total}
      />
    </>
  );
}
