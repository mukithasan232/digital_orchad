import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Gracefully handle missing ENV variables in development to prevent hard crashes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy';
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}
