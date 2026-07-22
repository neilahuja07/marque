"use client";

import { type ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/components/auth-provider";
import { ProductProvider } from "@/lib/product-store";
import { CartProvider } from "@/lib/cart-store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ToastProvider>{children}</ToastProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
