
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
    <div className="space-y-4 sm:space-y-6">
      <header className="text-center space-y-1 pt-1 sm:pt-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tighter">{game.title}</h1> {/* Adjusted text size */}
        <div className="flex flex-wrap justify-center items-center gap-1">
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><CalendarDays size={10} className="mr-1" /> {game.year}</Badge> {/* Badge text-xs, icon size 10 */}
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Tag size={10} className="mr-1" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Code2 size={10} className="mr-1" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-xs"><Users size={10} className="mr-1" /> {game.publisher}</Badge>
        </div>
      </header>

      <div>
        <Button variant="outline" asChild size="sm" className="text-sm"> {/* Button text-sm */}
          <Link href="/">
            <span>
              <ArrowLeft className="mr-1 h-4 w-4" /> {/* Icon size h-4 w-4 */}
              Back to Library
            </span>
          </Link>
        </Button>
      </div>
      
      <Separator className="my-3 sm:my-4" />

      <section id="play-game" className="scroll-mt-10 sm:scroll-mt-12">
        <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-2.5 text-center text-primary tracking-tight">  {/* Section title text-lg sm:text-xl */}
          <Eye size={16} className="inline-block mr-1 mb-0.5 text-accent sm:size-18" /> Play Now!  {/* Icon size 16 sm:18 */}
        </h2>
        {/* Ensure game.diskUrl is passed to the Emulator and key is set */}
        <Emulator key={game.diskUrl} diskUrl={game.diskUrl} title={game.title} />
      </section>

      <Separator className="my-3 sm:my-4" />
      
      <Card className="overflow-hidden shadow-xl">
        <CardContent className="p-2 sm:p-2.5 text-sm leading-relaxed"> {/* Description text-sm */}
          <p>{game.description}</p>
        </CardContent>
      </Card>
      
      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <Separator className="my-3 sm:my-4" />
          <section id="screenshots" className="scroll-mt-10 sm:scroll-mt-12">
            <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-center text-primary tracking-tight">Screenshots</h2>  {/* Section title text-lg sm:text-xl */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
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
                    <Eye size={20} className="text-white/80" />  {/* Screenshot hover icon size 20 */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator className="my-3 sm:my-4" />

      <section id="related-games" className="scroll-mt-10 sm:scroll-mt-12">
        <RelatedGames gameTitle={game.title} />
      </section>
    </div>
  );
}
