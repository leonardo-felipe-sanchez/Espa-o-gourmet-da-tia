import { Imagem } from "../atomos/imagem/imagem";
import { Paragrafo } from "../moleculas/Paragrafos/Paragrafo";

export const Sessao = ({ classe ={}, divisoria, imagem = {} , conteudos = [] }) => {
     const estiloFundo = imagem?.imagem ? { backgroundImage: `url(${imagem.imagem})` } 
        : {};
    return (
        <section id={classe.identificador} className={classe?.classe} style={estiloFundo}>
            
            {Divisor(divisoria, conteudos)}
        </section>
    )
}

function Divisor(divisoria, conteudos) {
    if (!conteudos || conteudos.length === 0) return null;

    const larguras = {
        1: "w-full",
        2: "w-9/12",
        3: "w-7/12",
        4: "w-1/2",
        5: "w-1/3"
    };

    return conteudos.map((conteudo, indexador) => (
        <div key={indexador} className={`${larguras[divisoria] || "w-full"} ${conteudo?.classe || ""}`}>
            <Paragrafo 
                classe={conteudo?.paragrafo?.classe} 
                textos={conteudo?.paragrafo?.texto || []} 
            />
            <Imagem caminho={conteudo?.imagem?.imagem} classe={conteudo?.imagem?.classe}/>
        </div>
    ));
}