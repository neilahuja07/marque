import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders — Scholar Stack",
  description: "View your order history.",
  openGraph: {
    title: "Orders — Scholar Stack",
    description: "View your order history.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
