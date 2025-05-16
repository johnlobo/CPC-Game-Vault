import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google'; // Classic pixel font
import './globals.css';
import { Header } from '@/app/components/Header';
import { Toaster } from '@/components/ui/toaster';

// Using Press Start 2P for a retro game feel
const pressStart2P = Press_Start_2P({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-geist-mono', // Re-using geist-mono variable for simplicity, but it's Press Start 2P
  display: 'swap',
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
      <body className={`${pressStart2P.variable} antialiased bg-background text-foreground min-h-screen flex flex-col text-xs sm:text-sm`}> {/* Base text size */}
        <Header />
        <main className="flex-grow container mx-auto px-4 py-5 sm:py-6"> {/* Adjusted padding */}
          {children}
        </main>
        <Toaster />
        <footer className="py-3 sm:py-4 text-center text-muted-foreground text-xs border-t border-border mt-auto"> {/* Adjusted padding & font size */}
          <p>&copy; {new Date().getFullYear()} CPC Game Vault. All rights reserved.</p>
          <p>Powered by Retro Virtual Machine &amp; Genkit AI.</p>
        </footer>
      </body>
    </html>
  );
}
