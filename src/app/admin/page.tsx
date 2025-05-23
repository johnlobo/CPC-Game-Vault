
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - CPC Game Vault',
  description: 'Administration area for the CPC Game Vault.',
};

export default function AdminPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-2 sm:pt-3 gap-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter text-center sm:text-left">
          Admin Area
        </h1>
        <Button variant="outline" asChild size="lg" className="text-xl py-3 px-6">
          <Link href="/">
            <span className="inline-flex items-center">
              <ArrowLeft className="mr-2 h-7 w-7" />
              <span>Back to Home</span>
            </span>
          </Link>
        </Button>
      </div>
      
      <div className="bg-card p-4 sm:p-6 rounded-lg shadow-xl">
        <p className="text-xl sm:text-2xl text-muted-foreground">
          Welcome to the admin panel. Future management tools and settings will appear here.
        </p>
      </div>
    </div>
  );
}
