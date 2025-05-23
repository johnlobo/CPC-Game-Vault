
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-16 h-16 text-primary mb-3.5" /> {/* Icon size w-16 h-16 */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-primary mb-2.5 tracking-tighter">404 - Page Not Found</h1> {/* Title text-5xl sm:text-6xl */}
      <p className="text-xl text-muted-foreground mb-6 max-w-md"> {/* Paragraph text-xl */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="lg" variant="default"> {/* Button lg size */}
        <Link href="/">
          {/* Ensure Link has a single React Element child */}
          <span>Go Back to Home</span>
        </Link>
      </Button>
    </div>
  )
}
