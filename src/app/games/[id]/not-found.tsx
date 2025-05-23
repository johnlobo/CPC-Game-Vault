
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-3.5" /> {/* Icon size w-16 h-16 */}
      <h1 className="text-5xl sm:text-6xl font-bold text-primary mb-2.5">Game Not Found</h1> {/* Title text-5xl sm:text-6xl */}
      <p className="text-xl text-muted-foreground mb-6 max-w-md"> {/* Paragraph text-xl */}
        Oops! We couldn&apos;t find the Amstrad CPC game you were looking for. It might have been lost in the digital attic or never existed in our vault.
      </p>
      <Button asChild size="lg"> {/* Button lg size */}
        <Link href="/">
          {/* Ensure Link has a single React Element child */}
          <span>Return to Game Library</span>
        </Link>
      </Button>
    </div>
  );
}
