"use client";

import Link from "next/link";
import { Navbar, Footer, ResourceCard } from "@/components/marketplace";
import { FadeIn } from "@/components/ui/fade-in";
import { useProducts } from "@/lib/product-store";
import { useCart } from "@/lib/cart-store";
import { Breadcrumbs } from "@/components/marketplace/breadcrumbs";
import { CartItem } from "@/components/marketplace/cart-item";
import { OrderSummary } from "@/components/marketplace/order-summary";
import { TrustSection } from "@/components/marketplace/trust-section";
import { EmptyCart } from "@/components/marketplace/empty-cart";

export default function CartPage() {
  const { products } = useProducts();
  const { items, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const tax = Math.round(subtotal * 0.05 * 100) / 100;

  const recommended = products
    .filter((p) => p.published && !items.find((c) => c.product.id === p.id))
    .slice(0, 4);

  const isEmpty = items.length === 0;

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
                { label: "Cart" },
              ]}
            />
          </div>
        </section>

        {/* Heading */}
        <section className="mx-auto max-w-7xl px-6 pt-8 pb-4">
          <h1 className="font-display text-[28px] text-ink md:text-[32px]">
            Shopping cart
          </h1>
          {!isEmpty && (
            <p className="mt-2 text-[14px] text-slate">
              You have{" "}
              {items.reduce((s, i) => s + i.quantity, 0)}{" "}
              {items.reduce((s, i) => s + i.quantity, 0) === 1
                ? "resource"
                : "resources"}{" "}
              in your cart.
            </p>
          )}
        </section>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <>
            {/* Cart content */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
              <div className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10">
                {/* Left: Items */}
                <FadeIn>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <CartItem
                        key={item.product.id}
                        product={item.product}
                        quantity={item.quantity}
                        onQuantityChange={(qty) =>
                          updateQuantity(item.product.id, qty)
                        }
                        onRemove={() => removeItem(item.product.id)}
                      />
                    ))}
                  </div>
                </FadeIn>

                {/* Right: Summary + Trust */}
                <div className="space-y-4">
                  <FadeIn delay={100}>
                    <OrderSummary
                      subtotal={subtotal}
                      tax={tax}
                    />
                  </FadeIn>
                  <FadeIn delay={150}>
                    <TrustSection />
                  </FadeIn>
                </div>
              </div>
            </section>

            {/* Recommended */}
            {recommended.length > 0 && (
              <FadeIn>
                <section className="border-t border-ink/10 bg-white">
                  <div className="mx-auto max-w-7xl px-6 py-14">
                    <h2 className="font-display text-[22px] text-ink">
                      You may also like
                    </h2>
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                      {recommended.map((p) => (
                        <ResourceCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                </section>
              </FadeIn>
            )}
          </>
        )}
      </main>

      <Footer />
    </>
  );
}
