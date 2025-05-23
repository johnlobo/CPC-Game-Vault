
"use client"; // Required for useState and event handlers

import { useEffect, useState, use } from 'react';
import type { Game } from '@/data/games';
import { getGameById } from '@/data/games';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Emulator } from './components/Emulator';
import { RelatedGames } from './components/RelatedGames';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Code2, Tag, Users, Eye, ArrowLeft, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface GamePageProps {
  params: { id: string };
}

export default function GamePage({ params: paramsFromProps }: GamePageProps) {
  // Use React.use to unwrap the Promise for params
  const resolvedParams = use(paramsFromProps as Promise<{ id: string }>);
  const id = resolvedParams.id;

  const [game, setGame] = useState<Game | null | undefined>(undefined);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    async function fetchGame() {
      setGame(undefined);
      const gameData = await getGameById(id);
      setGame(gameData);
      if (gameData) {
        document.title = `${gameData.title} | CPC Game Vault`;
      } else {
        document.title = 'Game Not Found | CPC Game Vault';
      }
    }
    if (id) {
        fetchGame();
    }
  }, [id]);

  if (game === undefined) {
    // Return null or a minimal loader while params are resolving or game is fetching
    return null;
  }

  if (!game) {
    notFound();
  }

  const handleScreenshotClick = (screenshotUrl: string) => {
    setSelectedScreenshot(screenshotUrl);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <header className="text-center space-y-1 pt-1 sm:pt-2">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tighter">{game.title}</h1>
        <div className="flex flex-wrap justify-center items-center gap-1.5 text-lg">
          <Badge variant="secondary" className="px-2 py-1 text-xl"><CalendarDays size={28} className="mr-1.5" /> {game.year}</Badge>
          <Badge variant="secondary" className="px-2 py-1 text-xl"><Tag size={28} className="mr-1.5" /> {game.genre}</Badge>
          <Badge variant="secondary" className="px-2 py-1 text-xl"><Code2 size={28} className="mr-1.5" /> {game.developer}</Badge>
          <Badge variant="secondary" className="px-2 py-1 text-xl"><Users size={28} className="mr-1.5" /> {game.publisher}</Badge>
          {game.status === 'wip' && (
            <Badge variant="secondary" className="px-2 py-1 text-xl border-2 border-wip text-wip-foreground bg-wip hover:bg-wip/90">
              <Info size={28} className="mr-1.5" /> Work in Progress
            </Badge>
          )}
        </div>
      </header>

      <section id="play-game" className="scroll-mt-10 sm:scroll-mt-12 pt-3 sm:pt-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2.5 sm:mb-3 text-center text-primary tracking-tight">
          <Eye size={42} className="inline-block mr-1.5 mb-0.5 text-accent" /> Play Now!
        </h2>
        <Emulator
          key={`${game.id}-${game.diskUrl}-${game.emulatorCommand}`}
          diskUrl={game.diskUrl}
          command={game.emulatorCommand}
          title={game.title}
          status={game.status}
        />
      </section>

      <Card className="overflow-hidden shadow-xl mt-4 sm:mt-6">
        <CardContent className="p-3 sm:p-4 text-xl leading-relaxed">
          <p>{game.description}</p>
        </CardContent>
      </Card>

      {game.screenshots && game.screenshots.length > 0 && (
        <>
          <section id="screenshots" className="scroll-mt-10 sm:scroll-mt-12 pt-4 sm:pt-6">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2.5 sm:mb-3.5 text-center text-primary tracking-tight">Screenshots</h2>
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
                        <Eye size={48} className="text-white/80" />
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl p-2 sm:p-3">
                    {selectedScreenshot === screenshot && (
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

      <section id="related-games" className="scroll-mt-10 sm:scroll-mt-12 pt-4 sm:pt-6">
        <RelatedGames gameTitle={game.title} />
      </section>
    </div>
  );
}
