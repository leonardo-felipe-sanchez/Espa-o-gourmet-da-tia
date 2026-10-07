import { supabaseAdmin } from "../Controlador/supabase.mjs";
import { obterRoles, adicionarRole, atualizarRoles } from "../helpers/rbac.mjs";

// ============================================
// ADMIN - LOGIN
// ============================================

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
      });
    }

    const roles = await obterRoles(data.user.id);

    if (!roles.includes("admin")) {
      console.log(`❌ ${email} tentou fazer login mas não é admin`);
      return res.status(403).json({
        erro: "Este usuário não é um administrador",
        rolesDoUsuario: roles,
      });
    }

    res.json({
      msg: "Login de admin bem-sucedido!",
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
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao processar login",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - LOGOUT
// ============================================

export async function logoutAdmin(req, res) {
  try {
    const { access_token } = req.body;

    const { error } = await supabaseAdmin.auth.signOut({
      access_token,
    });

    if (error) {
      console.error("Erro ao fazer logout:", error);
      return res.status(500).json({
        erro: "Erro ao processar logout",
        detalhes: error.message,
      });
    }

    res.json({
      msg: "Logout de admin bem-sucedido!",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao processar logout",
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
    const { data: todosUsuarios, error } =
      await supabaseAdmin.auth.admin.listUsers();

    if (error) {
      return res.status(500).json({
        erro: "Erro ao listar usuários",
        detalhes: error.message,
      });
    }

    const { data: todasRegras, error: errorRegras } = await supabaseAdmin
      .from("user_roles")
      .select("*");
    if (errorRegras) {
      return res.status(500).json({
        erro: "Erro ao listar regras",
        detalhes: errorRegras.message,
      });
    }

    res.status(200).json({
      msg: "Lista de todos os usuários e suas regras",
      totalUsuarios: todosUsuarios.length,
      usuarios: todosUsuarios.users.map((user) => {
        const metadadoFIltrador = user.user_metadata || {};
        return {
          ...metadadoFIltrador,
          sub: metadadoFIltrador.sub || user.id,
          email: user.email,
          role:
            todasRegras
              .filter((r) => r.user_id === user.id)
              .map((r) => r.role) || [],
        };
      }),
      totalRegras: todasRegras.length,
    });
  } catch (error) {
    console.error("Erro no listarTodosUsuarios:", error);
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
      admin,
    } = req.body;

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

    if (cpf.length !== 11) {
      return res.status(400).json({
        erro: "CPF deve ter 11 dígitos",
      });
    }

    const { data: verificar, error: errorRegras } =
      await supabaseAdmin.auth.admin.listUsers();

    const verificarCPF = verificar.users.map((user) => {
      const metadadoFIltrador =
        user.user_metadata.cpf !== undefined &&
        user.user_metadata.cpf.indexOf(cpf) !== -1
          ? true
          : false;
      console.log(
        "verificarCPF:",
        metadadoFIltrador,
        "user:",
        user.email,
        "cpf:",
        user.user_metadata.cpf,
      );
      return metadadoFIltrador;
    });

    if (verificarCPF.includes(true)) {
      return res.status(400).json({
        erro: "CPF já cadastrado",
      });
    }

    const verificarEmail = verificar.users.map((user) => {
      const emailsFIltrador = user.email.indexOf(email) !== -1 ? true : false;
      return emailsFIltrador;
    });

    if (verificarEmail.includes(true)) {
      return res.status(400).json({
        erro: "Email já cadastrado",
      });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      user_metadata: {
        nome: nome,
        cpf: cpf,
        idade: idade,
        genero: genero,
        telefone: telefone,
        endereco: `${rua} - ${numero} - ${complemento} - ${cep} - ${pontoReferencia} - ${bairro} - ${cidade}`,
      },
    });

    if (error) {
      return res.status(400).json({
        erro: error.message,
      });
    }

    if (admin === "admin") {
      await adicionarRole(data.user.id, "admin", cpf, email);
    } else {
      await adicionarRole(data.user.id, "user", cpf, email);
    }

    res.status(201).json({
      msg: "Usuário criado com sucesso!",
      usuario: {
        id: data.user.id,
        email: data.user.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao registrar usuário",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - EDITAR USUARIO
// ============================================

export async function editarUsuarioAdmin(req, res) {
  try {
    const { id, nome, telefone, cep, rua, numero, complemento, pontoReferencia, bairro, cidade, roles, cpf, email, senha } = req.body;

    if (senha && senha?.length < 6) {
      return res.status(400).json({
        erro: "Senha deve ter no mínimo 6 caracteres",
      });
    }

    const { data: usuarioExistente, error: errorUsuario } = await supabaseAdmin.auth.admin.getUserById(id);

    if (errorUsuario) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
        detalhes: errorUsuario.message,
      });
    }

    if (email) {
      const { error: errorEmail } = await supabaseAdmin.auth.admin.updateUserById(id, {
        email: email,
      });

      if (errorEmail) {
        return res.status(500).json({
          erro: "Erro ao atualizar email do usuário",
          detalhes: errorEmail.message,
        });
      }
    }

    if (senha) {
      const { error: errorSenha } = await supabaseAdmin.auth.admin.updateUserById(id, {
        password: senha,
      });

      if (errorSenha) {
        return res.status(500).json({
          erro: "Erro ao atualizar senha do usuário",
          detalhes: errorSenha.message,
        });
      }
    }

    if (roles) {
      const rolesExistentes = await obterRoles(id);

      let atualizacao;
      if (rolesExistentes.length > 0) {
        atualizacao = await atualizarRoles(id, roles, cpf, email);
      } else {
        atualizacao = await adicionarRole(id, roles, cpf, email);
      }

      if (!atualizacao) {
        return res.status(500).json({
          erro: "Erro ao atualizar roles do usuário",
        });
      } else if (Array.isArray(atualizacao) && atualizacao[0] === 23505) {
        return res.status(409).json({
          msg: `Conflito: ${atualizacao[1]} já existe para outro usuário`,
        });
      }
    }

    const splitador = usuarioExistente.user.user_metadata?.endereco?.split(" - ") || [];
    const enderecoAtual = {
      rua: splitador[0] || "",
      numero: splitador[1] || "",
      complemento: splitador[2] || "",
      cep: splitador[3] || "",
      pontoReferencia: splitador[4] || "",
      bairro: splitador[5] || "",
      cidade: splitador[6] || "",
    };

    const { data, error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      user_metadata: {
        nome: nome || usuarioExistente.user.user_metadata?.nome,
        telefone: telefone || usuarioExistente.user.user_metadata?.telefone,
        endereco: `${rua || enderecoAtual.rua} - ${numero || enderecoAtual.numero} - ${complemento || enderecoAtual.complemento} - ${cep || enderecoAtual.cep} - ${pontoReferencia || enderecoAtual.pontoReferencia} - ${bairro || enderecoAtual.bairro} - ${cidade || enderecoAtual.cidade}`,
        cpf: cpf || usuarioExistente.user.user_metadata?.cpf,
      },
    });

    if (error) {
      return res.status(500).json({
        erro: "Erro ao atualizar usuário",
        detalhes: error.message,
      });
    }

    return res.status(200).json({
      msg: "Usuário atualizado com sucesso!",
      usuario: data,
      roles: roles || [],
    });

  } catch (error) {
    console.error("Erro ao editar usuário:", error);
    return res.status(500).json({
      erro: "Erro ao editar usuário",
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
    const { id } = req.body;

    const { error: erroDelete } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (erroDelete) {
      console.error("Erro ao deletar usuário:", erroDelete);
      return res.status(400).json({
        erro: "Erro ao deletar usuário",
        detalhes: erroDelete.message,
      });
    }
    res.status(200).json({
      msg: "Usuário deletado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar usuário",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - EDITAR PEDIDO
// ============================================

/**
 * get /api/admin/pedidos/
 * Requer: autenticar + verificarAdmin
 */

export async function listaPedidosAdmin(req, res) {
  try {
    const { data: todosPedidos, error } = await supabaseAdmin
      .from("pedidos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        erro: "Erro ao listar pedidos",
        detalhes: error.message,
      });
    }

    res.status(200).json({
      msg: "Lista de todos os pedidos",
      total: todosPedidos.length,
      pedidos: todosPedidos,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar pedido",
      detalhes: error.message,
    });
  }
}

/**
 * PATCH /api/admin/pedidos/:id
 * Requer: autenticar + verificarAdmin
 */

export async function editarPedidoAdmin(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

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
    res.status(500).json({
      erro: "Erro ao editar pedido",
      detalhes: error.message,
    });
  }
}

// ============================================
// ADMIN - DELETAR PEDIDO
// ============================================

export async function deletarPedidoAdmin(req, res) {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from("pedidos")
      .select("*")
      .eq("id", id)
      .select()
      .single();

    if (error) {
	
	return res.status(404).json({
        erro: "pedido não encontrado",
      });

	};

	if (data.usuario_id !== id) {
      return res.status(403).json({
        erro: "Você não pode deletar um pedido que não é seu",
      });
    }
	
    const { error: erroDelete } = await supabaseAutenticado
      .from("pedidos")
      .delete()
      .eq("id", id);
	}
	catch(error){
	return res.status(500).json({
      erro: "Erro interno ao deletar pedido",
      detalhes: error.message,
    });
	}
   
  } 