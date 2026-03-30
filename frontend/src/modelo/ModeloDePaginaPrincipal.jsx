import { Cabecalho } from "../organismo/Cabecalho"
import { Rodape } from "../organismo/Rodape"
import { Sessao } from "../organismo/Sessoes"

export const ModeloDePaginaInicial = ({headerProps, footerProps, sessionProps}) => {
    return(
        <>
        <Cabecalho {...headerProps} />
        {sessionProps.map((sessao, index) =>{
        return(<Sessao key={index+100} {...sessao}/>)
        })
        }
        <Rodape {...footerProps}/>
        </>
    )
}