import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Marque",
  description: "Get in touch with the Marque team.",
  openGraph: {
    title: "Contact Us — Marque",
    description: "Get in touch with the Marque team.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
