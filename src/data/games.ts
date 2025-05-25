
import { createClient } from '@/lib/supabase/client'; // Using client for broader compatibility, server for initial loads
import type { Database } from '@/lib/supabase/database.types';

// Define Game interface consistent with Supabase table
export interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  screenshots: string[];
  rvmGameId: string;
  diskUrl: string;
  emulatorCommand: string;
  genre: string;
  year: number;
  developer: string;
  publisher: string;
  status: 'finished' | 'wip';
  display_order?: number; // Added display_order
  created_at?: string; // Optional, matching Supabase schema
}

// The local 'games' array is no longer the primary source of truth.
// It can be removed or kept for seeding/backup if needed.
// For this integration, we will fetch directly from Supabase.

export const getGames = async (): Promise<Game[]> => {
  const supabase = createClient(); // Use the client-side helper for now
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .order('display_order', { ascending: true, nullsFirst: false }) // Order by display_order
    .order('title', { ascending: true }); // Secondary sort by title

  if (error) {
    console.error('Error fetching games from Supabase:', error);
    return []; // Return empty array on error or throw
  }
  // Ensure display_order is a number, default to 0 if null/undefined from DB
  return (data as Game[] || []).map(game => ({
    ...game,
    display_order: game.display_order ?? 0,
  }));
};

export const getGameById = async (id: string): Promise<Game | undefined> => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    // PGRST116 means no rows found, which is a valid case for "not found"
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching game with id ${id} from Supabase:`, error);
    }
    return undefined;
  }
  const gameData = data as Game || undefined;
  if (gameData) {
    return {
      ...gameData,
      display_order: gameData.display_order ?? 0,
    };
  }
  return undefined;
};

