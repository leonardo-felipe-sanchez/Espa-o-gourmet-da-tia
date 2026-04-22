import { PaginaPrincipal } from "./componentes/pagina/PaginaPrincipal.jsx"
import { DadosDoRodape } from "./dados/dadosDoRodape.jsx"
import { DadosDoCabecalho } from "./dados/dadosDoCabecalho.jsx"

function App() {

  return (
    <>
    <DadosDoCabecalho/>
<PaginaPrincipal/>
  <DadosDoRodape/>
    </>
  )
}

export default App
