import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertTriangle className="w-10 h-10 text-destructive mb-3" /> {/* Adjusted size and margin */}
      <h1 className="text-lg sm:text-xl font-bold text-primary mb-2">Game Not Found</h1> {/* Adjusted text size and margin */}
      <p className="text-xs text-muted-foreground mb-5 max-w-md"> {/* Adjusted margin */}
        Oops! We couldn&apos;t find the Amstrad CPC game you were looking for. It might have been lost in the digital attic or never existed in our vault.
      </p>
      <Button asChild size="sm" className="text-xs">
        <Link href="/">Return to Game Library</Link>
      </Button>
    </div>
  );
}
