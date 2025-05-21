"use client";

import { useEffect, useState } from 'react';
import type { SuggestRelatedGamesOutput } from '@/ai/flows/suggest-related-games';
import { suggestRelatedGames } from '@/ai/flows/suggest-related-games';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, AlertTriangle, Terminal } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button'; // For potential future "View Game" links

interface RelatedGamesProps {
  gameTitle: string;
}

export function RelatedGames({ gameTitle }: RelatedGamesProps) {
  const [recommendations, setRecommendations] = useState<SuggestRelatedGamesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        setError(null);
        const result = await suggestRelatedGames({ gameTitle });
        if (isMounted) {
          setRecommendations(result);
        }
      } catch (e) {
        console.error("Failed to fetch related games:", e);
        if (isMounted) {
          setError("Could not load recommendations. The AI might be taking a break!");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchRecommendations();
    return () => {
      isMounted = false;
    };
  }, [gameTitle]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary mb-1.5" />  {/* Loader icon h-7 w-7 */}
        <p className="text-lg text-muted-foreground">Summoning AI...</p> {/* Loader text-lg */}
        <p className="text-lg text-muted-foreground/70">Please wait.</p> {/* Loader text-lg */}
      </div>
    );
  }

  if (error) {
    return (
       <Alert variant="destructive" className="my-3">
        <Terminal className="h-6 w-6" /> {/* Alert icon h-6 w-6 */}
        <AlertTitle className="text-lg">Recommendation Error</AlertTitle> {/* Alert title text-lg */}
        <AlertDescription className="text-lg">{error}</AlertDescription> {/* Alert desc text-lg */}
      </Alert>
    );
  }

  if (!recommendations || recommendations.relatedGames.length === 0) {
    return (
      <Alert className="my-3">
        <AlertTriangle className="h-6 w-6" /> {/* Alert icon h-6 w-6 */}
        <AlertTitle className="text-lg">No Recommendations</AlertTitle> {/* Alert title text-lg */}
        <AlertDescription className="text-lg">We couldn&apos;t find any specific recommendations for this game.</AlertDescription> {/* Alert desc text-lg */}
      </Alert>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-center text-primary tracking-tight">You Might Also Like</h2> {/* Section title text-2xl */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {recommendations.relatedGames.map((game, index) => (
          <Card key={index} className="bg-card/80 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="pb-1 pt-2 px-2">
              <CardTitle className="text-lg text-accent">{game.title}</CardTitle> {/* Card title text-lg */}
            </CardHeader>
            <CardContent className="flex-grow px-2 pb-2">
              <CardDescription className="text-lg text-muted-foreground">{game.description}</CardDescription> {/* Card desc text-lg */}
            </CardContent>
            {/* 
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                View Game (Coming Soon)
              </Button>
            </CardFooter> 
            */}
          </Card>
        ))}
      </div>
    </div>
  );
}
