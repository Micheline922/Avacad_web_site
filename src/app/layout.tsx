import type { Metadata } from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import { cn } from '@/lib/utils';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Avacad : Votre Assistant Académique',
  description: "Votre assistant académique personnel alimenté par l'IA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
       <head>
        <Script
          src="https://polyfill.io/v3/polyfill.min.js?features=default"
          strategy="beforeInteractive"
        />
      </head>
      <body className={cn("font-body antialiased", ptSans.variable, playfairDisplay.variable)}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
