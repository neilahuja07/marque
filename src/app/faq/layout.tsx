import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Scholar Stack",
  description: "Frequently asked questions about Scholar Stack.",
  openGraph: {
    title: "FAQ — Scholar Stack",
    description: "Frequently asked questions about Scholar Stack.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
