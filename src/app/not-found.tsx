import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <Frown className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tighter">404 - Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-lg">
        It seems you&apos;ve ventured into uncharted territory. The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button asChild size="lg" variant="default">
        <Link href="/">Go Back to Home</Link>
      </Button>
    </div>
  )
}
