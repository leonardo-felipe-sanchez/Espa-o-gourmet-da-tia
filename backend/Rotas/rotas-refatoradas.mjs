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
  criarSupabaseAutenticado 
} from "../middleware-autenticacao.mjs";
import {supabaseAdmin} from "../Controlador/supabase.mjs";
import { verificarAdmin } from '../verificacao.js';
import * as admin from './rotas-admin-REFATORADAS.mjs';
import { verificarRole } from '../verificarRole.mjs';

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
// ROTAS DE PRODUTOS (mantidas iguais)
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

rotear.post("/produtos", atualizar.single("imagem"), async (req, res) => {
  try {
    const { nome, classinha, preco, descricao } = req.body;

    const nomeDoArquivo = req.file.filename;

    const novoId =
      produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
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
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

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

rotear.patch("/produtos/:id", atualizar.single("imagem"), async (req, res) => {
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

      const { data: removerdata, error: removererror } = await supabaseAdmin.storage
        .from("produtos")
        .remove([`${caminhoArquivo[8]}/${caminhoArquivo[9]}`]);

      if (removererror) throw removererror;

      const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
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
    console.log(error);
    res.status(500).json({ erro: error.message });
  }
});

rotear.delete("/produtos/:id", async (req, res) => {
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
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
});

// ============================================
// AUTENTICAÇÃO - LOGIN
// ============================================

rotear.post("/usuario", atualizar.none(), async (req, res) => {
  try {
    console.log("Tentativa de login:", req.body.email);
    const { email, password } = req.body;

    // 1. Fazer login no Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(401).json({ 
        erro: "Email ou senha inválidos",
        detalhes: error.message 
      });
    }

    // 2. Extrair dados importantes
    const userId = data.user.id;
    const accessToken = data.session?.access_token;
    const refreshToken = data.session?.refresh_token;

    // ✅ IMPORTANTE: Enviar token para o frontend!
    res.status(200).json({ 
      msg: "Login bem-sucedido!",
      usuario: {
        id: userId,
        email: data.user.email,
      },
      // Frontend deve armazenar esses tokens no localStorage
      tokens: {
        accessToken: accessToken,    // Token de curta duração (1 hora)
        refreshToken: refreshToken,   // Token para renovar o accessToken
      }
    });

    console.log("✅ Login bem-sucedido para:", email);

  } catch (error) {
    console.error("Erro interno no login:", error);
    res.status(500).json({ 
      erro: "Erro ao processar login",
      detalhes: error.message 
    });
  }
});

rotear.post("/admin/usuario/login", admin.loginAdmin);

// ============================================
// ADMIN - LISTAR TODOS OS USUÁRIOS (apenas admin)
// ============================================

rotear.get("/admin/usuarios", autenticar, verificarRole('admin'), admin.listarTodosUsuarios);

// Rotas super-admin (role específica)
rotear.post(
  '/admin/usuarios/:id/promover',
  autenticar,
  verificarRole('super_admin'),
  async (req, res) => {
    const { id } = req.params;

    // Promover usuário para admin
    const sucesso = await adicionarRole(id, 'admin');

    if (sucesso) {
      res.json({ msg: 'Usuário promovido para admin' });
    } else {
      res.status(500).json({ erro: 'Erro ao promover' });
    }
  }
);

// ============================================
// ADMIN - LISTAR TODOS OS BOLOS (apenas admin)
// ============================================

rotear.get("/admin/bolos", autenticar, verificarAdmin, admin.listarTodosBolos);

// ============================================
// SIGNUP - REGISTRAR NOVO USUÁRIO
// ============================================

rotear.post("/usuario/registrar", atualizar.none(), async (req, res) => {
  try {
    const { email, password, confirmPassword, nome, cpf, idade, genero, telefone, cep, rua, numero, complemento,  pontoReferencia, bairro, cidade} = req.body;

    // Validações
    if (!email || !password || !confirmPassword || !nome || !cpf || !idade || !genero || !telefone || !cep || !rua || !numero || !pontoReferencia || !bairro || !cidade ) {
      return res.status(400).json({ 
        erro: "Todos os campos são obrigatórios" 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        erro: "Senhas não conferem" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        erro: "Senha deve ter no mínimo 6 caracteres" 
      });
    }

    // Criar usuário no Supabase
    const { data, error } = await supabase.auth.signUp({
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
        }
      }
    });

    if (error) {
      console.error("Erro ao registrar:", error);
      return res.status(400).json({ 
        erro: error.message 
      });
    }

    res.status(201).json({ 
      msg: "Usuário criado com sucesso!",
      usuario: {
        id: data.user.id,
        email: data.user.email,
      }
    });

    console.log("✅ Novo usuário registrado:", email);

  } catch (error) {
    console.error("Erro interno:", error);
    res.status(500).json({ 
      erro: "Erro ao registrar usuário",
      detalhes: error.message 
    });
  }
});

rotear.post("/admin/usuario/registrar", autenticar, verificarAdmin, admin.registrarNovoUsuario);

// ============================================
// UPDATE - ATUALIZAR PEDIDOS
// ============================================

rotear.patch("/admin/pedidos/:id", autenticar, verificarAdmin, admin.editarPedidoAdmin);

// ============================================
// DELETE - DELETAR USUÁRIO (apenas admin)
// ============================================

rotear.delete("/admin/usuarios/:id", autenticar, verificarAdmin, admin.deletarUsuarioAdmin);

// ============================================
// LOGOUT
// ============================================

rotear.post("/usuario/logout", atualizar.none(), async (req, res) => {
  try {
    // Frontend deve remover tokens do localStorage
    // Backend não precisa fazer nada especial
    res.status(200).json({ 
      msg: "Logout bem-sucedido!" 
    });
  } catch (error) {
    res.status(500).json({ 
      erro: "Erro ao fazer logout",
      detalhes: error.message 
    });
  }
});

// ============================================
// BOLO PERSONALIZADO - CRIAR (REFATORADO COM JWT)
// ============================================

rotear.post(
  "/bolo-personalizado",
  autenticar, // ✅ Middleware de autenticação
  atualizar.fields([{ name: "imagem" }, { name: "topper" }]),
  async (req, res) => {
    try {
      // 1. Extrair usuário do middleware de autenticação
      const idUsuarioLogado = req.usuario.id;
      const tokenUsuario = req.usuario.token;

      console.log("Usuário criando bolo:", idUsuarioLogado);

      // 2. Validar UUID
      if (!validarUUID(idUsuarioLogado)) {
        return res.status(400).json({ 
          erro: "ID de usuário inválido" 
        });
      }

      // 3. Extrair dados do formulário
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

      // 4. Validar dados obrigatórios
      if (!peso || !forma || !massa || !recheio || !cobertura) {
        return res.status(400).json({ 
          erro: "Campos obrigatórios faltando: peso, forma, massa, recheio, cobertura" 
        });
      }

      // 5. Extrair arquivos
      var nomeDoArquivoImagem = req.files?.["imagem"]?.[0];
      var nomeDoArquivoTopper = req.files?.["topper"]?.[0];

      console.log("Arquivos recebidos:", {
        imagem: nomeDoArquivoImagem?.originalname,
        topper: nomeDoArquivoTopper?.originalname,
      });

      // 6. Upload da imagem do bolo
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
            }
          );

        if (boloError) throw boloError;
        caminhoBoloImagem = boloData.path;
      }

      // 7. Upload da imagem do topper
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
            }
          );

        if (topperError) throw topperError;
        caminhoTopperImagem = topperData.path;
      }

      // 8. Criar cliente Supabase autenticado com o token do usuário
      const supabaseAutenticado = criarSupabaseAutenticado(tokenUsuario);

      // 9. Inserir bolo no banco de dados
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
          dono_do_bolo: idUsuarioLogado, // ✅ Agora está correto!
        })
        .select();

      if (error) {
        console.error("❌ Erro ao inserir bolo:", {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
        });
        
        // Se for erro de RLS, dá uma dica melhor
        if (error.code === "PGRST301") {
          return res.status(403).json({
            erro: "Erro de permissão. Verifique se as RLS policies estão corretas.",
            detalhes: error.message,
          });
        }
        
        throw error;
      }

      console.log("✅ Bolo criado com sucesso:", data[0]?.id);

      res.status(201).json({ 
        msg: "Bolo recebido com sucesso!",
        bolo: data[0],
      });

    } catch (error) {
      console.error("❌ Erro interno:", JSON.stringify(error, null, 2));
      res.status(500).json({
        erro: "Erro ao criar bolo",
        detalhes: error.message,
      });
    }
  }
);

// ============================================
// LISTAR BOLOS DO USUÁRIO LOGADO
// ============================================

rotear.get("/meus-bolos", autenticar, async (req, res) => {
  try {
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;

    const supabaseAutenticado = criarSupabaseAutenticado(tokenUsuario);

    const { data, error } = await supabaseAutenticado
      .from("bolos")
      .select("*")
      .eq("dono_do_bolo", idUsuario)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.status(200).json({
      msg: "Bolos do usuário",
      total: data.length,
      bolos: data,
    });

  } catch (error) {
    console.error("Erro ao listar bolos:", error);
    res.status(500).json({
      erro: "Erro ao listar bolos",
      detalhes: error.message,
    });
  }
});

// ============================================
// LISTAR TODOS OS BOLOS (PÚBLICO)
// ============================================

rotear.get("/todos-os-bolos", async (req, res) => {
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
    console.error("Erro ao listar bolos:", error);
    res.status(500).json({
      erro: "Erro ao listar bolos",
      detalhes: error.message,
    });
  }
});

// ============================================
// ATUALIZAR BOLO (apenas o dono)
// ============================================

rotear.patch(
  "/bolo-personalizado/:id",
  autenticar,
  atualizar.fields([{ name: "imagem" }, { name: "topper" }]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const idUsuario = req.usuario.id;
      const tokenUsuario = req.usuario.token;
      const supabaseAutenticado = criarSupabaseAutenticado(tokenUsuario);

      // 1. Verificar se o bolo pertence ao usuário
      const { data: bolo, error: erroFetch } = await supabaseAutenticado
        .from("bolos")
        .select("*")
        .eq("id", id)
        .single();

      if (erroFetch) {
        return res.status(404).json({ 
          erro: "Bolo não encontrado" 
        });
      }

      if (bolo.dono_do_bolo !== idUsuario) {
        return res.status(403).json({ 
          erro: "Você não pode editar um bolo que não é seu" 
        });
      }

      // 2. Preparar dados para atualizar
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
      if (detalhamentoTopper) dadosParaAtualizar.detalhamento_topper = detalhamentoTopper;

      // 3. Atualizar imagens se necessário
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
            }
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
            }
          );

        if (uploadError) throw uploadError;
        dadosParaAtualizar.topper_imagem = uploadData.path;
      }

      // 4. Atualizar no banco
      const { data: boloAtualizado, error: erroUpdate } = await supabaseAutenticado
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
      console.error("Erro ao atualizar bolo:", error);
      res.status(500).json({
        erro: "Erro ao atualizar bolo",
        detalhes: error.message,
      });
    }
  }
);

// ============================================
// DELETAR BOLO (apenas o dono)
// ============================================

rotear.delete("/bolo-personalizado/:id", autenticar, async (req, res) => {
  try {
    const { id } = req.params;
    const idUsuario = req.usuario.id;
    const tokenUsuario = req.usuario.token;
    const supabaseAutenticado = criarSupabaseAutenticado(tokenUsuario);

    // 1. Verificar se o bolo pertence ao usuário
    const { data: bolo, error: erroFetch } = await supabaseAutenticado
      .from("bolos")
      .select("*")
      .eq("id", id)
      .single();

    if (erroFetch) {
      return res.status(404).json({ 
        erro: "Bolo não encontrado" 
      });
    }

    if (bolo.dono_do_bolo !== idUsuario) {
      return res.status(403).json({ 
        erro: "Você não pode deletar um bolo que não é seu" 
      });
    }

    // 2. Deletar imagens do storage
    if (bolo.bolo_imagem) {
      await supabase.storage
        .from("usuario")
        .remove([bolo.bolo_imagem]);
    }

    if (bolo.topper_imagem) {
      await supabase.storage
        .from("usuario")
        .remove([bolo.topper_imagem]);
    }

    // 3. Deletar bolo do banco de dados
    const { error: erroDelete } = await supabaseAutenticado
      .from("bolos")
      .delete()
      .eq("id", id);

    if (erroDelete) throw erroDelete;

    res.status(200).json({ 
      msg: "Bolo deletado com sucesso!" 
    });

  } catch (error) {
    console.error("Erro ao deletar bolo:", error);
    res.status(500).json({
      erro: "Erro ao deletar bolo",
      detalhes: error.message,
    });
  }
});

export { rotear };
