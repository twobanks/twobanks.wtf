// src/app/layout.tsx
import "@/env";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DrawerProvider } from "@/contexts/DrawerContext";
import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL("https://twobanks.wtf"),
  title: {
    template: "%s — BANKS",
    default: "BANKS",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
  },
  description: "where i register my randomness 🛸",
  keywords: ["desenvolvimento", "tecnologia", "portfólio", "blog", "randomness"],
  authors: [{ name: "Thiago Gonçalves Soares" }],
  creator: "otwobanks",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "BANKS",
    description: "where i register my randomness 🛸",
    siteName: "BANKS",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BANKS - Onde registro minhas aleatoriedades",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BANKS",
    description: "where i register my randomness 🛸",
    creator: "@otwobanks",
    images: ["/twitter-image.png"],
  },
  // Em Preview/DEV (branch `banks`) não indexamos; apenas em Produção.
  robots: isProduction
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      }
    : {
        index: false,
        follow: true,
        googleBot: {
          index: false,
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
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