import { getGames } from '@/data/games';
import { GameCard } from '@/app/components/GameCard';

export default async function HomePage() {
  const games = await getGames();

  return (
    <div className="space-y-8">
      <section className="text-center py-8 rounded-lg bg-card shadow-md">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-primary tracking-tight">
          Welcome to the CPC Game Vault!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
          Browse, discover, and play classic Amstrad CPC games directly in your browser.
        </p>
      </section>
      
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">No games available at the moment. Check back soon!</p>
      )}
    </div>
  );
}
