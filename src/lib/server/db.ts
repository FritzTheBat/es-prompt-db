import type { Database } from "$lib/database.types";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_SERVICE_KEY
  );
  

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']