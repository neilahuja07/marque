import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/providers";
import { PreloaderProvider } from "@/components/ui/preloader-provider";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scholar Stack — Study Material Marked to the Syllabus",
  description:
    "Past papers, mock tests, worksheets and revision notes for Cambridge Mathematics, Science and English.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-[8px] focus:bg-teal-dark focus:px-4 focus:py-2.5 focus:text-[13px] focus:font-medium focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <Providers>
          <PreloaderProvider>{children}</PreloaderProvider>
        </Providers>
      </body>
    </html>
  );
}
