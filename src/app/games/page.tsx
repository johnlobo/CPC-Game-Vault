
import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';
import type { Metadata } from 'next';
// Removed Link and Button imports as they are no longer used for the back button
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';

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
        {/* Removed Back to Home button from here */}
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
