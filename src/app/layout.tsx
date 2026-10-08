// src/app/layout.tsx
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DrawerProvider } from "@/contexts/DrawerContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://twobanks.wtf"),
  title: {
    template: "BANKS | %s",
    default: "BANKS 🛸",
  },
  description: "where i register my randomness 🛸",
  keywords: ["desenvolvimento", "tecnologia", "portfólio", "blog", "randomness"],
  authors: [{ name: "Thiago Gonçalves Soares" }],
  creator: "otwobanks",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "BANKS 🛸",
    description: "where i register my randomness 🛸",
    siteName: "BANKS",
    images: [
      {
        url: "/opengraph-image.png", 
        width: 1200,
        height: 630,
        alt: "BANKS 🛸 - Onde registro minhas aleatoriedades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BANKS 🛸",
    description: "where i register my randomness 🛸",
    creator: "@otwobanks", 
    images: ["/twitter-image.png"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DrawerProvider>
            {children}
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}