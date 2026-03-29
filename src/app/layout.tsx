import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://digitalorchard.com.bd"),
  title: {
    default: "Digital Orchard | Fresh Mango Marketplace in Bangladesh",
    template: "%s | Digital Orchard",
  },
  description: "Buy premium, chemical-free fresh mangoes directly from the gardens of Rajshahi, Dinajpur, and Chapainawabganj in Bangladesh.",
  keywords: ["buy mango online Bangladesh", "best mango in Bangladesh", "Rajshahi mango price", "Langra mango online", "fresh mango delivery BD"],
  authors: [{ name: "Digital Orchard Team", url: "https://digitalorchard.com.bd" }],
  creator: "Digital Orchard",
  publisher: "Digital Orchard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://digitalorchard.com.bd",
    title: "Digital Orchard | Fresh Mango Marketplace in Bangladesh",
    description: "Buy premium, chemical-free fresh mangoes directly from the gardens of Rajshahi, Dinajpur, and Chapainawabganj in Bangladesh.",
    siteName: "Digital Orchard",
    images: [{ url: "/og-image.jpg" }],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
