import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email — Scholar Stack",
  description: "Verify your email address to activate your account.",
  openGraph: {
    title: "Verify Email — Scholar Stack",
    description: "Verify your email address to activate your account.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
