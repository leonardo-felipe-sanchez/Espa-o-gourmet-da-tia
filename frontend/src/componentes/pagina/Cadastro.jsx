import { Formulario } from "../../dados/dadosDoFormulario" 
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal"

export const Cadastro = () => {

    const formulario = Formulario({id:"3", dadosDaAPI:[], produto:{}});

    const PaginaCadastro = {
        conteudos: [
            {
                classe: {
                    classe: "h-screen my-20 bg-cover bg-bottom-right flex flex-col items-center justify-center",
                },
                divisoria: 1,
                conteudos: [
                    {
                        conteudos:{
                            formulario: formulario[5]
                        }
                    }
                ]
            }
        ]
    }

    return console.log(formulario[5]), <ModeloDePaginaInicial sessionProps={PaginaCadastro} />

}