import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — Scholar Stack",
  description: "Reset your Scholar Stack account password.",
  openGraph: {
    title: "Forgot Password — Scholar Stack",
    description: "Reset your Scholar Stack account password.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
