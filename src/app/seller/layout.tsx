import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Dashboard — Marque",
  description: "Manage your listings and track revenue.",
  openGraph: {
    title: "Seller Dashboard — Marque",
    description: "Manage your listings and track revenue.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
