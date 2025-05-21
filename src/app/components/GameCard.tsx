import type { Game } from '@/data/games';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CalendarDays, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  return (
    <Link href={`/games/${game.id}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-primary/50 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg">
        <CardHeader className="p-0">
          <div className="aspect-[3/4] relative w-full overflow-hidden">
            <Image
              src={game.coverImage}
              alt={`${game.title} cover art`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              data-ai-hint="retro game cover"
              priority={game.id === 'bomb-jack' || game.id === 'batman-the-movie'} // Prioritize first few images
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-2 space-y-1">
          <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">{game.title}</CardTitle> {/* Adjusted text size */}
          <div className="flex items-center text-base text-muted-foreground space-x-1.5"> {/* Details text-base */}
            <div className="flex items-center">
              <CalendarDays size={16} className="mr-0.5" /> {/* Adjusted icon size */}
              <span>{game.year}</span>
            </div>
            <div className="flex items-center">
              <Tag size={16} className="mr-0.5" /> {/* Adjusted icon size */}
              <span className="line-clamp-1">{game.genre}</span>
            </div>
          </div>
          <p className="text-base text-muted-foreground line-clamp-2">{game.publisher}</p> {/* Publisher text-base */}
        </CardContent>
        <CardFooter className="p-2 pt-0.5">
          <div className="text-lg text-accent flex items-center font-medium"> {/* Footer text-lg */}
            Play <ArrowRight size={16} className="ml-1 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" /> {/* Adjusted icon size */}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
