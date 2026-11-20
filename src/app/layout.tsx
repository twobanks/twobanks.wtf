import "@/app/globals.css";
import { PublicFooter } from "@/components/PublicFooter";
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
    template: "BANKS | %s 🏹",
    default: "BANKS 🏹",
  },
  description: "where i register my randomness 🛸",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="relative flex min-h-full flex-col bg-[#120706] text-[#F4ECE1] selection:bg-[#F28C38]/30 selection:text-[#FAF6F0]"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <DrawerProvider>
            {/* Parede da caverna: sombra profunda nas laterais e clarão quente da fogueira no centro */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 -z-10"
              style={{
                background: `
                  radial-gradient(ellipse 68% 58% at 50% 94%, rgba(214, 76, 50, 0.28) 0%, rgba(112, 31, 18, 0.16) 42%, rgba(18, 7, 6, 0) 78%),
                  radial-gradient(circle at 50% 35%, #240C0C 0%, #120706 72%, #0A0405 100%)
                `,
              }}
            />

            {/* Textura mineral / granulação da rocha */}
            <div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-50 opacity-[0.045] mix-blend-screen"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            <main className="flex-1 pb-48 sm:pb-64">{children}</main>

            <PublicFooter />
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}