import { Cabecalho } from "../organismo/Cabecalho"
import { Rodape } from "../organismo/Rodape"
import { Sessao } from "../organismo/Sessoes"

export const ModeloDePaginaInicial = ({headerProps = {}, footerProps = {}, sessionProps = {}}) => {
    return (
        <>
            {Object.keys(headerProps).length > 0 ? <Cabecalho {...headerProps} /> : null}
            {Object.keys(sessionProps).length > 0 ? Sessoes(sessionProps) : null}
            {Object.keys(footerProps).length > 0 ? <Rodape {...footerProps} /> : null}
        </>
    )
}

function Sessoes(sessionProps) {
    return <div className={sessionProps.classe}>
        {sessionProps?.conteudos?.map((sessao, index) => (
            <Sessao key={index} {...sessao} />
        ))}
    </div>
}
