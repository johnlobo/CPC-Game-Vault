import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-12 h-12 text-primary mb-3" /> {/* Icon size w-12 h-12 */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-2 tracking-tighter">404 - Page Not Found</h1> {/* Title text-3xl sm:text-4xl */}
      <p className="text-base text-muted-foreground mb-5 max-w-md"> {/* Paragraph text-base */}
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="sm" variant="default"> {/* Button default size will use text-sm based on its variant */}
        <Link href="/">
          <span>Go Back to Home</span>
        </Link>
      </Button>
    </div>
  )
}
