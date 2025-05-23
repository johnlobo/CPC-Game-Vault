
"use client"; // Required for useState and event handlers

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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from 'react';

interface GamePageProps {
  params: { id: string };
}

// Note: generateMetadata should ideally remain a server-side function if possible,
// or data fetching for it should be done in a way compatible with client components.
// For simplicity in this example, we'll assume getGameById can be called here,
// but in a real app, you might fetch metadata differently for client components or keep this part server-side.

// export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
//   const game = await getGameById(params.id);
//   if (!game) {
//     return { title: 'Game Not Found' };
//   }
//   return {
//     title: game.title,
//     description: `Play ${game.title} online! Details, screenshots, and emulator for this Amstrad CPC classic. ${game.description.substring(0, 120)}...`,
//   };
// }

export default function GamePage({ params }: GamePageProps) {
  const [game, setGame] = useState<Game | null | undefined>(undefined); // undefined for loading, null for not found
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      const gameData = await getGameById(params.id);
      setGame(gameData);
      if (gameData) {
        document.title = `${gameData.title} | CPC Game Vault`;
      } else {
        document.title = 'Game Not Found | CPC Game Vault';
      }
    }
    fetchGame();
  }, [params.id]);

  if (game === undefined) {
    // Loading state (optional, or show a skeleton)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-xl text-muted-foreground">Loading game details...</p>
      </div>
    );
  }

  if (!game) {
    notFound(); // This will trigger the not-found.tsx boundary
  }

  const handleScreenshotClick = (screenshotUrl: string) => {
    setSelectedScreenshot(screenshotUrl);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="text-center space-y-1 pt-1 sm:pt-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tighter">{game.title}</h1>
        <div className="flex flex-wrap justify-center items-center gap-1.5">
          <Badge variant="secondary" className="px-1.5 py-0.5 text-lg"><CalendarDays size={18} className="mr-1" /> {game.year}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-lg"><Tag size={18} className="mr-1" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-lg"><Code2 size={18} className="mr-1" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-1.5 py-0.5 text-lg"><Users size={18} className="mr-1" /> {game.publisher}</Badge>
        </div>
      </header>

      <div className="mt-3 sm:mt-4">
        <Button variant="outline" asChild size="lg">
          <Link href="/">
            <span className="inline-flex items-center">
              <ArrowLeft className="mr-1.5 h-6 w-6" />
              <span>Back to Library</span>
            </span>
          </Link>
        </Button>
      </div>
      
      <Separator className="my-3 sm:my-4" />
      
      <section id="play-game" className="scroll-mt-10 sm:scroll-mt-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2.5 sm:mb-3 text-center text-primary tracking-tight">
          <Eye size={28} className="inline-block mr-1.5 mb-1 text-accent" /> Play Now!
        </h2>
        <Emulator 
          key={`${game.diskUrl}-${game.emulatorCommand}`} 
          diskUrl={game.diskUrl} 
          command={game.emulatorCommand} 
          title={game.title} 
        />
      </section>
      
      <Separator className="my-3 sm:my-4" />
      
      <Card className="overflow-hidden shadow-xl">
        <CardContent className="p-3 sm:p-4 text-lg leading-relaxed">
          <p>{game.description}</p>
        </CardContent>
      </Card>
      
      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <Separator className="my-3 sm:my-4" />
          <section id="screenshots" className="scroll-mt-10 sm:scroll-mt-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2.5 sm:mb-3.5 text-center text-primary tracking-tight">Screenshots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {game.screenshots.map((screenshot, index) => (
                <Dialog key={index} open={isDialogOpen && selectedScreenshot === screenshot} onOpenChange={(open) => { if (!open) setSelectedScreenshot(null); setIsDialogOpen(open);}}>
                  <DialogTrigger asChild>
                    <button 
                      className="block w-full aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg border border-border group transition-all duration-300 hover:scale-105 hover:shadow-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      onClick={() => handleScreenshotClick(screenshot)}
                      aria-label={`View larger version of screenshot ${index + 1}`}
                    >
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
                        <Eye size={36} className="text-white/80" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-2 sm:p-3">
                    {selectedScreenshot === screenshot && ( // Ensure correct image is loaded
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={selectedScreenshot}
                          alt={`Enlarged screenshot of ${game.title}`}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
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
