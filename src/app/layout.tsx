import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.locationShort}`,
    template: `%s | ${site.name}`,
  },
  description: site.proposition,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
    title: site.name,
    description: site.proposition,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.proposition,
  },
  icons: {
    icon: site.logo.src,
    apple: site.logo.src,
  },
};

export const viewport: Viewport = {
  themeColor: "#3c1d1d",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} antialiased`}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
