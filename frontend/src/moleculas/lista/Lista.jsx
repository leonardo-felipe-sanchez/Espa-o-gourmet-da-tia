import { Imagem } from "../../atomos/imagem/imagem";
import { Texto } from "../../atomos/Texto/Texto";

export const Lista = (({direcionamento, lista = [], imagens = []}) => {

    return(
        <ul className={direcionamento}>
        {
        Listao(lista)
        }
        {
            imagens ? (
                console.log(imagens),
                        Listao(imagens)
            )
            : 
            (
                console.log("vÊ se deu certo")
            )
        }


        </ul>
    )
});

function Listao(pista){
return(
    pista.map((item, chave) => {
        return (

            item.texto ?
                (
                    <li key={chave}><Texto como={item.como} referencia={item.recurso}>{item.texto}</Texto></li>)
                :
                (<li key={chave}><a href={item.recurso}><Imagem caminho={item.imagem} classe={item.classe} /></a></li>)
        );
    })
)
}