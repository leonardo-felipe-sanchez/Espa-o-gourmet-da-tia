import { verificarAdmin } from '../verificacao.js';
import { supabaseAdmin } from '../Controlador/supabase.mjs';
import { obterRoles } from '../helpers/rbac.mjs';

// ============================================
// ADMIN - LOGIN
// ============================================

/**
 * POST /admin/usuario/login
 * Faz login como admin (verifica se é realmente admin)
 */
export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    // 1. Autenticar
    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ 
        erro: 'Email ou senha inválidos' 
      });
    }

    // 2. NOVO: Usar obterRoles ao invés de .single()
    const roles = await obterRoles(data.user.id);

    console.log(`✅ Admin ${email} autenticado. Roles:`, roles);

    // 3. Verificar se tem role admin
    if (!roles.includes('admin')) {
      console.log(`❌ ${email} tentou fazer login mas não é admin`);
      return res.status(403).json({
        erro: 'Este usuário não é um administrador',
        rolesDoUsuario: roles,
      });
    }

    // 4. OK - Retornar
    res.json({
      msg: 'Login de admin bem-sucedido!',
      usuario: {
        id: data.user.id,
        email: data.user.email,
        roles: roles,
      },
      tokens: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
      },
    });

    console.log(`✅ Admin ${email} logado com sucesso`);

  } catch (error) {
    console.error('Erro no login admin:', error);
    res.status(500).json({
      erro: 'Erro ao processar login',
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - LISTAR TODOS OS USUÁRIOS
// ============================================

/**
 * GET /api/admin/usuarios
 * Requer: autenticar + verificarAdmin
 */
export async function listarTodosUsuarios(req, res) {
  try {
    // verificarAdmin já verificou, agora é seguro!
    console.log("✅ Admin", req.admin.email, "listando usuários");

    const { data: todosUsuarios, error } = await supabaseAdmin
      .from("usuarios")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({
      msg: "Lista de todos os usuários",
      total: todosUsuarios.length,
      usuarios: todosUsuarios,
    });

  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({
      erro: "Erro ao listar usuários",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - LISTAR TODOS OS BOLOS
// ============================================

/**
 * GET /api/admin/bolos
 * Requer: autenticar + verificarAdmin
 */
export async function listarTodosBolos(req, res) {
  try {
    console.log("✅ Admin", req.admin.email, "listando bolos");

    const { data: todosBolos, error } = await supabaseAdmin
      .from("bolos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({
      msg: "Lista de todos os bolos",
      total: todosBolos.length,
      bolos: todosBolos,
    });

  } catch (error) {
    console.error("Erro ao listar bolos:", error);
    res.status(500).json({
      erro: "Erro ao listar bolos",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - REGISTRAR NOVO USUÁRIO
// ============================================

/**
 * POST /api/admin/usuario/registrar
 * Requer: autenticar + verificarAdmin
 * Admin cria novo usuário
 */
export async function registrarNovoUsuario(req, res) {
  try {
    const {
      email,
      password,
      confirmPassword,
      nome,
      cpf,
      idade,
      genero,
      telefone,
      cep,
      rua,
      numero,
      complemento,
      pontoReferencia,
      bairro,
      cidade,
      admin, // ← opcional, se quiser criar outro admin
    } = req.body;

    console.log("✅ Admin", req.admin.email, "registrando novo usuário:", email);

    // 1. Validações
    if (
      !email ||
      !password ||
      !confirmPassword ||
      !nome ||
      !cpf ||
      !idade ||
      !genero ||
      !telefone ||
      !cep ||
      !rua ||
      !numero ||
      !pontoReferencia ||
      !bairro ||
      !cidade ||
      !admin
    ) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        erro: "Senhas não conferem",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        erro: "Senha deve ter no mínimo 6 caracteres",
      });
    }

    // 2. Criar usuário no Supabase
    const { data, error } = await supabaseAdmin.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nome: nome,
          cpf: cpf,
          idade: idade,
          genero: genero,
          telefone: telefone,
          endereco: `${rua}, ${numero} - ${complemento} - ${cep} - ${pontoReferencia} - ${bairro} - ${cidade}`,
          is_super_admin: admin === "sim" ? true : false, // ← se admin for "sim", então true, senão false
        },
      },
    });

    if (error) {
      console.error("Erro ao registrar:", error);
      return res.status(400).json({
        erro: error.message,
      });
    }

    res.status(201).json({
      msg: "Usuário criado com sucesso!",
      usuario: {
        id: data.user.id,
        email: data.user.email,
      },
    });

    console.log("✅ Novo usuário registrado:", email);

  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({
      erro: "Erro ao registrar usuário",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - EDITAR PEDIDO
// ============================================

/**
 * PATCH /api/admin/pedidos/:id
 * Requer: autenticar + verificarAdmin
 */
export async function editarPedidoAdmin(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("✅ Admin", req.admin.email, "editando pedido:", id);

    if (!status) {
      return res.status(400).json({ erro: "Status é obrigatório" });
    }

    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      msg: "Pedido atualizado com sucesso!",
      pedido: data,
    });

  } catch (error) {
    console.error("Erro ao editar pedido:", error);
    res.status(500).json({
      erro: "Erro ao editar pedido",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - DELETAR USUÁRIO
// ============================================

/**
 * DELETE /api/admin/usuarios/:id
 * Requer: autenticar + verificarAdmin
 */
export async function deletarUsuarioAdmin(req, res) {
  try {
    const { id } = req.params;

    console.log("✅ Admin", req.admin.email, "deletando usuário:", id);

    // Deletar dados do usuário
    const { error: erroDelete } = await supabaseAdmin
      .auth.admin.deleteUser(id);

    if (erroDelete) {
      console.error("Erro ao deletar usuário:", erroDelete);
      return res.status(400).json({
        erro: "Erro ao deletar usuário",
        detalhes: erroDelete.message,
      });
    }

    // Deletar conta de auth (opcional - pode deixar bloqueada)
    // await supabaseAdmin.auth.admin.deleteUser(id);

    res.status(200).json({
      msg: "Usuário deletado com sucesso!",
    });

  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({
      erro: "Erro ao deletar usuário",
      detalhes: error.message,
    });
  }
}
