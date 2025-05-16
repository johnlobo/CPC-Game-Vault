import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-16 h-16 text-primary mb-4" /> {/* Adjusted size */}
      <h1 className="text-xl sm:text-2xl font-extrabold text-primary mb-2.5 tracking-tighter">404 - Page Not Found</h1> {/* Adjusted size */}
      <p className="text-xs sm:text-sm text-muted-foreground mb-6 max-w-md"> {/* Adjusted size and margin */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="sm" variant="default" className="text-xs"> {/* Adjusted size & text size */}
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  )
}
