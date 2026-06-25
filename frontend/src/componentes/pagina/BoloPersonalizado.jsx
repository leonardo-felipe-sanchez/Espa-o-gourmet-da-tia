import { Formulario } from "../../dados/dadosDoFormulario"
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal"


export const BoloPersonalizado = () => {

    const formulario = Formulario({id:"2", dadosDaAPI:[], produto:{}});

    const PaginaBolo = {
        conteudos: [
            {
                classe: {
                    classe: "h-screen my-20 bg-cover bg-bottom-right flex flex-col items-center justify-center",
                },
                divisoria: 1,
                conteudos: [
                    {
                        conteudos:{
                            formulario: formulario[3]
                        }
                    }
                ]
            }
        ]
    }
    return console.log(formulario[3]), <ModeloDePaginaInicial sessionProps={PaginaBolo} />
}

