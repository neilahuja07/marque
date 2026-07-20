import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Marque",
  description: "Reset your Marque account password.",
  openGraph: {
    title: "Forgot Password — Marque",
    description: "Reset your Marque account password.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
