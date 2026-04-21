import { createClient } from '@supabase/supabase-js'

export const useMock = !process.env.SUPABASE_URL || process.env.SUPABASE_URL.includes('xxxx')

export const supabase = useMock
  ? null
  : createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)
