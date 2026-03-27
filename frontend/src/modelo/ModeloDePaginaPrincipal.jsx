import { Cabecalho } from "../organismo/Cabecalho"
import { Rodape } from "../organismo/Rodape"
import { Sessao } from "../organismo/sessoes"

export const ModeloDePaginaInicial = (({headerProps, footerProps, sessionProps}) => {
    return(
        <>
        {console.log("Modelo de pagina inicial")}
        {console.log(sessionProps)}
        <Cabecalho {...headerProps} />
        <Rodape {...footerProps}/>
        <Sessao {...sessionProps}/>
        </>
    )
})