import type { Metadata } from 'next';
import { Roboto } from 'next/font/google'; // Import Roboto
import Script from 'next/script';
import './globals.css';
import { Header } from '@/app/components/Header';
import { Toaster } from '@/components/ui/toaster';

// Configure Roboto font
const roboto = Roboto({
  weight: ['400', '500', '700'], // Specify desired weights
  subsets: ['latin'],
  display: 'swap', // Improve font loading behavior
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
      <head>
        <Script src='https://cdn.rvmplayer.org/rvmplayer.cpc6128.0.1.1.min.js' strategy="beforeInteractive" />
      </head>
      <body className={`${roboto.className} antialiased bg-background text-foreground min-h-screen flex flex-col text-xs`}> {/* Apply Roboto class, keep text-xs base */}
        <Header />
        <main className="flex-grow container mx-auto px-4 py-4 sm:py-5"> {/* Adjusted padding */}
          {children}
        </main>
        <Toaster />
        <footer className="py-2 sm:py-3 text-center text-muted-foreground text-xs border-t border-border mt-auto"> {/* Adjusted padding & font size */}
          <p>&copy; {new Date().getFullYear()} CPC Game Vault. All rights reserved.</p>
          <p>Powered by Retro Virtual Machine &amp; Genkit AI.</p>
        </footer>
      </body>
    </html>
  );
}
