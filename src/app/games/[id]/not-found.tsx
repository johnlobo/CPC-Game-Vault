import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertTriangle className="w-20 h-20 text-destructive mb-5" /> {/* Adjusted size */}
      <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-2.5">Game Not Found</h1> {/* Adjusted size */}
      <p className="text-base text-muted-foreground mb-7 max-w-md"> {/* Adjusted size and margin */}
        Oops! We couldn&apos;t find the Amstrad CPC game you were looking for. It might have been lost in the digital attic or never existed in our vault.
      </p>
      <Button asChild size="default"> {/* Adjusted size to default */}
        <Link href="/">Return to Game Library</Link>
      </Button>
    </div>
  );
}
