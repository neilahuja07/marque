import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile — Marque",
  description: "Manage your Marque profile.",
  openGraph: {
    title: "Profile — Marque",
    description: "Manage your Marque profile.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
