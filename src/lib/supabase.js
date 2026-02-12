import { createClient } from '@supabase/supabase-js';

// Captura as chaves que você acabou de configurar no .env
const supabaseUrl = import.meta.env.SUPABASE_URL;
const supabaseAnonKey = import.meta.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);