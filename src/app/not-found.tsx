import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-10 h-10 text-primary mb-3" /> {/* Icon size w-10 h-10 */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-primary mb-2 tracking-tighter">404 - Page Not Found</h1> {/* Title text-2xl sm:text-3xl */}
      <p className="text-sm text-muted-foreground mb-5 max-w-md"> {/* Paragraph text-sm */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="sm" variant="default" className="text-sm"> {/* Button text-sm */}
        <Link href="/">
          <span>Go Back to Home</span>
        </Link>
      </Button>
    </div>
  )
}
