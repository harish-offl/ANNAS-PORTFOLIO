import type { Metadata } from "next";
import { Inter, Playfair_Display, Space_Grotesk, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["300", "400", "500", "600"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "600"],
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${inter.variable} ${spaceGrotesk.variable} ${caveat.variable} font-grotesk bg-background text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
