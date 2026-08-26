import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Scholar Stack",
  description: "Need help with Scholar Stack? Reach us for order support, mass subscriptions, and feedback.",
  openGraph: {
    title: "Contact Us — Scholar Stack",
    description: "Need help with Scholar Stack? Reach us for order support, mass subscriptions, and feedback.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
