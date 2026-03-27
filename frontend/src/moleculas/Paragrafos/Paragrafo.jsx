import { Texto } from "../../atomos/Texto/Texto"

export const Paragrafo =((classe, textos)=> {
    return(
        <div className={classe}>
            <Texto como={textos.como}>{textos.texto}</Texto>
        </div>
    )
})