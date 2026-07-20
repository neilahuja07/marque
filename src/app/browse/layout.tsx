import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Resources — Marque",
  description: "Browse Cambridge IGCSE, O Level and A Level past papers, mock tests, worksheets and revision notes.",
  openGraph: {
    title: "Browse Resources — Marque",
    description: "Browse Cambridge IGCSE, O Level and A Level past papers, mock tests, worksheets and revision notes.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
