import { Formulario } from "../../dados/dadosDoFormulario"
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal"

export const Login = () => {

    const formulario = Formulario({id:"3", dadosDaAPI:[], produto:{}});

    const PaginaLogin = {
        conteudos: [
            {
                classe: {
                    classe: "h-screen my-20 bg-cover bg-bottom-right flex flex-col items-center justify-center",
                },
                divisoria: 1,
                conteudos: [
                    {
                        conteudos:{
                            formulario: formulario[4]
                        }
                    }
                ]
            }
        ]
    }

    return console.log(formulario[4]), <ModeloDePaginaInicial sessionProps={PaginaLogin} />
}