import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Middleware para validar JWT token do Supabase
 * Extrai o token do header Authorization e valida com o Supabase
 */
export const autenticar = async (req, res, next) => {
  try {
    // 1. Extrair token do header
    const authHeader = req.headers.authorization;
    const refreshHeader = req.headers.refresh;   

    if (!authHeader || !authHeader.startsWith("Bearer ") && !refreshHeader || !refreshHeader.startsWith("Bearer ") ) {

      return res.status(401).json({ 
        erro: "Token não fornecido. Use header: Authorization: Bearer <seu_token>" 
      });
    }

    const token = authHeader.substring(7); // Remove "Bearer "
    const fresToken = refreshHeader.substring(7);

    // 2. Criar cliente Supabase com o token
    const supabaseComToken = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SECRET_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
            Refresh: `Bearer ${fresToken}`
          },
        },
      }
    );

    // 3. Validar token chamando uma query protegida
    const { data: { user }, error } = await supabaseComToken.auth.getUser();

    if (error || !user) {
      return res.status(401).json({ 
        erro: "Token inválido ou expirado",
        detalhes: error?.message 
      });
    }

    // 4. Salvar informações do usuário no request
    req.usuario = {
      id: user.id,
      email: user.email,
      token: token, // Armazenar token para usar em queries
      refresh: fresToken
    };

    // 5. Passar para o próximo middleware/rota
    next();

  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(500).json({ 
      erro: "Erro ao validar autenticação",
      detalhes: error.message 
    });
  }
};

/**
 * Validar se uma string é um UUID válido
 */
export const validarUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

/**
 * Criar cliente Supabase com token do usuário autenticado
 */
export const criarSupabaseAutenticado = (token, refresh) => {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLISHABLE_KEY,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
          Refresh: `Bearer ${refresh}`
        },
      },
    }
  );
};

