import "@/app/globals.css";
import { auth } from "@/auth";

import Navbar from "@/components/Navbar";
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
  title: "twobanks",
  description: "twobanks",  
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const session = await auth()
  const isAuthenticated = !!session?.user
  
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        {/* 🟢 REMOVIDO "font-sans" daqui (já está aplicado globalmente no HTML) */}
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 dark:bg-black"> 
          <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between p-4 bg-white dark:bg-black sm:items-start">
            <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
              <Navbar isAuthenticated={isAuthenticated} />
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
