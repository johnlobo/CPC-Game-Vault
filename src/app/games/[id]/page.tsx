
import type { Game } from '@/data/games';
import { getGameById } from '@/data/games';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Emulator } from './components/Emulator';
import { RelatedGames } from './components/RelatedGames';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CalendarDays, Code2, Tag, Users, Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-4 sm:space-y-6"> {/* Adjusted spacing */}
      <header className="text-center space-y-1 pt-1 sm:pt-2">  {/* Adjusted padding and spacing */}
        <h1 className="text-lg sm:text-xl font-extrabold text-primary tracking-tighter">{game.title}</h1> {/* Adjusted text size */}
        <div className="flex flex-wrap justify-center items-center gap-1"> {/* Adjusted gap */}
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><CalendarDays size={10} className="mr-1" /> {game.year}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Tag size={10} className="mr-1" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Code2 size={10} className="mr-1" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Users size={10} className="mr-1" /> {game.publisher}</Badge>
        </div>
      </header>

      <div>
        <Button variant="outline" asChild size="sm" className="text-xs">
          <Link href="/">
            <span>
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to Library
            </span>
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <CardContent className="p-2 sm:p-2.5 text-xs leading-relaxed"> {/* Adjusted padding */}
          <p>{game.description}</p>
        </CardContent>
      </Card>
      
      <Separator className="my-3 sm:my-4" /> {/* Adjusted margin */}

      <section id="play-game" className="scroll-mt-10 sm:scroll-mt-12"> {/* Adjusted scroll margin */}
        <h2 className="text-sm sm:text-base font-bold mb-2 sm:mb-2.5 text-center text-primary tracking-tight">  {/* Adjusted text size and margin */}
          <Eye size={14} className="inline-block mr-1 mb-0.5 text-accent sm:size-16" /> Play Now!  {/* Adjusted icon size */}
        </h2>
        <Emulator rvmGameId={game.rvmGameId} title={game.title} />
      </section>
      
      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <Separator className="my-3 sm:my-4" /> {/* Adjusted margin */}
          <section id="screenshots" className="scroll-mt-10 sm:scroll-mt-12"> {/* Adjusted scroll margin */}
            <h2 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 text-center text-primary tracking-tight">Screenshots</h2>  {/* Adjusted text size and margin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5"> {/* Adjusted gap */}
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
                    <Eye size={20} className="text-white/80" />  {/* Adjusted icon size */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator className="my-3 sm:my-4" /> {/* Adjusted margin */}

      <section id="related-games" className="scroll-mt-10 sm:scroll-mt-12"> {/* Adjusted scroll margin */}
        <RelatedGames gameTitle={game.title} />
      </section>
    </div>
  );
}
