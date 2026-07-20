import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart — Marque",
  description: "Review your selected resources before checkout.",
  openGraph: {
    title: "Shopping Cart — Marque",
    description: "Review your selected resources before checkout.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
