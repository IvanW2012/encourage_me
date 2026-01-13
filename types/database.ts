// This file will be auto-generated when you generate types from Supabase
// For now, this is a placeholder. Run the following command to generate types:
// npx supabase gen types typescript --project-id YOUR_PROJECT_ID > types/database.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      thoughts: {
        Row: {
          id: string
          content: string
          encouragement: string | null
          created_at: string
        }
        Insert: {
          id?: string
          content: string
          encouragement?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          content?: string
          encouragement?: string | null
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
