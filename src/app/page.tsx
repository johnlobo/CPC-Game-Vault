import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';

export default async function HomePage() {
  const allGames = await getGames();
  const gamesToDisplay = allGames.slice(0, 4);

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="text-center py-6 sm:py-8 rounded-lg bg-card shadow-md">
        <h1 className="text-lg sm:text-xl font-extrabold mb-3 text-primary tracking-tight">
          Welcome to the CPC Game Vault!
        </h1>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto px-4">
          Browse, discover, and play classic Amstrad CPC games directly in your browser.
        </p>
      </section>
      
      {gamesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {gamesToDisplay.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8 text-xs">No games available at the moment. Check back soon!</p>
      )}
       {allGames.length > 4 && (
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground/80">
            And {allGames.length - 4} more games waiting to be explored...
          </p>
        </div>
      )}
    </div>
  );
}
