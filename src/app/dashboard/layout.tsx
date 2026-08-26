import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Scholar Stack",
  description: "Your Scholar Stack learning dashboard.",
  openGraph: {
    title: "Dashboard — Scholar Stack",
    description: "Your Scholar Stack learning dashboard.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
