import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Downloads — Scholar Stack",
  description: "Access your downloaded resources.",
  openGraph: {
    title: "Downloads — Scholar Stack",
    description: "Access your downloaded resources.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
