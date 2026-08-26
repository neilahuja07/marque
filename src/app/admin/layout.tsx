import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin — Scholar Stack",
  description: "Scholar Stack admin dashboard.",
  openGraph: {
    title: "Admin — Scholar Stack",
    description: "Scholar Stack admin dashboard.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
