import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Resources — Scholar Stack",
  description: "Browse Grade 4–8 past papers, mock tests, worksheets and revision notes.",
  openGraph: {
    title: "Browse Resources — Scholar Stack",
    description: "Browse Grade 4–8 past papers, mock tests, worksheets and revision notes.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
