import pkg from "express";
import { supabase } from "../Controlador/supabase.mjs";
import { data, error } from "../Controlador/supabase.mjs";
import { produtosData, produtosError } from "../Controlador/supabase.mjs";
import pkg2 from "multer";
const multer = pkg2;
import { Dados } from "../Controlador/Controlador.js";

const rotear = pkg.Router();

rotear.post("/contact", Dados);

const classe = [];

data.forEach((item) => {
  classe.push(item.tipo);
});

/**
 * const produtos = [
  {
    id: 1,
    nome: "Pão de mel",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2],
  },
  {
    id: 2,

    nome: "Cesta do café da manhã",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2],
  },
  {
    id: 3,
    nome: "Torta de morango",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2],
  },
  {
    id: 4,
    nome: "Kit festa",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2],
  },
];
*/

const produtos = produtosData;

/**
 *  const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagens/");
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, nomeUnico);
  },
});

 */
const armazenamento = multer.memoryStorage();

const atualizar = multer({ storage: armazenamento });

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
    const { nome, classinha, preco, descricao} = req.body;

    const nomeDoArquivo = req.file.filename;

    const novoId =
      produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("produtos")
      .upload(`imagens/${nomeDoArquivo}`, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = await supabase.storage
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
      descricao: descricao || ''
    };

    if (preco) novoProduto.preco = preco;

    produtos.push(novoProduto);

    const classeParaNumero = await supabase
      .from("classes")
      .select("id")
      .eq("tipo", classinha)
      .single();
    const { data, error } = await supabase
      .from("produtos")
      .insert({
        nome: nome,
        imagem: urlPublicaDaImagem,
        tipo: classeParaNumero.data.id,
        preco: preco || 0.0,
        descricao: descricao || ''
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

    const caminhoArquivo = produto.imagem.split("/")
    console.log(`Caminho do arquivo: ${caminhoArquivo[8]}/${caminhoArquivo[9]}`);

    const dadosParaAtualizar = {};

    if (nome) dadosParaAtualizar.nome = nome;

    produto.nome = nome || produto.nome;

    if (preco) dadosParaAtualizar.preco = preco;

    produto.preco = preco || produto.preco;

    if (descricao) dadosParaAtualizar.descricao = descricao;

    produto.descricao = descricao || produto.descricao;

    if (classinha) {
      const classeParaNumero = await supabase
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
      //dadosParaAtualizar.imagem = `http://localhost:3000/imagens/${nomeDoArquivo}`;
      
      const {data: removerdata, error: removererror} = await supabase.storage
        .from("produtos")
        .remove([`${caminhoArquivo[8]}/${caminhoArquivo[9]}`]);

      if (removererror) throw removererror;

        const { data: uploadData, error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(`imagens/${nomeDoArquivo.originalname}`, req.file.buffer, {
          contentType: req.file.mimetype,
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data: urlData, error: urlError } = await supabase.storage
        .from("produtos")
        .getPublicUrl(`imagens/${nomeDoArquivo.originalname}`);

      if (urlError) throw urlError;

      dadosParaAtualizar.imagem = urlData.publicUrl;

      console.log("URL pública da imagem:", urlData.publicUrl.split("/"));
      produto.imagem = nomeDoArquivo
        ? urlData.publicUrl
        : produto.imagem;
    }

    const { data, error } = await supabase
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

    const {data: removeData, error: removeError} = await supabase.storage
      .from("produtos")
      .remove([`imagens/${caminhoArquivo[8]}/${caminhoArquivo[9]}`]);

    if (removeError) throw removeError;

    const { data, error } = await supabase
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

rotear.get("/bolo-personalizado", async (req, res) => {
  try {
    res.status(200).json({ msg: "Rota para bolo personalizado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ erro: error.message });
  }
});

rotear.post("/bolo-personalizado", atualizar.single("imagem"), async (req, res) => {
      const nomeDoArquivo = req.file.filename;
      
  try {
    console.log(req.body);
  } catch (error) {
    console.error("Erro no envio do bolo personalizado:", error);
  }
})

export { rotear };