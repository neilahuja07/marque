import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders — Marque",
  description: "View your order history.",
  openGraph: {
    title: "Orders — Marque",
    description: "View your order history.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
