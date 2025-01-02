import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Home - ${site.title}`,
  description: site.description,
  keywords: site.keywords,
  openGraph: {
    title: `Home - ${site.openGraph.title}`,
    description: site.openGraph.description,
    url: site.url,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Home - ${site.twitter.title}`,
    description: site.twitter.description,
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: site.url,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="mt-16">{children}</main>
      </body>
    </html>
  );
}
