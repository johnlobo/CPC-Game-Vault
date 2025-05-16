import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';

export function Header() {
  return (
    <header className="py-2 sm:py-3 bg-card shadow-lg sticky top-0 z-50"> {/* Adjusted padding */}
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors"> {/* Adjusted text size */}
          <Gamepad2 size={16} aria-hidden="true" /> {/* Adjusted icon size */}
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
