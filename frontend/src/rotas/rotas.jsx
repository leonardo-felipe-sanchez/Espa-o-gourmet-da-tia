import { createBrowserRouter } from "react-router"
import { Produtos } from "../componentes/pagina/Produtos";
import App from "../App";
import { PaginaPrincipal } from "../componentes/pagina/PaginaPrincipal";
import {UmProduto} from "../componentes/pagina/Produto";
import { redirect } from "react-router";
import { CriarProduto } from "../componentes/pagina/CriarProduto";

export async function produtosLoader() {
  const response = await fetch('http://localhost:3000/api/produtos');
  if (!response.ok) throw new Error("Erro ao carregar");
  return response.json(); 
}

export async function categoriasLoader({ params }) {
  const data = await produtosLoader(); // Pega todos os produtos do seu backend
  
  // Filtra os produtos onde a categoria (ou classe) é igual ao que veio na URL
  const produtosFiltrados = data.produtos.filter(
    p => p.classe === params.categoriao
  );

  return { 
    msg: `Filtrando por: ${params.categoriao}`, 
    produtos: produtosFiltrados 
  };
}

export async function umProdutoLoader({ params }) {
  const response = await fetch(`http://localhost:3000/api/produtos/${params.produtoId}`);
  
  if (!response.ok) throw new Error("Produto não encontrado");
  
  const data = await response.json();
  return data;
}

export async function editarAction({ request, params }) {
  const formData = await request.formData();

  console.log(formData.get("nome"));
  console.log(formData.get("imagem"));

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

    if (!response.ok) throw new Error("Erro ao salvar");

    return redirect("/produtos"); 
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deletarAction({ params }) {
  await fetch(`http://localhost:3000/api/produtos/${params.id}`, { method: "DELETE" });
  return redirect("/produtos");
}

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
    children: [
      {path: "/", element: <PaginaPrincipal />},
{ 
  path: "produtos", 
  element: <Produtos />, 
  loader: produtosLoader,
  children: [
    { path: ":produtoId", element: <UmProduto />, loader:umProdutoLoader, action: editarAction,},
    { path: "deletar/:id", action: deletarAction },
    { path: "criar", element: <CriarProduto/>, action: criarAction, loader: produtosLoader,},
    { path: "filtro/:categoriao", element: <Produtos />, loader: categoriasLoader,}
  ]
},
    ],
  },
]);
