import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';

export default async function HomePage() {
  const allGames = await getGames();
  const gamesToDisplay = allGames.slice(0, 4);

  return (
    <div className="space-y-4 sm:space-y-6"> {/* Adjusted spacing */}
      <section className="text-center py-4 sm:py-6 rounded-lg bg-card shadow-md"> {/* Adjusted padding */}
        <h1 className="text-lg sm:text-xl font-extrabold mb-2 text-primary tracking-tight"> {/* Adjusted text size and margin */}
          Welcome to the CPC Game Vault!
        </h1>
        <p className="text-xs text-muted-foreground max-w-xl mx-auto px-4">
          Browse, discover, and play classic Amstrad CPC games directly in your browser.
        </p>
      </section>
      
      {gamesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"> {/* Adjusted gap */}
          {gamesToDisplay.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-8 text-xs">No games available at the moment. Check back soon!</p>
      )}
       {allGames.length > 4 && (
        <div className="text-center mt-4"> {/* Adjusted margin */}
          <p className="text-xs text-muted-foreground/80">
            And {allGames.length - 4} more games waiting to be explored...
          </p>
        </div>
      )}
    </div>
  );
}
