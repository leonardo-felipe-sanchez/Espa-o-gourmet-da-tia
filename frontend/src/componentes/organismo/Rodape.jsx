import { Lista } from "../moleculas/lista/Lista";

export const Rodape = (({classe, lista, imagens, direcionamento})=>{
    return(
        <footer className={classe}>
            <Lista lista={lista} imagens={imagens} direcionamento={direcionamento}/>
        </footer>
    )
});