import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-14 h-14 text-primary mb-3" /> {/* Icon size w-14 h-14 */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-2 tracking-tighter">404 - Page Not Found</h1> {/* Title text-4xl sm:text-5xl */}
      <p className="text-lg text-muted-foreground mb-5 max-w-md"> {/* Paragraph text-lg */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="default" variant="default"> {/* Button default size */}
        <Link href="/">
          <span>Go Back to Home</span>
        </Link>
      </Button>
    </div>
  )
}
