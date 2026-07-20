import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Marque",
  description: "Manage your account settings and preferences.",
  openGraph: {
    title: "Settings — Marque",
    description: "Manage your account settings and preferences.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
