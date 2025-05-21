import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function GameNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <AlertTriangle className="w-14 h-14 text-destructive mb-3" /> {/* Icon size w-14 h-14 */}
      <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-2">Game Not Found</h1> {/* Title text-4xl sm:text-5xl */}
      <p className="text-lg text-muted-foreground mb-5 max-w-md"> {/* Paragraph text-lg */}
        Oops! We couldn&apos;t find the Amstrad CPC game you were looking for. It might have been lost in the digital attic or never existed in our vault.
      </p>
      <Button asChild size="default"> {/* Button default size */}
        <Link href="/">
          <span>Return to Game Library</span>
        </Link>
      </Button>
    </div>
  );
}
