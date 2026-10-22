import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M. RM. Annamalai | Creative Developer & Digital Creator",
  description:
    "Portfolio of M. RM. Annamalai — Creative Developer, Video Editor, Content Creator, and AI Automation Enthusiast from Madurai, India. Building digital experiences through Arrise Digital.",
  keywords: [
    "creative developer",
    "video editing",
    "content creator",
    "AI automation",
    "web development",
    "graphic design",
    "portfolio",
    "Annamalai",
    "Arrise Digital",
  ],
  authors: [{ name: "M. RM. Annamalai" }],
  openGraph: {
    title: "M. RM. Annamalai | Creative Developer & Digital Creator",
    description:
      "Building digital experiences and creating content that moves brands forward.",
    type: "website",
    locale: "en_US",
    siteName: "M. RM. Annamalai Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "M. RM. Annamalai | Creative Developer & Digital Creator",
    description:
      "Building digital experiences and creating content that moves brands forward.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-background text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
