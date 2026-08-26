import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile — Scholar Stack",
  description: "Manage your Scholar Stack profile.",
  openGraph: {
    title: "Profile — Scholar Stack",
    description: "Manage your Scholar Stack profile.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
