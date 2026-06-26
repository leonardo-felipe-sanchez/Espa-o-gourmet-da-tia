import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ FRONTEND (browser)
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_PUBLISHABLE_KEY  // ← Pública
);

// ✅ ADMIN (backend)
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,  // ← Privada (só backend!)
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export function criarSupabaseAutenticado(token) {
  if (!token) {
    throw new Error('Token é obrigatório para criar cliente autenticado');
  }

  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

export const { data, error } = await supabase
  .from('classes')
  .select("tipo");

export const { data: produtosData, error: produtosError } = await supabase
  .from('produtos')
  .select("id, nome, descricao, imagem, preco, tipo(tipo)");