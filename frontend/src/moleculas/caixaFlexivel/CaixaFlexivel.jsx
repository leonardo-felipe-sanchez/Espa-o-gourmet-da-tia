import {Imagem} from "../../atomos/imagem/imagem";
import { Paragrafo } from "../Paragrafos/Paragrafo";
import { Texto } from "../../atomos/Texto/Texto";

export const CaixaFlexivel = ({imagem, texto, classe, titulo, tipo}) =>{
    return (
        <div className={classe}>
            {titulo ? <Texto como={titulo.como} classe={titulo.classe}> {titulo.texto} </Texto> : null}
            {tipo == "imagem" ? <Imagem classe={imagem.classe} caminho={imagem.imagem} /> : <div className={`${imagem.classe}`} style={{backgroundImage: `url(${imagem.imagem})`}}></div>}
            
            <Paragrafo classe={texto.classe} textos={texto.texto} />
        </div>
    );
}