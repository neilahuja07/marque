import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Marque",
  description: "Sign in to your Marque account.",
  openGraph: {
    title: "Sign In — Marque",
    description: "Sign in to your Marque account.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
