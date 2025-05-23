
import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Library } from 'lucide-react';

export default async function HomePage() {
  const allGames = await getGames();
  const gamesToDisplay = allGames.slice(0, 3); // Show only the first 3 games

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="text-center py-6 sm:py-8 rounded-lg bg-card shadow-xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-2.5 text-primary tracking-tight">
          Welcome to the CPC Game Vault!
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto px-4">
          Browse, discover, and play classic Amstrad CPC games directly in your browser.
        </p>
      </section>
      
      {gamesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {gamesToDisplay.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10 text-xl sm:text-2xl">No games available at the moment. Check back soon!</p>
      )}
       {allGames.length > gamesToDisplay.length && ( 
        <div className="text-center mt-6 sm:mt-8">
          <Button asChild variant="default" size="lg" className="text-xl py-3 px-6">
            <Link href="/games">
              <span className="inline-flex items-center">
                <Library className="mr-2 h-7 w-7" />
                <span>Explore Full Library ({allGames.length - gamesToDisplay.length} more)</span>
              </span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
