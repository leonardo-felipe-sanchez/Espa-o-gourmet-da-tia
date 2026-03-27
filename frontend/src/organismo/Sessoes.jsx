import { Imagem } from "../atomos/imagem/imagem";
import { Paragrafo } from "../moleculas/Paragrafos/Paragrafo";

export const Sessao = (({classe, divisoria, imagem, conteudos=[] }) => {
return(
    <section id={classe.identificador} className={classe.classe}>
{console.log(imagem)}
        {Divisor(divisoria, conteudos)}
    </section>
)
})

function Divisor({divisoria, conteudos}) {
    conteudos.map((conteudo, indexador) => {
        return(
            <div key={indexador} className={`w-1/${divisoria} ${conteudo.classe}`}>
                <Paragrafo classe={conteudo.paragrafo.classe} textos={conteudo.paragrafo.texto}/>
            </div>
        )
    })
}