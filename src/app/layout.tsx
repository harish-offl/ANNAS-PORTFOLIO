import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://annamalaiportfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "M.RM. Annamalai | Developer, Designer & Digital Creator",
  description:
    "Portfolio of M.RM. Annamalai — developer, video editor, graphic designer, and digital creator. Building modern websites, thoughtful interfaces, and visual stories through Arrise Digital.",
  keywords: [
    "Annamalai",
    "portfolio",
    "creative developer",
    "web developer",
    "video editor",
    "graphic designer",
    "UI UX designer",
    "Madurai",
    "Tamil Nadu",
    "Arrise Digital",
  ],
  authors: [{ name: "M.RM. Annamalai", url: siteUrl }],
  creator: "M.RM. Annamalai",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "M.RM. Annamalai | Developer, Designer & Digital Creator",
    description:
      "Modern websites, thoughtful interfaces, and visual stories. Explore selected work by M.RM. Annamalai.",
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "M.RM. Annamalai Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "M.RM. Annamalai | Developer, Designer & Digital Creator",
    description:
      "Modern websites, thoughtful interfaces, and visual stories. Explore selected work by M.RM. Annamalai.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
