
import "@/app/globals.css";
import { auth } from "@/auth";
import Navbar from "@/components/Navbar";
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
  // O Next.js mapeia automaticamente o favicon.ico localizado em src/app/favicon.ico
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <html
      lang="en"
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
            <Navbar isAuthenticated={isAuthenticated} />
            {children}
          </DrawerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}