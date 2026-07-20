import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Marque",
  description: "Create your Marque account to access premium study resources.",
  openGraph: {
    title: "Create Account — Marque",
    description: "Create your Marque account to access premium study resources.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
