import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Marque",
  description: "Marque admin dashboard.",
  openGraph: {
    title: "Admin — Marque",
    description: "Marque admin dashboard.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
