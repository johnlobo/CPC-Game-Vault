
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertTriangle className="w-20 h-20 text-destructive mb-3.5" />
      <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-2.5">Game Not Found</h1>
      <p className="text-2xl text-muted-foreground mb-6 max-w-md">
        Oops! We couldn&apos;t find the Amstrad CPC game you were looking for. It might have been lost in the digital attic or never existed in our vault.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          <span>Return to Game Library</span>
        </Link>
      </Button>
    </div>
  );
}
