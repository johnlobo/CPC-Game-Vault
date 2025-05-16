import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/app/components/Header';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CPC Game Vault',
    template: '%s | CPC Game Vault',
  },
  description: 'Your personal library of Amstrad CPC games, playable online!',
  icons: {
    // Placeholder for actual icon if provided later
    // icon: "/favicon.ico", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
        <footer className="py-6 text-center text-muted-foreground text-xs border-t border-border mt-auto">
          <p>&copy; {new Date().getFullYear()} CPC Game Vault. All rights reserved.</p>
          <p>Powered by Retro Virtual Machine &amp; Genkit AI.</p>
        </footer>
      </body>
    </html>
  );
}
