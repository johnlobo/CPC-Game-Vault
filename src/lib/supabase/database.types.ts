
// This file should ideally be auto-generated by Supabase CLI: supabase gen types typescript > src/lib/supabase/database.types.ts
// This is a manually defined structure based on the Game interface.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      games: {
        Row: {
          id: string // Primary Key
          title: string
          description: string
          coverImage: string
          screenshots: string[] // Stored as text[] in Supabase
          rvmGameId: string
          diskUrl: string
          emulatorCommand: string
          genre: string
          year: number
          developer: string
          publisher: string
          status: "finished" | "wip"
          display_order?: number // New field for ordering
          created_at?: string // Handled by Supabase (e.g., default now())
        }
        Insert: {
          id: string // Must be provided by the client
          title: string
          description: string
          coverImage: string
          screenshots: string[]
          rvmGameId: string
          diskUrl: string
          emulatorCommand: string
          genre: string
          year: number
          developer: string
          publisher: string
          status: "finished" | "wip"
          display_order?: number // New field
          created_at?: string // Optional, Supabase can handle
        }
        Update: {
          id?: string // Should not change usually
          title?: string
          description?: string
          coverImage?: string
          screenshots?: string[]
          rvmGameId?: string
          diskUrl?: string
          emulatorCommand?: string
          genre?: string
          year?: number
          developer?: string
          publisher?: string
          status?: "finished" | "wip"
          display_order?: number // New field
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper type for Game, assuming it mirrors the 'games' table Row
export type GameRow = Database['public']['Tables']['games']['Row']

