import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Library } from 'lucide-react';

export default async function HomePage() {
  const allGames = await getGames();
  const gamesToDisplay = allGames.slice(0, 4);

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="text-center py-4 sm:py-6 rounded-lg bg-card shadow-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-primary tracking-tight">
          Welcome to the CPC Game Vault!
        </h1>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto px-4">
          Browse, discover, and play classic Amstrad CPC games directly in your browser.
        </p>
      </section>
      
      {gamesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {gamesToDisplay.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8 text-xl">No games available at the moment. Check back soon!</p>
      )}
       {allGames.length > 4 && (
        <div className="text-center mt-4 sm:mt-6">
          <Button asChild size="lg">
            <Link href="/games">
              <span className="inline-flex items-center">
                <Library className="mr-2 h-6 w-6" />
                <span>Explore Full Library ({allGames.length - gamesToDisplay.length} more)</span>
              </span>
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
