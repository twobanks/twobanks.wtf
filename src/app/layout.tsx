import { Poppins, Sedgwick_Ave_Display } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';

import { ThemeProvider } from '@/context/ThemeContext';
import StarBackground from '@/components/StarBackground';
import ThemeToggle from '@/components/ThemeToggle';
import Header from '@/components/Header';

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${graffitiFont.className} ${poppins.variable}`} suppressHydrationWarning={true}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <StarBackground /> 
            <Header />
            <ThemeToggle />
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}