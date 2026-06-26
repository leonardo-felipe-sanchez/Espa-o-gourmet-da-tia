import { criarSupabaseAutenticado } from './Controlador/supabase.mjs';

export async function verificarAdmin(req, res, next) {
  try {
    // 1. Usuário já foi autenticado pelo middleware anterior?
    if (!req.usuario || !req.usuario.id) {
      return res.status(401).json({ 
        erro: "Usuário não autenticado" 
      });
    }

    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;

    // 2. Criar cliente autenticado
    const supabaseAutenticado = criarSupabaseAutenticado(tokenUsuario);

    // 3. Buscar dados do usuário na tabela
    const { data: usuarioLogado, error } = await supabaseAutenticado
      .from("usuarios")
      .select("*")
      .eq("id", idUsuario)
      .single();

    if (error) {
      console.error("Erro ao buscar usuário:", error);
      return res.status(500).json({ 
        erro: "Erro ao verificar permissões",
        detalhes: error.message 
      });
    }

    // 4. Verificar se é admin
    if (!usuarioLogado || !usuarioLogado.is_admin) {
      return res.status(403).json({ 
        erro: "Acesso negado. Apenas administradores podem acessar esta rota.",
        usuario: usuarioLogado?.email
      });
    }

    // 5. Passar dados do admin para a próxima função
    req.admin = {
      id: usuarioLogado.id,
      email: usuarioLogado.email,
      is_admin: true,
    };

    next();

  } catch (error) {
    console.error("Erro no middleware verificarAdmin:", error);
    res.status(500).json({ 
      erro: "Erro ao verificar permissões",
      detalhes: error.message 
    });
  }
}