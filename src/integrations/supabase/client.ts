import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://ofwqkiaowczhfpxcnzei.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9md3FraWFvd2N6aGZweGNuemVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTM4MDcsImV4cCI6MjA2MTE2OTgwN30.bCaJStobp80yilhEEg_Eiwjw4DUMa1pNW1tufF_V7DA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);