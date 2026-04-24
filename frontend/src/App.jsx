import { DadosDoRodape } from "./dados/dadosDoRodape.jsx"
import { DadosDoCabecalho } from "./dados/dadosDoCabecalho.jsx"
import { Outlet } from "react-router"

function App() {

  return (
    <>
    <DadosDoCabecalho/>
<Outlet/>
  <DadosDoRodape/>
    </>
  )
}

export default App
