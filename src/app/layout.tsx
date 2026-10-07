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
  title: {
    template: "BANKS | %s",
    default: "BANKS | Painel Financeiro e Gestão",
  },
  description: "Plataforma inteligente de controle financeiro e gerenciamento de conteúdo.",
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