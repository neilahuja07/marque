import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads — Marque",
  description: "Access your downloaded resources.",
  openGraph: {
    title: "Downloads — Marque",
    description: "Access your downloaded resources.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
