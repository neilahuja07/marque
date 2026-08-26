import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — Scholar Stack",
  description: "Sign in to your Scholar Stack account.",
  openGraph: {
    title: "Sign In — Scholar Stack",
    description: "Sign in to your Scholar Stack account.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
