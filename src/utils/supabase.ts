import { createClient } from '@supabase/supabase-js'

// Supabase URL과 키 (환경변수에서 가져오기, fallback으로 하드코딩된 값 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rnoqoxgokmkdwnijkflm.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJub3FveGdva21rZHduaWprZmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwMjM0NzMsImV4cCI6MjA2OTU5OTQ3M30.LE6xnuVBQy9NHqChSzp1cmm7QFxDbgLd6x2hDLBr_-4'

// Supabase 클라이언트 생성
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for type safety
export interface Database {
  public: {
    Tables: {
      memos: {
        Row: {
          id: string
          title: string
          content: string
          category: string
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category: string
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category?: string
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Typed Supabase client
export const supabaseTyped = createClient<Database>(supabaseUrl, supabaseAnonKey)