
'use client';

import type { Game } from '@/data/games';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Tag, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { cn } from '@/lib/utils';

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
      <Card 
        className={cn(
          "relative h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg",
          game.status === 'wip' 
            ? "border-wip border-2 shadow-wip/30" 
            : "border-border group-hover:border-primary/50" 
        )}
      >
        {isClicked && (
          <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}
        {game.status === 'wip' && (
          <div className="absolute inset-0 bg-card/70 backdrop-blur-xs flex items-center justify-center z-10 rounded-lg pointer-events-none">
            <div className="overflow-hidden w-full h-full flex items-center justify-center">
                <span 
                  className="transform -rotate-45 whitespace-nowrap text-wip-foreground bg-wip/90 px-6 py-2 text-lg sm:text-xl font-bold shadow-lg"
                  style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }} 
                >
                  Work in Progress
                </span>
            </div>
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
        <CardContent className="flex-grow p-4 space-y-1.5">
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">{game.title}</CardTitle>
          <div className="flex items-center text-base text-muted-foreground space-x-2">
            <div className="flex items-center">
              <CalendarDays size={28} className="mr-1" />
              <span>{game.year}</span>
            </div>
            <div className="flex items-center">
              <Tag size={28} className="mr-1" />
              <span className="line-clamp-1">{game.genre}</span>
            </div>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2">{game.publisher}</p>
        </CardContent>
        <CardFooter className="p-4 pt-1">
          <div className="text-lg text-accent flex items-center font-medium">
            Play <ArrowRight size={28} className="ml-1.5 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
