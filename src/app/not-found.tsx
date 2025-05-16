import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-20 h-20 text-primary mb-5" /> {/* Adjusted size */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-3 tracking-tighter">404 - Page Not Found</h1> {/* Adjusted size */}
      <p className="text-base sm:text-lg text-muted-foreground mb-7 max-w-md"> {/* Adjusted size and margin */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="default" variant="default"> {/* Adjusted size to default */}
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  )
}
