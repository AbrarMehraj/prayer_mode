import { createClient } from "@supabase/supabase-js";

// Supabase browser client – reads from public env vars
// Make sure you set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;


export const supabase = createClient(supabaseUrl, supabaseAnonKey);

