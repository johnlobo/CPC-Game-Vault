
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
    <div className="space-y-10 sm:space-y-12"> {/* Reduced vertical spacing slightly */}
      <header className="text-center space-y-3 pt-4"> {/* Reduced vertical spacing slightly */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary tracking-tighter">{game.title}</h1>
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          {/* Badge text size is generally small (text-xs by default from component), so it should be fine */}
          <Badge variant="secondary" className="px-2 py-0.5 text-xs sm:px-3 sm:py-1"><CalendarDays size={12} className="mr-1 sm:mr-1.5" /> {game.year}</Badge>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs sm:px-3 sm:py-1"><Tag size={12} className="mr-1 sm:mr-1.5" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs sm:px-3 sm:py-1"><Code2 size={12} className="mr-1 sm:mr-1.5" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-2 py-0.5 text-xs sm:px-3 sm:py-1"><Users size={12} className="mr-1 sm:mr-1.5" /> {game.publisher}</Badge>
        </div>
      </header>

      <div>
        <Button variant="outline" asChild size="default"> {/* Changed size to default */}
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> {/* Adjusted icon size */}
            Back to Game Library
          </Link>
        </Button>
      </div>

      <Card className="overflow-hidden shadow-xl">
        <CardContent className="p-4 sm:p-6"> {/* Adjusted padding */}
          <p className="text-sm sm:text-base text-foreground leading-relaxed">{game.description}</p>
        </CardContent>
      </Card>
      
      <Separator className="my-6 sm:my-8" /> {/* Adjusted margin */}

      <section id="play-game" className="scroll-mt-20">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-primary tracking-tight"> {/* Adjusted size and margin */}
          <Eye size={28} className="inline-block mr-2 mb-1 text-accent" /> Play Now! {/* Adjusted icon size */}
        </h2>
        <Emulator rvmGameId={game.rvmGameId} title={game.title} />
      </section>
      
      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <Separator className="my-6 sm:my-8" /> {/* Adjusted margin */}
          <section id="screenshots" className="scroll-mt-20">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-primary tracking-tight">Screenshots</h2> {/* Adjusted size and margin */}
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
                    <Eye size={40} className="text-white/80" /> {/* Adjusted icon size */}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <Separator className="my-6 sm:my-8" /> {/* Adjusted margin */}

      <section id="related-games" className="scroll-mt-20">
        <RelatedGames gameTitle={game.title} />
      </section>
    </div>
  );
}
