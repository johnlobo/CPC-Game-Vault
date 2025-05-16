import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-10 h-10 text-primary mb-3" /> {/* Adjusted size and margin */}
      <h1 className="text-lg sm:text-xl font-extrabold text-primary mb-2 tracking-tighter">404 - Page Not Found</h1> {/* Adjusted text size and margin */}
      <p className="text-xs text-muted-foreground mb-5 max-w-md"> {/* Adjusted margin */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="sm" variant="default" className="text-xs">
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  )
}
