import type { Game } from '@/data/games';
import { getGameById } from '@/data/games';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Emulator } from './components/Emulator';
import { RelatedGames } from './components/RelatedGames';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Code2, Tag, Users, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

interface GamePageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = await getGameById(params.id);
  if (!game) {
    return { title: 'Game Not Found' };
  }
  return {
    title: game.title, // Template in RootLayout will add "| CPC Game Vault"
    description: `Play ${game.title} online! Details, screenshots, and emulator for this Amstrad CPC classic. ${game.description.substring(0, 120)}...`,
  };
}

// This function can be used if you want to statically generate paths at build time
// export async function generateStaticParams() {
//   const games = await getGames(); // Assuming getGames is available
//   return games.map((game) => ({
//     id: game.id,
//   }));
// }

export default async function GamePage({ params }: GamePageProps) {
  const game = await getGameById(params.id);

  if (!game) {
    notFound();
  }

  return (
    <div className="space-y-10 sm:space-y-16">
      <header className="text-center space-y-4 pt-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tighter">{game.title}</h1>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <Badge variant="secondary" className="px-3 py-1 text-sm"><CalendarDays size={14} className="mr-1.5" /> {game.year}</Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm"><Tag size={14} className="mr-1.5" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm"><Code2 size={14} className="mr-1.5" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-3 py-1 text-sm"><Users size={14} className="mr-1.5" /> {game.publisher}</Badge>
        </div>
      </header>

      <Card className="overflow-hidden shadow-xl">
        <CardContent className="p-6 sm:p-8">
          <p className="text-base sm:text-lg text-foreground leading-relaxed">{game.description}</p>
        </CardContent>
      </Card>
      
      <Separator className="my-8 sm:my-12" />

      <section id="play-game" className="scroll-mt-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-primary tracking-tight">
          <Eye size={32} className="inline-block mr-2 mb-1 text-accent" /> Play Now!
        </h2>
        <Emulator rvmGameId={game.rvmGameId} title={game.title} />
      </section>
      
      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <Separator className="my-8 sm:my-12" />
          <section id="screenshots" className="scroll-mt-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-primary tracking-tight">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {game.screenshots.map((screenshot, index) => (
                <div key={index} className="aspect-video relative rounded-lg overflow-hidden shadow-lg border border-border group transition-all duration-300 hover:scale-105 hover:shadow-primary/30">
                  <Image
                    src={screenshot}
                    alt={`${game.title} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    data-ai-hint="retro game screenshot"
                    loading="lazy"
                  />
                   <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Eye size={48} className="text-white/80" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator className="my-8 sm:my-12" />

      <section id="related-games" className="scroll-mt-20">
        <RelatedGames gameTitle={game.title} />
      </section>
    </div>
  );
}
