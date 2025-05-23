
import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Full Game Library',
  description: 'Browse all available Amstrad CPC games in the CPC Game Vault.',
};

export default async function AllGamesPage() {
  const allGames = await getGames();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center pt-2 sm:pt-3 gap-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter text-center sm:text-left">
          Full Game Library
        </h1>
        <Button variant="outline" asChild size="lg" className="w-full sm:w-auto text-xl sm:text-2xl py-3 px-5">
          <Link href="/">
            <span className="inline-flex items-center justify-center">
              <ArrowLeft className="mr-1.5 h-8 w-8" />
              <span>Back to Home</span>
            </span>
          </Link>
        </Button>
      </div>
       <p className="text-2xl sm:text-3xl text-muted-foreground max-w-3xl mx-auto px-4 text-center pt-2.5">
          Explore the complete collection of classic Amstrad CPC games available in the vault. Click on any game to learn more and play!
        </p>
      
      {allGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 pt-4">
          {allGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10 text-2xl sm:text-3xl">
          No games available at the moment. Check back soon!
        </p>
      )}
    </div>
  );
}
