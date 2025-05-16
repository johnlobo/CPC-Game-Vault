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
      <div className="flex flex-col items-center justify-center py-6 text-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary mb-2" /> 
        <p className="text-xs text-muted-foreground">Summoning AI...</p>
        <p className="text-xs text-muted-foreground/70">Please wait.</p>
      </div>
    );
  }

  if (error) {
    return (
       <Alert variant="destructive" className="my-4">
        <Terminal className="h-3 w-3" /> 
        <AlertTitle className="text-xs">Recommendation Error</AlertTitle>
        <AlertDescription className="text-xs">{error}</AlertDescription>
      </Alert>
    );
  }

  if (!recommendations || recommendations.relatedGames.length === 0) {
    return (
      <Alert className="my-4">
        <AlertTriangle className="h-3 w-3" /> 
        <AlertTitle className="text-xs">No Recommendations</AlertTitle>
        <AlertDescription className="text-xs">We couldn&apos;t find any specific recommendations for this game.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-center text-primary tracking-tight">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.relatedGames.map((game, index) => (
          <Card key={index} className="bg-card/80 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="pb-1.5 pt-3 px-3">
              <CardTitle className="text-sm text-accent">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow px-3 pb-3">
              <CardDescription className="text-xs text-muted-foreground">{game.description}</CardDescription>
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
