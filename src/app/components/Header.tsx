
'use client';

import Link from 'next/link';
import { Gamepad2, ArrowLeft, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  // Show "Back to Library" button only on individual game detail pages like /games/some-id
  const showBackToLibraryButton = pathname.startsWith('/games/') && pathname.split('/').length > 2;
  // Show "Back to Home" button only on the full game library page /games
  const showBackToHomeButtonGamesPage = pathname === '/games';
  // Show "Admin" button only on the homepage /
  const showAdminButton = pathname === '/';
  // Show "Back to Home" button only on the admin page /admin
  const showBackToHomeButtonAdminPage = pathname === '/admin';

  return (
    <header className="py-2 sm:py-3 bg-card shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 text-3xl font-bold text-primary hover:text-primary/80 transition-colors">
          <Gamepad2 size={40} aria-hidden="true" />
          <span>CPC Game Vault</span>
        </Link>
        
        {showBackToLibraryButton && (
          <Button variant="default" asChild size="lg" className="text-xl py-3 px-6">
            <Link href="/">
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-7 w-7" />
                <span>Back to Library</span>
              </span>
            </Link>
          </Button>
        )}

        {showBackToHomeButtonGamesPage && (
           <Button variant="default" asChild size="lg" className="text-xl py-3 px-6">
            <Link href="/">
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-7 w-7" />
                <span>Back to Home</span>
              </span>
            </Link>
          </Button>
        )}

        {showAdminButton && (
           <Button variant="outline" asChild size="lg" className="text-xl py-3 px-6">
            <Link href="/admin">
              <span className="inline-flex items-center">
                <Settings className="mr-2 h-7 w-7" />
                <span>Admin</span>
              </span>
            </Link>
          </Button>
        )}

        {showBackToHomeButtonAdminPage && (
           <Button variant="outline" asChild size="lg" className="text-xl py-3 px-6">
            <Link href="/">
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-7 w-7" />
                <span>Back to Home</span>
              </span>
            </Link>
          </Button>
        )}
        
      </div>
    </header>
  );
}
