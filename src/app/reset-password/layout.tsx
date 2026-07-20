import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — Marque",
  description: "Set a new password for your Marque account.",
  openGraph: {
    title: "Reset Password — Marque",
    description: "Set a new password for your Marque account.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
