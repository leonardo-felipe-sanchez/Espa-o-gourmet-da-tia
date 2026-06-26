import { createBrowserRouter } from "react-router";
import { Produtos } from "../componentes/pagina/Produtos";
import App from "../App";
import { PaginaPrincipal } from "../componentes/pagina/PaginaPrincipal";
import { UmProduto } from "../componentes/pagina/Produto";
import { redirect } from "react-router";
import { CriarProduto } from "../componentes/pagina/CriarProduto";
import { BoloPersonalizado } from "../componentes/pagina/BoloPersonalizado";
import {Login} from "../componentes/pagina/Login";
import { Cadastro } from "../componentes/pagina/Cadastro";
import { SignUpTeste } from "../componentes/pagina/SingUpTeste";

export async function produtosLoader() {
  const response = await fetch("http://localhost:3000/api/produtos");
  if (!response.ok) throw new Error("Erro ao carregar");
  return response.json();
}

export async function categoriasLoader({ params }) {
  const data = await produtosLoader(); // Pega todos os produtos do seu backend

  // Filtra os produtos onde a categoria (ou classe) é igual ao que veio na URL
  const produtosFiltrados = data.produtos.filter(
    (p) => p.classe === params.categoriao,
  );

  return {
    msg: `Filtrando por: ${params.categoriao}`,
    produtos: produtosFiltrados,
  };
}

export async function umProdutoLoader({ params }) {
  const response = await fetch(
    `http://localhost:3000/api/produtos/${params.produtoId}`,
  );

  if (!response.ok) throw new Error("Produto não encontrado");

  const data = await response.json();
  return data;
}

export async function editarAction({ request, params }) {
  const formData = await request.formData();

  await fetch(`http://localhost:3000/api/produtos/${params.produtoId}`, {
    method: "PATCH",
    body: formData,
  });

  return redirect("/produtos");
}

export async function criarAction({ request }) {
  const formData = await request.formData();

  try {
    const response = await fetch(`http://localhost:3000/api/produtos`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error(response.statusText);

    return redirect("/produtos");
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletarAction({ params }) {
  await fetch(`http://localhost:3000/api/produtos/${params.id}`, {
    method: "DELETE",
  });
  return redirect("/produtos");
}

export async function criarBolo({ request }){

  console.log("entrou no criar bolo personalizado")

   const formData = await request.formData();

   console.log(formData)

  try {
    const response = await fetch(`http://localhost:3000/api/bolo-personalizado`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("erro na resposta" + response.statusText);

    return redirect("/produtos");
  } catch (error) {
    console.error("erro no tryCatch", error);
    return null;
  }
}

export async function fetchComAutenticacao(url, opcoes = {}) {
  const token = localStorage.getItem("accessToken");

  // Se não tem token, redireciona para login
  if (!token && opcoes.requerAutenticacao !== false) {
    throw redirect("/login");
  }

  const headers = {
    "Content-Type": "application/json",
    ...opcoes.headers,
  };

  // Se tem token, adiciona ao header
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...opcoes,
      headers,
    });

    // Se token expirou (401), limpa e redireciona
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      throw redirect("/login");
    }

    // Se houver erro, retorna a resposta pra tratar
    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || `Erro ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    // Se for redirect, passa adiante
    if (error.status === 302 || error.location) {
      throw error;
    }
    throw new Error(error.message);
  }
}

// ============================================
// 2. ACTIONS - Funções que modificam dados
// ============================================

/**
 * ACTION: Login
 * POST /api/usuario
 * Salva token no localStorage
 */
export async function loginAction({ request }) {
  try {
    // 1. Extrair email e password do formulário
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Tentando login com:", email);

    // 2. Fazer requisição ao backend
    const response = await fetch("http://localhost:3000/api/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || "Erro ao fazer login");
    }

    // 3. Extrair token e dados
    const dados = await response.json();
    const { tokens, usuario } = dados;

    // 4. ✅ IMPORTANTE: Salvar no localStorage
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
    localStorage.setItem("userId", usuario.id);
    localStorage.setItem("userEmail", usuario.email);

    console.log("✅ Login bem-sucedido! ID:", usuario.id);

    // 5. Redirecionar para a página inicial
    return redirect("/");

  } catch (error) {
    console.error("❌ Erro no login:", error.message);
    // Retornar erro para exibir no formulário
    return {
      erro: error.message,
    };
  }
}

export async function singupAction({ request }) {
  try {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const nome = formData.get("nome");
    const cpf = formData.get("cpf");
    const idade = formData.get("idade");
    const genero = formData.get("genero");
    const telefone = formData.get("telefone");
    const cep = formData.get("cep");
    const rua = formData.get("rua");
    const numero = formData.get("numero");
    const complemento = formData.get("complemento");
    const pontoReferencia = formData.get("pontoReferencia");
    const bairro = formData.get("bairro");
    const cidade = formData.get("cidade");  

    if (password !== confirmPassword) {
      throw new Error("As senhas não coincidem");
    }

    console.log("Tentando criar usuário com:", email);

    const response = await fetch("http://localhost:3000/api/usuario/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
        cidade
      }),
    });

    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || "Erro ao criar usuário");
    }

    console.log("✅ Usuário criado com sucesso!");
    return redirect("/login");

  } catch (error) {
    console.error("❌ Erro ao criar usuário:", error.message);
    return {
      erro: error.message,
    };
  }
}

/**
 * ACTION: Logout
 * Limpa tokens do localStorage
 */
export function logoutAction() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userEmail");

  console.log("✅ Logout realizado");
  return redirect("/login");
}

/**
 * ACTION: Criar Bolo Personalizado
 * POST /api/bolo-personalizado
 * Requer autenticação
 */
export async function criarBoloAction({ request }) {
  try {
    const formData = await request.formData();

    // Extrair dados do formulário
    const peso = formData.get("peso");
    const forma = formData.get("forma");
    const massa = formData.get("massa");
    const recheio = formData.get("recheio");
    const cobertura = formData.get("cobertura");
    const tema = formData.get("tema") || "";
    const descricao = formData.get("descricao") || "";
    const detalhamentoTopper = formData.get("detalhamentoTopper") || "";
    const imagem = formData.get("imagem");
    const topper = formData.get("topper");

    console.log("Criando bolo:", { peso, forma, massa });

    // Validar campos obrigatórios
    if (!peso || !forma || !massa || !recheio || !cobertura) {
      throw new Error("Faltam campos obrigatórios");
    }

    // Validar token
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw redirect("/login");
    }

    // Preparar FormData com dados e imagens
    const novoFormData = new FormData();
    novoFormData.append("peso", peso);
    novoFormData.append("forma", forma);
    novoFormData.append("massa", massa);
    novoFormData.append("recheio", recheio);
    novoFormData.append("cobertura", cobertura);
    novoFormData.append("tema", tema);
    novoFormData.append("descricao", descricao);
    novoFormData.append("detalhamentoTopper", detalhamentoTopper);
    
    if (imagem) novoFormData.append("imagem", imagem);
    if (topper) novoFormData.append("topper", topper);

    // ✅ IMPORTANTE: Enviar com token no header
    const response = await fetch("http://localhost:3000/api/bolo-personalizado", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: novoFormData,
    });

    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || "Erro ao criar bolo");
    }

    const dados = await response.json();
    console.log("✅ Bolo criado:", dados.bolo.id);

    // Redirecionar e mostrar sucesso
    return redirect("/produtos?sucesso=bolo-criado");

  } catch (error) {
    console.error("❌ Erro ao criar bolo:", error.message);
    
    // Se for redirect (ex: token inválido), passa adiante
    if (error.status === 302 || error.location) {
      throw error;
    }

    // Retornar erro para exibir no formulário
    return {
      erro: error.message,
    };
  }
}

/**
 * ACTION: Editar Bolo
 * PATCH /api/bolo-personalizado/:id
 * Requer autenticação
 */
export async function editarBoloAction({ request, params }) {
  try {
    const { id } = params;
    const formData = await request.formData();
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw redirect("/login");
    }

    const novoFormData = new FormData();
    
    // Adicionar campos
    const peso = formData.get("peso");
    const forma = formData.get("forma");
    const massa = formData.get("massa");
    const recheio = formData.get("recheio");
    const cobertura = formData.get("cobertura");
    const tema = formData.get("tema") || "";
    const descricao = formData.get("descricao") || "";

    if (peso) novoFormData.append("peso", peso);
    if (forma) novoFormData.append("forma", forma);
    if (massa) novoFormData.append("massa", massa);
    if (recheio) novoFormData.append("recheio", recheio);
    if (cobertura) novoFormData.append("cobertura", cobertura);
    if (tema) novoFormData.append("tema", tema);
    if (descricao) novoFormData.append("descricao", descricao);

    // Imagens opcionais
    const imagem = formData.get("imagem");
    const topper = formData.get("topper");
    if (imagem) novoFormData.append("imagem", imagem);
    if (topper) novoFormData.append("topper", topper);

    const response = await fetch(`http://localhost:3000/api/bolo-personalizado/${id}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: novoFormData,
    });

    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || "Erro ao editar bolo");
    }

    console.log("✅ Bolo editado");
    return redirect("/produtos?sucesso=bolo-editado");

  } catch (error) {
    console.error("❌ Erro ao editar bolo:", error.message);
    
    if (error.status === 302 || error.location) {
      throw error;
    }

    return {
      erro: error.message,
    };
  }
}

/**
 * ACTION: Deletar Bolo
 * DELETE /api/bolo-personalizado/:id
 * Requer autenticação
 */
export async function deletarBoloAction({ params }) {
  try {
    const { id } = params;
    const token = localStorage.getItem("accessToken");

    if (!token) {
      throw redirect("/login");
    }

    const response = await fetch(`http://localhost:3000/api/bolo-personalizado/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const dados = await response.json();
      throw new Error(dados.erro || "Erro ao deletar bolo");
    }

    console.log("✅ Bolo deletado");
    return redirect("/produtos?sucesso=bolo-deletado");

  } catch (error) {
    console.error("❌ Erro ao deletar bolo:", error.message);
    
    if (error.status === 302 || error.location) {
      throw error;
    }

    return null;
  }
}

// ============================================
// 3. LOADERS - Funções que carregam dados
// ============================================

/**
 * LOADER: Listar meus bolos (autenticado)
 * GET /api/meus-bolos
 */
export async function meusBolosLoader() {
  try {
    const dados = await fetchComAutenticacao("http://localhost:3000/api/meus-bolos", {
      method: "GET",
    });

    return dados.bolos || [];

  } catch (error) {
    console.error("Erro ao carregar meus bolos:", error);
    
    // Se for erro de autenticação, redireciona
    if (error.status === 302 || error.location) {
      throw error;
    }

    return [];
  }
}

/**
 * LOADER: Listar todos os bolos (público)
 * GET /api/todos-os-bolos
 */
export async function todosOsBolosLoader() {
  try {
    const response = await fetch("http://localhost:3000/api/todos-os-bolos");
    
    if (!response.ok) {
      throw new Error("Erro ao carregar bolos");
    }

    const dados = await response.json();
    return dados.bolos || [];

  } catch (error) {
    console.error("Erro ao carregar bolos:", error);
    return [];
  }
}

/**
 * LOADER: Verificar se usuário está autenticado
 * Retorna dados do usuário se logado
 */
export function usuarioAuthLoader() {
  const token = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const userEmail = localStorage.getItem("userEmail");

  if (token && userId) {
    return {
      autenticado: true,
      id: userId,
      email: userEmail,
    };
  }

  return {
    autenticado: false,
  };
}

// ============================================
// 4. ROUTER CONFIGURADO
// ============================================

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    HydrateFallback: () => (
      <div className="h-screen flex items-center justify-center">
        <h2 className="text-pink-500 animate-pulse text-2xl font-bold">
          Carregando Espaço Gourmet...
        </h2>
      </div>
    ),
    loader: usuarioAuthLoader, // ✅ Verifica autenticação
    children: [
      { path: "/", element: <PaginaPrincipal /> },
      {
        path: "produtos",
        element: <Produtos />,
        loader: produtosLoader,
        children: [
          {
            path: ":produtoId",
            element: <UmProduto />,
            loader: umProdutoLoader,
            action: editarAction,
          },
          { path: "deletar/:id", action: deletarAction },
          {
            path: "criar",
            element: <CriarProduto />,
            action: criarAction,
            loader: produtosLoader,
          },
          {
            path: "filtro/:categoriao",
            element: <Produtos />,
            loader: categoriasLoader,
          },
        ],
      },
      {
        path: "bolo-personalizado",
        element: <BoloPersonalizado />,
        action: criarBoloAction, // ✅ Ação atualizada
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction, // ✅ Ação atualizada
      },
      {
        path: "logout",
        action: logoutAction, // ✅ Fazer logout
      },
      {
        path: "cadastro",
        element: <Cadastro />,
        action: singupAction, // ✅ Ação de cadastro
      },
      {
        path: "singup-teste",
        element: <SignUpTeste />,
        action: singupAction, // ✅ Usar mesma ação de cadastro
      }
    ],
  },
]);