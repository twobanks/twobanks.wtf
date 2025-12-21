import React from 'react';
import type { Metadata } from 'next';
import { Sedgwick_Ave_Display, Inter } from 'next/font/google';

import { ThemeProvider } from '@/context/ThemeContext';

import Navigation from '@/components/Navigation';
import StyledComponentsRegistry from '@/utils/lib/registry';
import localFont from 'next/font/local';

const graffitiFont = Sedgwick_Ave_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-graffiti',
});

const pixo = localFont({
  src: '../../public/fonts/muro_sp.woff2', 
  display: 'swap',
  variable: '--font-pixo', 
});

const inter = Inter({
  weight: ['200', '300', '400', '500', '600'], 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'twobanks',
    template: '%s | twobanks',    
  },
  description: '...twobanks',
  icons: {
    icon: '/favicon.ico',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={`${graffitiFont.className} ${inter.variable} ${pixo.variable}`} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Navigation />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}