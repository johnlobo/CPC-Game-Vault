import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-2 sm:py-3 bg-card shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 text-xl font-bold text-primary hover:text-primary/80 transition-colors">
          <Gamepad2 size={28} aria-hidden="true" />
          <span>CPC Game Vault</span>
        </Link>
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
