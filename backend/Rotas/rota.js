const rotear = require("express").Router();

const { Dados } = require("../Controlador/Controlador");

const multer = require("multer");

rotear.post("/contact", Dados);

const classe = ["bolos", "salgados", "sobremesas", "bebidas"]

const produtos = [
  {
    id: 1,
    nome: "Pão de mel",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2]
  },
  {
    id: 2,
    nome: "Cesta do café da manhã",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2]
  },
  {
    id: 3,
    nome: "Torta de morango",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2]
  },
  {
    id: 4,
    nome: "Kit festa",
    imagem: "http://localhost:3000/imagens/bolo1.webp",
    classe: classe[2]
  },
];

const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imagens/");
  },
  filename: (req, file, cb) => {
    const nomeUnico = Date.now() + "-" + file.originalname.replace(/\s+/g, "");
    cb(null, nomeUnico);
  },
});

const atualizar = multer({ storage: armazenamento });

rotear.get("/produtos", async (req, res) => {
  try {
    res.status(200).json({ msg: "retornar todas as classes e produtos", classe, produtos });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

rotear.post("/produtos", atualizar.single("imagem"), async (req, res) => {
  try {
    const { nome, classinha } = req.body;

    const nomeDoArquivo = req.file.filename;

    const novoId =
      produtos.length > 0 ? Math.max(...produtos.map((p) => p.id)) + 1 : 1;

    const novoProduto = {
      id: novoId,
      nome: nome,
      imagem: `http://localhost:3000/imagens/${nomeDoArquivo}`,
      classe: classinha
    };

    produtos.push(novoProduto);

    res.status(201).json({
      msg: `Produto ${nome} criado com sucesso!`,
      produto: novoProduto,
    });
  } catch (error) {
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

rotear.patch("/produtos/:id", atualizar.single('imagem'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, classinha } = req.body;

    const produto = produtos.find((p) => p.id === parseInt(id));

    if (!produto) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    let imagemFinal = produto.imagem; 

    if (req.file) {
      imagemFinal = `http://localhost:3000/imagens/${req.file.filename}`;
    }

    produto.nome = nome || produto.nome;
    produto.classe = classinha || produto.classe;
    produto.imagem = imagemFinal;

    res.status(200).json({ 
      msg: "Produto atualizado com sucesso!", 
      produto 
    });

  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// DELETE
rotear.delete("/produtos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const index = produtos.findIndex((p) => p.id === parseInt(id));

    if (index === -1)
      return res.status(404).json({ msg: "produto não encontrado" });

    const nomeRemovido = produtos[index].nome;
    produtos.splice(index, 1);

    // Mudei para 200 para a mensagem aparecer no Postman/React
    res.status(200).json({ msg: `Produto deletado: ${nomeRemovido}` });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

module.exports = rotear;