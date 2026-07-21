"use client";

import { type ReactNode } from "react";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/components/auth-provider";
import { ProductProvider } from "@/lib/product-store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ProductProvider>
        <ToastProvider>{children}</ToastProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
