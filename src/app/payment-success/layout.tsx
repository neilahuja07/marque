import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful — Scholar Stack",
  description: "Your payment has been processed successfully.",
};

export default function PaymentSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
