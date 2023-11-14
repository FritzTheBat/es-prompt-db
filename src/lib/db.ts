import { createClient } from "@supabase/supabase-js";
import type {Database} from "$lib/database.types";
import { browser } from '$app/environment'; 

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL_REMOTE,
  import.meta.env.VITE_SUPABASE_ANON_KEY_REMOTE
);



export type Company = Database['public']['Tables']['companies']['Row']
if(browser){console.log("supabase", supabase)}