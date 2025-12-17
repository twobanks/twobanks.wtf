import type { Metadata } from 'next';
import { Poppins, Sedgwick_Ave_Display } from 'next/font/google';

import { ThemeProvider } from '@/context/ThemeContext';
import StarBackground from '@/components/StarBackground';
import Header from '@/components/Header';

import StyledComponentsRegistry from '@/utils/lib/registry';

const graffitiFont = Sedgwick_Ave_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-graffiti',
});

const poppins = Poppins({
  weight: ['400', '500', '600'], 
  subsets: ['latin'],
  variable: '--font-poppins',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${graffitiFont.className} ${poppins.variable}`} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StarBackground /> 
            <Header />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}