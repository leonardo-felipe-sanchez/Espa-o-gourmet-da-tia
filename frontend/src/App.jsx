import { DadosDoRodape } from "./dados/dadosDoRodape.jsx";
import { DadosDoCabecalho } from "./dados/dadosDoCabecalho.jsx";
import { useLoaderData, Outlet } from "react-router";

function App() {
  const usuario = useLoaderData();
  return (
    <div className="flex flex-col min-h-screen">
      <DadosDoCabecalho />

      <main className="flex-1">
        <Outlet context={{ usuario }} />
      </main>

      <DadosDoRodape />
    </div>
  );
}

export default App;
