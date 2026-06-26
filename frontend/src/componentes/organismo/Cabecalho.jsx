import { Lista } from "../moleculas/lista/Lista"

export const Cabecalho = (({classe, lista, direcionamento}) => {
    return(
<nav className={classe}>
<Lista lista={lista} direcionamento={direcionamento}/>
</nav>
    )
})