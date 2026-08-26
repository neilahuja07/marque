import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout — Scholar Stack",
  description: "Complete your purchase securely.",
  openGraph: {
    title: "Checkout — Scholar Stack",
    description: "Complete your purchase securely.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
