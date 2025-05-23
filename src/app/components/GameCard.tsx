
'use client';

import type { Game } from '@/data/games';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Tag, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Link
      href={`/games/${game.id}`}
      className="group block h-full"
      onClick={() => setIsClicked(true)}
    >
      <Card className="relative h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-primary/50 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
        {isClicked && (
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        )}
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <Image
              src={game.coverImage}
              alt={`${game.title} cover art`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="retro game cover"
              priority={game.id === 'bomb-jack' || game.id === 'batman-the-movie'}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-2 space-y-1">
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{game.title}</CardTitle>
          <div className="flex items-center text-lg text-muted-foreground space-x-1.5">
            <div className="flex items-center">
              <CalendarDays size={20} className="mr-0.5" />
              <span>{game.year}</span>
            </div>
            <div className="flex items-center">
              <Tag size={20} className="mr-0.5" />
              <span className="line-clamp-1">{game.genre}</span>
            </div>
          </div>
          <p className="text-lg text-muted-foreground line-clamp-2">{game.publisher}</p>
        </CardContent>
        <CardFooter className="p-2 pt-0.5">
          <div className="text-xl text-accent flex items-center font-medium">
            Play <ArrowRight size={20} className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
