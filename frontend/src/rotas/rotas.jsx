import { createBrowserRouter } from "react-router"
import { Produtos } from "../componentes/pagina/Produtos";
import App from "../App";
import { PaginaPrincipal } from "../componentes/pagina/PaginaPrincipal";
import UmProduto from "../componentes/pagina/Produto";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {path: "/", element: <PaginaPrincipal />},
{ 
  path: "produtos", 
  element: <Produtos />, 
  children: [
    { path: ":produtoId", element: <UmProduto /> } 
  ]
},
    ],
  },
]);
