import { DadosDoRodape } from "./dados/dadosDoRodape.jsx";
import { DadosDoCabecalho } from "./dados/dadosDoCabecalho.jsx";
import { Outlet } from "react-router";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <DadosDoCabecalho />

      <main className="flex-1">
        <Outlet />
      </main>

      <DadosDoRodape />
    </div>
  );
}

export default App;
