import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://audiaw.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AUDIAW - Next-generation open-source DAW",
    template: "%s | AUDIAW",
  },
  description:
    "AUDIAW is a free and open-source next-generation digital audio workstation for precise, modern music production.",
  applicationName: "AUDIAW",
  keywords: [
    "AUDIAW",
    "DAW",
    "digital audio workstation",
    "music production",
    "open source audio",
    "audio editor",
    "free DAW",
  ],
  authors: [{ name: "AUDIAW" }],
  creator: "AUDIAW",
  openGraph: {
    title: "AUDIAW - Next-generation open-source DAW",
    description:
      "Professional music production software with a futuristic workflow, free and open source.",
    url: siteUrl,
    siteName: "AUDIAW",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AUDIAW next-generation DAW interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AUDIAW - Next-generation open-source DAW",
    description:
      "A cinematic, precise, free, open-source DAW for modern music production.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${geistMono.variable} bg-surface-void font-sans text-primary antialiased`}>
        {children}
      </body>
    </html>
  );
}
