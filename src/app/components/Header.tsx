
'use client';

import Link from 'next/link';
import { Gamepad2, ArrowLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const pathname = usePathname();
  // Show back button only on individual game detail pages like /games/some-id
  // It should not show on /games (full library) or /
  const showBackButton = pathname.startsWith('/games/') && pathname.split('/').length > 2;

  return (
    <header className="py-2 sm:py-3 bg-card shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
          <Gamepad2 size={36} aria-hidden="true" />
          <span>CPC Game Vault</span>
        </Link>
        
        {showBackButton && (
          <Button variant="default" asChild size="lg" className="text-xl py-3 px-6">
            <Link href="/">
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-7 w-7" />
                <span>Back to Library</span>
              </span>
            </Link>
          </Button>
        )}
        
        {/* Navigation links can be added here if needed */}
        {/* <nav>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
