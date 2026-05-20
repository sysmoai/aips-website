import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/json-ld";
import { siteUrl, buildMetadata } from "@/lib/seo/metadata";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Premium AI Subscriptions in Bangladesh",
  canonical: siteUrl,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <link rel="preconnect" href={siteUrl} />
        <link rel="dns-prefetch" href={siteUrl} />
        {/* TODO: Add preconnect to Supabase, media CDN, and analytics when domains are known */}
        {/* <link rel="preconnect" href="https://your-supabase-project.supabase.co" /> */}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
