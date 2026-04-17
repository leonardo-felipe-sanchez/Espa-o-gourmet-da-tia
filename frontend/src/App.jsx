import { PaginaPrincipal } from "./pagina/PaginaPrincipal"
import { DadosDoRodape } from "./organismo/dadosDoRodape.jsx"
import { DadosDoCabecalho } from "./organismo/dadosDoCabecalho.jsx"

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
