import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Marque",
  description: "Your Marque learning dashboard.",
  openGraph: {
    title: "Dashboard — Marque",
    description: "Your Marque learning dashboard.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
