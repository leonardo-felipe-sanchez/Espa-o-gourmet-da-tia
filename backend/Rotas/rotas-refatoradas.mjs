import pkg from "express";
import { supabase } from "../Controlador/supabase.mjs";
import { data, error } from "../Controlador/supabase.mjs";
import { produtosData, produtosError } from "../Controlador/supabase.mjs";
import pkg2 from "multer";
const multer = pkg2;
import { Dados } from "../Controlador/Controlador.js";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import {
  autenticar,
  validarUUID,
  criarSupabaseAutenticado,
} from "../helpers/middleware-autenticacao.mjs";
import { supabaseAdmin } from "../Controlador/supabase.mjs";
import * as admin from "./rotas-admin-REFATORADAS.mjs";
import { verificarRole } from "../helpers/verificarRole.mjs";

dotenv.config();

const rotear = pkg.Router();

rotear.post("/contact", Dados);

const classe = [];

data.forEach((item) => {
  classe.push(item.tipo);
});

const produtos = produtosData;

const armazenamento = multer.memoryStorage();
const atualizar = multer({ storage: armazenamento });

// ============================================
// ROTAS DE PRODUTOS
// ============================================

rotear.get("/produtos", async (req, res) => {
  try {
    res
      .status(200)
      .json({ msg: "retornar todas as classes e produtos", classe, produtos });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

rotear.post(
  "/produtos",
  atualizar.single("imagem"),
  verificarRole("admin"),
  async (req, res) => {
    try {
      const { nome, classinha, preco, descricao } = req.body;

      const nomeDoArquivo = req.file.filename;

      const novoId =
        produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;

      const { data: uploadData, error: uploadError } =
        await supabaseAdmin.storage
          .from("produtos")
          .upload(`imagens/${nomeDoArquivo}`, req.file.buffer, {
            contentType: req.file.mimetype,
            cacheControl: "3600",
            upsert: true,
          });

      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = await supabaseAdmin.storage
        .from("produtos")
        .getPublicUrl(`imagens/${nomeDoArquivo}`);

      if (urlError) throw urlError;

      const urlPublicaDaImagem = urlData.publicUrl;

      const novoProduto = {
        id: novoId,
        nome: nome,
        imagem: urlPublicaDaImagem,
        tipo: {
          tipo: classinha,
        },
        preco: 0.0,
        descricao: descricao || "",
      };

      if (preco) novoProduto.preco = preco;

      produtos.push(novoProduto);

      const classeParaNumero = await supabaseAdmin
        .from("classes")
        .select("id")
        .eq("tipo", classinha)
        .single();
      const { data, error } = await supabaseAdmin
        .from("produtos")
        .insert({
          nome: nome,
          imagem: urlPublicaDaImagem,
          tipo: classeParaNumero.data.id,
          preco: parseFloat(preco) || 0.0,
          descricao: descricao || "",
        })
        .select();

      if (error) throw error;

      res.status(201).json({
        msg: `Produto ${nome} criado com sucesso!`,
        produto: data,
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },
);

rotear.get("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const produto = produtos.find((p) => p.id === parseInt(id));
    const categorias = classe;
    if (!produto)
      return res.status(404).json({ msg: "produto não encontrado" });

    res.json({ produto, categorias });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

rotear.patch(
  "/produtos/:id",
  verificarRole("admin"),
  atualizar.single("imagem"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, classinha, preco, descricao } = req.body;
      const produto = produtos.find((p) => p.id === parseInt(id));

      const caminhoArquivo = produto.imagem.split("/");

      const dadosParaAtualizar = {};

      if (nome) dadosParaAtualizar.nome = nome;
      produto.nome = nome || produto.nome;

      if (preco) dadosParaAtualizar.preco = preco;
      produto.preco = preco || produto.preco;

      if (descricao) dadosParaAtualizar.descricao = descricao;
      produto.descricao = descricao || produto.descricao;

      if (classinha) {
        const classeParaNumero = await supabaseAdmin
          .from("classes")
          .select("id")
          .eq("tipo", classinha)
          .single();

        if (classeParaNumero.error) throw classeParaNumero.error;

        dadosParaAtualizar.tipo = classeParaNumero.data.id;
      }

      produto.tipo.tipo = classinha || produto.tipo.tipo;

      if (req.file) {
        const nomeDoArquivo = req.file;

        const { data: removerdata, error: removererror } =
          await supabaseAdmin.storage
            .from("produtos")
            .remove([`${caminhoArquivo[8]}/${caminhoArquivo[9]}`]);

        if (removererror) throw removererror;

        const { data: uploadData, error: uploadError } =
          await supabaseAdmin.storage
            .from("produtos")
            .upload(`imagens/${nomeDoArquivo.originalname}`, req.file.buffer, {
              contentType: req.file.mimetype,
              cacheControl: "3600",
              upsert: true,
            });

        if (uploadError) throw uploadError;

        const { data: urlData, error: urlError } = await supabaseAdmin.storage
          .from("produtos")
          .getPublicUrl(`imagens/${nomeDoArquivo.originalname}`);

        if (urlError) throw urlError;

        dadosParaAtualizar.imagem = urlData.publicUrl;
        produto.imagem = nomeDoArquivo ? urlData.publicUrl : produto.imagem;
      }

      const { data, error } = await supabaseAdmin
        .from("produtos")
        .update(dadosParaAtualizar)
        .eq("id", id)
        .select()
        .single();

      if (!produto) {
        return res.status(404).json({ msg: "Produto não encontrado" });
      }

      res.status(200).json({
        msg: "Produto atualizado com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },
);

rotear.delete("/produtos/:id", verificarRole("admin"), async (req, res) => {
  try {
    const { id } = req.params;

    const index = produtos.findIndex((p) => p.id === parseInt(id));

    if (index === -1)
      return res.status(404).json({ msg: "produto não encontrado" });

    produtos.splice(index, 1);

    const { data: removeData, error: removeError } = await supabaseAdmin.storage
      .from("produtos")
      .remove([`imagens/${caminhoArquivo[8]}/${caminhoArquivo[9]}`]);

    if (removeError) throw removeError;

    const { data, error } = await supabaseAdmin
      .from("produtos")
      .delete()
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) throw error;

    res.status(200).json({ msg: `Produto deletado` });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ============================================
// ROTA DE CLASSE
// ============================================

// ============================================
// SIGNUP - REGISTRAR NOVO USUÁRIO
// ============================================

rotear.post("/usuario/registrar", atualizar.none(), async (req, res) => {
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
      !cidade
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

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error.code === "user_already_exists") {
        return res.status(400).json({
          erro: "Usuário já registrado com este email",
        });
      }

      return res.status(400).json({
        erro: error.message,
        code: error.code,
      });
    }

    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: data.user.id,
      role: "user",
      cpf: cpf,
      email: email,
    });

    if (roleError) {
      const { error: roleError2 } = await supabase.from("user_roles").insert({
        user_id: data.user.id,
        role: "user",
        email: email,
      });

      if (roleError2) {
        return res.status(400).json({
          erro: "falhou bonito",
          descricao: roleError.message,
        });
      }

      const { error: optionError } = await supabase.auth.updateUser({
        data: {
          nome: nome,
          idade: idade,
          genero: genero,
          telefone: telefone,
          endereco: `${rua} - ${numero} - ${complemento} - ${cep} - ${pontoReferencia} - ${bairro} - ${cidade}`,
        },
      });

      if (roleError.code === "23505") {
        return res.status(400).json({
          erro: "CPF ou email já registrado",
        });
      }

      return res.status(500).json({
        erro: "Erro ao atribuir role ao usuário",
        detalhes: roleError.message,
      });
    }

    const { error: optionError } = await supabase.auth.updateUser({
      data: {
        nome: nome,
        cpf: cpf,
        idade: idade,
        genero: genero,
        telefone: telefone,
        endereco: `${rua} - ${numero} - ${complemento} - ${cep} - ${pontoReferencia} - ${bairro} - ${cidade}`,
      },
    });

    if (optionError) {
      return res.status(500).json({
        erro: "Erro ao atualizar usuário",
        detalhes: optionError.message,
      });
    }

    return res.status(201).json({
      msg: "Usuário criado com sucesso!",
      usuario: {
        id: data.user.id,
        email: data.user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao registrar usuário",
      detalhes: error.message,
    });
  }
});

rotear.post(
  "/admin/usuario/registrar",
  autenticar,
  verificarRole("admin"),
  admin.registrarNovoUsuario,
);

// ============================================
// AUTENTICAÇÃO - LOGIN
// ============================================

rotear.post("/usuario", atualizar.none(), async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      return res.status(401).json({
        erro: "Email ou senha inválidos",
        detalhes: error.message,
      });
    }

    const userId = data.user.id;
    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;

    res.status(200).json({
      msg: "Login bem-sucedido!",
      usuario: {
        id: userId,
        email: data.user.email,
      },
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao processar login",
      detalhes: error.message,
    });
  }
});

rotear.post("/admin/usuario/login", admin.loginAdmin);

// ============================================
// AUTENTICAÇÃO - LOGOUT
// ============================================

rotear.post("/admin/usuario/logout", autenticar, admin.logoutAdmin);

rotear.post("/usuario/logout", atualizar.none(), async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      return res.status(500).json({
        erro: "Erro ao processar logout",
        detalhes: error.message,
      });
    }

    res.status(200).json({ msg: "Logout bem-sucedido!" });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao processar logout",
      detalhes: error.message,
    });
  }
});

// ============================================
// GERENCIAR USUARIO LOGADO
// ============================================

rotear.patch("/usuario/", autenticar, async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    if (!validarUUID(idUsuarioLogado)) {
      return res.status(400).json({
        erro: "ID de usuário inválido",
      });
    }

    const {
      id,
      nome,
      telefone,
      cep,
      rua,
      numero,
      complemento,
      pontoReferencia,
      bairro,
      cidade,
      cpf,
      email,
      senha,
    } = req.body;

    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data: usuarioExistente, error: errorExistente } =
      await supabaseAutenticado.auth.getUser();

    if (errorExistente) {
      return res.status(404).json({
        erro: "Usuário não encontrado",
        detalhes: errorUsuario.message,
      });
    }

    const splitador =
      usuarioExistente.user.user_metadata?.endereco?.split(" - ") || [];
    const enderecoAtual = {
      rua: splitador[0] || "",
      numero: splitador[1] || "",
      complemento: splitador[2] || "",
      cep: splitador[3] || "",
      pontoReferencia: splitador[4] || "",
      bairro: splitador[5] || "",
      cidade: splitador[6] || "",
    };

    const { error: errorSession } = await supabaseAutenticado.auth.setSession({
      access_token: tokenUsuario,
      refresh_token: tokenRefresh,
    });

    if (errorSession) {
      return res.status(500).json({
        erro: "Erro na sessão",
        detalhes: errorSession,
      });
    }

    if (email || cpf || senha) {
      if (email) {
        const { data: emailData, error: dataError } =
          await supabaseAutenticado.auth.updateUser({
            email: email,
          });

        if (dataError) {
          return res.status(500).json({
            erro: "erro ao atualizar o email",
            detalhes: dataError.message,
          });
        }

        const { data: roleEmailData, error: roleEmailError } =
          await supabaseAutenticado
            .from("user_roles")
            .update({
              email: email,
            })
            .eq("user_id", idUsuarioLogado)
            .select();

        if (roleEmailError) {
          return res.status(500).json({
            erro: "erro ao atualizar o email",
            detalhes: roleEmailError.message,
          });
        }
      }
      if (cpf) {
        const { data: cpfData, error: cpfError } =
          await supabaseAutenticado.auth.updateUser({
            data: {
              cpf: cpf,
            },
          });

        if (cpfError) {
          return res.status(500).json({
            erro: "erro ao atualizar o email",
            detalhes: cpfError.message,
          });
        }

        const { data: roleCPFData, error: roleCPFError } =
          await supabaseAutenticado
            .from("user_roles")
            .update({
              cpf: cpf,
            })
            .eq("user_id", usuarioExistente.user.id)
            .select();

        if (roleCPFError) {
          return res.status(500).json({
            erro: "erro ao atualizar o CPF",
            detalhes: roleCPFError.message,
          });
        }
      }
      if (senha) {
        const { data: senhaData, error: dataError } =
          await supabaseAutenticado.auth.updateUser({
            password: senha,
          });

        if (dataError) {
          return res.status(500).json({
            erro: "erro ao atualizar a senha",
            detalhes: dataError.message,
          });
        }
      }
    }

    const { data: usuarioData, error: usuarioError } =
      await supabaseAutenticado.auth.updateUser({
        data: {
          nome: nome || usuarioExistente.user.user_metadata?.nome,
          telefone: telefone || usuarioExistente.user.user_metadata?.telefone,
          endereco: `${rua || enderecoAtual.rua} - ${numero || enderecoAtual.numero} - ${complemento || enderecoAtual.complemento} - ${cep || enderecoAtual.cep} - ${pontoReferencia || enderecoAtual.pontoReferencia} - ${bairro || enderecoAtual.bairro} - ${cidade || enderecoAtual.cidade}`,
        },
      });

    if (usuarioError) {
      return res.status(500).json({
        erro: "Erro ao atualizar usuário",
        detalhes: usuarioError.message,
      });
    }

    return res.status(200).json({
      msg: "Usuário atualizado com sucesso!",
      usuario: data,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro ao editar usuário",
      detalhes: error.message,
    });
  }
});

// ============================================
// ADMIN - GERENCIAR TODOS OS USUÁRIOS (apenas admin)
// ============================================

rotear.get(
  "/admin/usuarios",
  autenticar,
  verificarRole("admin"),
  admin.listarTodosUsuarios,
);

rotear.patch(
  "/admin/usuarios/editar",
  autenticar,
  verificarRole("admin"),
  admin.editarUsuarioAdmin,
);

rotear.delete(
  "/admin/usuarios/deletar",
  autenticar,
  verificarRole("admin"),
  admin.deletarUsuarioAdmin,
);

// ============================================
// ADMIN - LISTAR TODOS OS BOLOS (apenas admin)
// ============================================

rotear.get(
  "/admin/bolos",
  autenticar,
  verificarRole("admin"),
  admin.listarTodosBolos,
);

// ============================================
// ROTA ADMIN PEDIDOS
// ============================================

rotear.get(
  "/admin/pedidos",
  autenticar,
  verificarRole("admin"),
  admin.listaPedidosAdmin,
);

rotear.patch(
  "/admin/pedidos/:id",
  autenticar,
  verificarRole("admin"),
  admin.editarPedidoAdmin,
);

rotear.delete(
  "/admin/pedidos/:id",
  autenticar,
  verificarRole("admin"),
  admin.deletarPedidoAdmin,
);

// ============================================
// BOLO PERSONALIZADO - CRIAR (REFATORADO COM JWT)
// ============================================

rotear.post(
  "/bolo-personalizado",
  autenticar,
  atualizar.fields([{ name: "imagem" }, { name: "topper" }]),
  async (req, res) => {
    try {
      const idUsuarioLogado = req.usuario.id;
      const tokenUsuario = req.usuario.token;
      const tokenRefresh = req.usuario.refresh;

      if (!validarUUID(idUsuarioLogado)) {
        return res.status(400).json({
          erro: "ID de usuário inválido",
        });
      }

      const {
        peso,
        forma,
        massa,
        recheio,
        cobertura,
        tema,
        descricao,
        detalhamentoTopper,
      } = req.body;

      if (!peso || !forma || !massa || !recheio || !cobertura) {
        return res.status(400).json({
          erro: "Campos obrigatórios faltando: peso, forma, massa, recheio, cobertura",
        });
      }

      var nomeDoArquivoImagem = req.files?.["imagem"]?.[0];
      var nomeDoArquivoTopper = req.files?.["topper"]?.[0];

      let caminhoBoloImagem = "imagens/padrao.jpg";

      if (nomeDoArquivoImagem) {
        const { data: boloData, error: boloError } = await supabase.storage
          .from("usuario")
          .upload(
            `imagens/bolo/${Date.now()}-${nomeDoArquivoImagem.originalname}`,
            nomeDoArquivoImagem.buffer,
            {
              contentType: nomeDoArquivoImagem.mimetype,
              cacheControl: "3600",
              upsert: true,
            },
          );

        if (boloError) throw boloError;
        caminhoBoloImagem = boloData.path;
      }

      let caminhoTopperImagem = "imagens/padrao.jpg";

      if (nomeDoArquivoTopper) {
        const { data: topperData, error: topperError } = await supabase.storage
          .from("usuario")
          .upload(
            `imagens/topper/${Date.now()}-${nomeDoArquivoTopper.originalname}`,
            nomeDoArquivoTopper.buffer,
            {
              contentType: nomeDoArquivoTopper.mimetype,
              cacheControl: "3600",
              upsert: true,
            },
          );

        if (topperError) throw topperError;
        caminhoTopperImagem = topperData.path;
      }

      const supabaseAutenticado = criarSupabaseAutenticado(
        tokenUsuario,
        tokenRefresh,
      );

      const { data, error } = await supabaseAutenticado
        .from("bolos")
        .insert({
          peso: parseInt(peso),
          forma: forma,
          massa: massa,
          recheio: recheio,
          cobertura: cobertura,
          tema: tema || "",
          bolo_imagem: caminhoBoloImagem,
          topper_imagem: caminhoTopperImagem,
          descricao: descricao || "",
          detalhamento_topper: detalhamentoTopper || "",
          dono_do_bolo: idUsuarioLogado,
        })
        .select();

      if (error) {
        return res.status(403).json({
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });

        if (error.code === "PGRST301") {
          return res.status(403).json({
            erro: "Erro de permissão. Verifique se as RLS policies estão corretas.",
            detalhes: error.message,
          });
        }

        throw error;
      }

      res.status(201).json({
        msg: "Bolo recebido com sucesso!",
        bolo: data[0],
      });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao criar bolo",
        detalhes: error.message,
      });
    }
  },
);

// ============================================
// LISTAR BOLOS DO USUÁRIO LOGADO
// ============================================

rotear.get("/meus-bolos", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;
    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data, error } = await supabaseAutenticado
      .from("bolos")
      .select("*")
      .eq("dono_do_bolo", idUsuario)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        erro: "houve um erro" + error,
      });
    }

    const bolos = data.map((bolo) => [bolo.bolo_imagem]);

    const topper = data.map((topper) => [topper.topper_imagem]);

    const { data: dataBolo, error: errorBolo } =
      await supabaseAutenticado.storage
        .from("usuario")
        .createSignedUrls(bolos, 600000);
    const { data: dataTopper, error: errorTopper } =
      await supabaseAutenticado.storage
        .from("usuario")
        .createSignedUrls(topper, 600000);

    if (errorBolo) {
      return res.status(500).json({
        erro: "houve um erro" + errorBolo,
        status: errorBolo.status,
      });
    }

    if (errorTopper) {
      return res.status(500).json({
        erro: "houve um erro" + errorTopper,
      });
    }

    res.status(200).json({
      msg: "Bolos do usuário",
      total: data.length,
      bolos: {
        bolo: data,
        bolo_imagem: dataBolo,
        topper_imagem: dataTopper,
      },
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar bolos",
      detalhes: error.message,
    });
  }
});

rotear.get("/meus-bolos/:id", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;
    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const idBolo = req.params.id
    const { data, error } = await supabaseAutenticado
      .from("bolos")
      .select("*")
      .match({dono_do_bolo: idUsuario, id: idBolo});

    if (error) {
      return res.status(500).json({
        erro: "houve um erro" + error,
      });
    }

    const bolos = data.map((bolo) => [bolo.bolo_imagem]);

    const topper = data.map((topper) => [topper.topper_imagem]);

    const { data: dataBolo, error: errorBolo } =
      await supabaseAutenticado.storage
        .from("usuario")
        .createSignedUrls(bolos, 600000);
    const { data: dataTopper, error: errorTopper } =
      await supabaseAutenticado.storage
        .from("usuario")
        .createSignedUrls(topper, 600000);

    if (errorBolo) {
      return res.status(500).json({
        erro: "houve um erro" + errorBolo,
        status: errorBolo.status,
      });
    }

    if (errorTopper) {
      return res.status(500).json({
        erro: "houve um erro" + errorTopper,
      });
    }

    res.status(200).json({
      bolos: {
        bolo: data,
        bolo_imagem: dataBolo,
        topper_imagem: dataTopper,
      },
    });
  } catch (error) {
    res.status(500).json({
      erro: "caiu no catching",
      detalhes: error.message,
    });
  }
});

rotear.get(
  "/todos-os-bolos",
  autenticar,
  verificarRole("admin"),
  async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("bolos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      res.status(200).json({
        msg: "Todos os bolos",
        total: data.length,
        bolos: data,
      });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao listar bolos",
        detalhes: error.message,
      });
    }
  },
);

// ============================================
// ATUALIZAR BOLO
// ============================================

rotear.patch(
  "/bolo-personalizado/:id",
  autenticar,
  atualizar.fields([{ name: "imagem" }, { name: "topper" }]),
  async (req, res) => {
    try {
      const { id } = req.params.id;
      const idUsuario = req.usuario.id;
      const tokenUsuario = req.usuario.token;
      const tokenRefresh = req.usuario.refresh;
      const supabaseAutenticado = criarSupabaseAutenticado(
        tokenUsuario,
        tokenRefresh,
      );

      const { data: bolo, error: erroFetch } = await supabaseAutenticado
        .from("bolos")
        .select("*")
        .eq("id", id)
        .single();

      if (erroFetch) {
        return res.status(404).json({
          erro: "Bolo não encontrado",
        });
      }

      if (bolo.dono_do_bolo !== idUsuario) {
        return res.status(403).json({
          erro: "Você não pode editar um bolo que não é seu",
        });
      }

      const {
        peso,
        forma,
        massa,
        recheio,
        cobertura,
        tema,
        descricao,
        detalhamentoTopper,
      } = req.body;

      const dadosParaAtualizar = {};

      if (peso) dadosParaAtualizar.peso = parseInt(peso);
      if (forma) dadosParaAtualizar.forma = forma;
      if (massa) dadosParaAtualizar.massa = massa;
      if (recheio) dadosParaAtualizar.recheio = recheio;
      if (cobertura) dadosParaAtualizar.cobertura = cobertura;
      if (tema) dadosParaAtualizar.tema = tema;
      if (descricao) dadosParaAtualizar.descricao = descricao;
      if (detalhamentoTopper)
        dadosParaAtualizar.detalhamento_topper = detalhamentoTopper;

      if (req.files?.["imagem"]?.[0]) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("usuario")
          .upload(
            `imagens/bolo/${Date.now()}-${req.files["imagem"][0].originalname}`,
            req.files["imagem"][0].buffer,
            {
              contentType: req.files["imagem"][0].mimetype,
              cacheControl: "3600",
              upsert: true,
            },
          );

        if (uploadError) throw uploadError;
        dadosParaAtualizar.bolo_imagem = uploadData.path;
      }

      if (req.files?.["topper"]?.[0]) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("usuario")
          .upload(
            `imagens/topper/${Date.now()}-${req.files["topper"][0].originalname}`,
            req.files["topper"][0].buffer,
            {
              contentType: req.files["topper"][0].mimetype,
              cacheControl: "3600",
              upsert: true,
            },
          );

        if (uploadError) throw uploadError;
        dadosParaAtualizar.topper_imagem = uploadData.path;
      }

      const { data: boloAtualizado, error: erroUpdate } =
        await supabaseAutenticado
          .from("bolos")
          .update(dadosParaAtualizar)
          .eq("id", id)
          .select()
          .single();

      if (erroUpdate) throw erroUpdate;

      res.status(200).json({
        msg: "Bolo atualizado com sucesso!",
        bolo: boloAtualizado,
      });
    } catch (error) {
      res.status(500).json({
        erro: "Erro ao atualizar bolo",
        detalhes: error.message,
      });
    }
  },
);

// ============================================
// DELETAR BOLO
// ============================================

rotear.delete("/bolo-personalizado/:id", autenticar, async (req, res) => {
  try {
    const { id } = req.params.id;
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data: bolo, error: erroFetch } = await supabaseAutenticado
      .from("bolos")
      .select("*")
      .eq("id", id)
      .single();

    if (erroFetch) {
      return res.status(404).json({
        erro: "Bolo não encontrado",
      });
    }

    if (bolo.dono_do_bolo !== idUsuario) {
      return res.status(403).json({
        erro: "Você não pode deletar um bolo que não é seu",
      });
    }

    if (bolo.bolo_imagem) {
      await supabase.storage.from("usuario").remove([bolo.bolo_imagem]);
    }

    if (bolo.topper_imagem) {
      await supabase.storage.from("usuario").remove([bolo.topper_imagem]);
    }

    const { error: erroDelete } = await supabaseAutenticado
      .from("bolos")
      .delete()
      .eq("id", id);

    if (erroDelete) throw erroDelete;

    res.status(200).json({
      msg: "Bolo deletado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar bolo",
      detalhes: error.message,
    });
  }
});

// ============================================
// CRIAR PEDIDO
// ============================================

rotear.post("/pedidos", autenticar, async (req, res) => {
  try {
    const idUsuarioLogado = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    if (!validarUUID(idUsuarioLogado)) {
      return res.status(400).json({
        erro: "ID de usuário inválido",
      });
    }

    const { bolo_id, produto_id, quantidade_pedido, quantidade_bolo } =
      req.body;

    if (!quantidade_pedido && !quantidade_bolo) {
      return res.status(400).json({
        erro: "faltando campo obrigatório: quantidade",
      });
    }

    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    let bolo;
    if (bolo_id) {
      const { data: databolo, error: ErrorBolo } = await supabaseAutenticado
        .from("bolos")
        .select("*")
        .eq("dono_do_bolo", idUsuarioLogado);

      bolo = `bolo de ${dataBolo.massa}, com recheio de ${dataBolo.recheio} e cobertura de ${dataBolo.cobertura}`;
    }

    let produto;
    if (produto_id) {
      produtos.forEach((p) => {
        if (p.id === parseInt(produto_id)) {
          produto = p;
        }
      });
    }

    const descricao = `${quantidade_pedido && quantidade_bolo ? parseInt(quantidade_pedido) + parseInt(quantidade_bolo) : quantidade_pedido ? parseInt(quantidade_pedido) : parseInt(quantidade_bolo)} quantidades, sendo ${bolo && produto ? `${quantidade_bolo} bolos de ${bolo} e ${quantidade_pedido} de ${produto.nome}` : bolo ? `${quantidade_bolo} bolos de ${bolo}` : produto ? `${quantidade_pedido} de ${produto.nome}` : ""}`;

    const { data, error } = await supabaseAutenticado
      .from("pedidos")
      .insert({
        usuario_id: idUsuarioLogado,
        descricao: descricao,
        bolo_id: bolo_id,
        produto_id: produto_id,
        quantidade:
          quantidade_pedido && quantidade_bolo
            ? parseInt(quantidade_pedido) + parseInt(quantidade_bolo)
            : quantidade_pedido
              ? parseInt(quantidade_pedido)
              : parseInt(quantidade_bolo),
        status: "pendente",
      })
      .select();

    if (error) {
      return res.status(500).json({
        erro: "Erro ao criar pedido",
        detalhes: error,
      });
    }

    return res.status(200).json({
      msg: "Pedido criado com sucesso!",
      pedido: data,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao criar pedido",
      detalhes: error.message,
    });
  }
});

// ============================================
// LISTAR PEDIDOS DO USUÁRIO LOGADO
// ============================================

rotear.get("/pedidos", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;
    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data, error } = await supabaseAutenticado
      .from("pedidos")
      .select("*")
      .eq("usuario_id", idUsuario)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({
      msg: "Pedidos do usuário",
      total: data.length,
      pedidos: data,
    });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao listar pedidos",
      detalhes: error.message,
    });
  }
});

// ============================================
// PROCURAR PEDIDO DO USUÁRIO LOGADO
// ============================================

rotear.get("/pedido/", autenticar, async (req, res) => {
  try {
    const { id } = req.params.id;
    const idUsuarioLogado = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    if (!validarUUID(idUsuarioLogado)) {
      return res.status(400).json({
        erro: "ID de usuário inválido",
      });
    }

    const { descricao } = req.body;

    const { data, error } = await await supabaseAutenticado
      .from("pedidos")
      .select();

    const pedidos = [];

    data.forEach((element) =>
      pedidos.push(
        new RegExp(`\\b${descricao}\\b`, "i").test(pedido.descricao),
      ),
    );

  } catch (error) {
    res.status(500).json({
      erro: "Erro ao procurar pedido",
      detalhes: error.message,
    });
  }
});

// ============================================
// EDITAR PEDIDOS DO USUÁRIO LOGADO
// ============================================

rotear.patch("/pedidos/:id", autenticar, async (req, res) => {
  try {
    const { id } = req.params.id;
    const idUsuarioLogado = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    if (!validarUUID(idUsuarioLogado)) {
      return res.status(400).json({
        erro: "ID de usuário inválido",
      });
    }

    const { descricao, bolo_id, produto_id, quantidade, status } = req.body;

    if ((!quantidade, !status)) {
      return res.status(400).json({
        erro: "faltando campo obrigatório: quantidade ou status",
      });
    }

    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data: pedidoExistente, error: errorExistente } =
      await supabaseAutenticado
        .from("pedidos")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
      return res.status(500).json({
        erro: "Erro ao editar pedido",
        detalhes: error,
      });
    }

    const { data, error } = await supabaseAutenticado
      .from("pedidos")
      .update({
        usuario_id: idUsuarioLogado,
        descricao: descricao || pedidoExistente.descricao,
        bolo_id: bolo_id || pedidoExistente.bolo_id,
        produto_id: produto_id || pedidoExistente.produto_id,
        quantidade: parseInt(quantidade) || pedidoExistente.quantidade,
      })
      .eq("id", id);

    if (error) {
      return res.status(500).json({
        erro: "Erro ao editar pedido",
        detalhes: error,
      });
    }

    return res.status(200).json({
      msg: "Pedido criado com sucesso!",
      pedido: data,
    });
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao editar pedido",
      detalhes: error.message,
    });
  }
});

// ============================================
// DELETAR PEDIDOS DO USUÁRIO LOGADO
// ============================================

rotear.delete("/pedidos/:id", autenticar, async (req, res) => {
  try {
    const { id } = req.params.id;
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const tokenRefresh = req.usuario.refresh;

    const supabaseAutenticado = criarSupabaseAutenticado(
      tokenUsuario,
      tokenRefresh,
    );

    const { data: verificarPedido, error: erroPedido } =
      await supabaseAutenticado
        .from("pedidos")
        .select("*")
        .eq("id", id)
        .single();

    if (erroPedido) {
      return res.status(404).json({
        erro: "pedido não encontrado",
      });
    }

    if (verificarPedido.usuario_id !== id) {
      return res.status(403).json({
        erro: "Você não pode deletar um pedido que não é seu",
      });
    }

    const { error: erroDelete } = await supabaseAutenticado
      .from("pedidos")
      .delete()
      .eq("id", id);
  } catch (error) {
    return res.status(500).json({
      erro: "Erro interno ao deletar pedido",
      detalhes: error.message,
    });
  }
});

export { rotear };
