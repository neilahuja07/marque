import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Marque",
  description: "Frequently asked questions about Marque.",
  openGraph: {
    title: "FAQ — Marque",
    description: "Frequently asked questions about Marque.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
