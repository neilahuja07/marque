import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Marque",
  description: "Complete your purchase securely.",
  openGraph: {
    title: "Checkout — Marque",
    description: "Complete your purchase securely.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
