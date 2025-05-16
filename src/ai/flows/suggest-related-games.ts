'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting related Amstrad CPC games based on a given game title.
 *
 * - suggestRelatedGames - A function that takes a game title as input and returns a list of suggested related games.
 * - SuggestRelatedGamesInput - The input type for the suggestRelatedGames function.
 * - SuggestRelatedGamesOutput - The output type for the suggestRelatedGames function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRelatedGamesInputSchema = z.object({
  gameTitle: z.string().describe('The title of the Amstrad CPC game.'),
});
export type SuggestRelatedGamesInput = z.infer<typeof SuggestRelatedGamesInputSchema>;

const SuggestRelatedGamesOutputSchema = z.object({
  relatedGames: z.array(
    z.object({
      title: z.string().describe('The title of the related game.'),
      description: z.string().describe('A brief description of the related game.'),
    })
  ).describe('An array of related Amstrad CPC games.'),
});
export type SuggestRelatedGamesOutput = z.infer<typeof SuggestRelatedGamesOutputSchema>;

export async function suggestRelatedGames(input: SuggestRelatedGamesInput): Promise<SuggestRelatedGamesOutput> {
  return suggestRelatedGamesFlow(input);
}

const suggestRelatedGamesPrompt = ai.definePrompt({
  name: 'suggestRelatedGamesPrompt',
  input: {schema: SuggestRelatedGamesInputSchema},
  output: {schema: SuggestRelatedGamesOutputSchema},
  prompt: `You are an expert in Amstrad CPC games.

  Based on the title of the game provided, suggest 3 other related games that the user might enjoy. Provide a title and short description for each game.

  Game Title: {{{gameTitle}}}
  `,
});

const suggestRelatedGamesFlow = ai.defineFlow(
  {
    name: 'suggestRelatedGamesFlow',
    inputSchema: SuggestRelatedGamesInputSchema,
    outputSchema: SuggestRelatedGamesOutputSchema,
  },
  async input => {
    const {output} = await suggestRelatedGamesPrompt(input);
    return output!;
  }
);
