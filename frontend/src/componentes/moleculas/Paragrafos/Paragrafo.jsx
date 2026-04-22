import { Texto } from "../../atomos/Texto/Texto"

export const Paragrafo =(({classe, textos})=> (
    <div className={classe}>
        {textos.map((textinho, index)=>{
            return(
                <Texto key={index+10} como={textinho.como} referencia={textinho.recurso} classe={textinho.classe}>{textinho.texto} </Texto>
            )
        })}
    </div>
))