import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export const { data, error } = await supabase.from('classes').select("tipo")
export const { data: produtosData, error: produtosError } = await supabase.from('produtos').select("id, nome, descricao, imagem, preco, tipo(tipo)")

export { supabase };

//console.log(supabase.auth);

/**
 * const { data, error } = await supabase.from('classes').select()

console.log(data, error);
 */
