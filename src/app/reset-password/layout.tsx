import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — Scholar Stack",
  description: "Set a new password for your Scholar Stack account.",
  openGraph: {
    title: "Reset Password — Scholar Stack",
    description: "Set a new password for your Scholar Stack account.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
