import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist — Marque",
  description: "Your saved resources. Come back to them whenever you're ready.",
  openGraph: {
    title: "Wishlist — Marque",
    description: "Your saved resources. Come back to them whenever you're ready.",
    type: "website",
  },
};

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
