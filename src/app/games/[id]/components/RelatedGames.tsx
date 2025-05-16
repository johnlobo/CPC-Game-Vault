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
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" /> {/* Adjusted size */}
        <p className="text-base text-muted-foreground">Summoning AI for recommendations...</p>
        <p className="text-xs text-muted-foreground/70">Please wait a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
       <Alert variant="destructive" className="my-6">
        <Terminal className="h-4 w-4" /> {/* Adjusted size */}
        <AlertTitle className="text-base">Recommendation Error</AlertTitle>
        <AlertDescription className="text-sm">{error}</AlertDescription> {/* Added text-sm */}
      </Alert>
    );
  }

  if (!recommendations || recommendations.relatedGames.length === 0) {
    return (
      <Alert className="my-6">
        <AlertTriangle className="h-4 w-4" /> {/* Adjusted size */}
        <AlertTitle className="text-base">No Recommendations</AlertTitle>
        <AlertDescription className="text-sm">We couldn&apos;t find any specific recommendations for this game at the moment.</AlertDescription> {/* Added text-sm */}
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center text-primary tracking-tight">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.relatedGames.map((game, index) => (
          <Card key={index} className="bg-card/80 hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg text-accent">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-muted-foreground">{game.description}</CardDescription>
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
