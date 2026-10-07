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
            classe:
              "text-pink-500 font-bold flex items-center justify-center",
            paragrafo: {
              classe:
                "text-center py-5 flex items-center justify-center text-3xl",
              texto: [
                {
                  texto: "LOGIN",
                  como: "h2",
                  classe: "uppercase font-titulo",
                },
              ],
            },
          },
                    {
                        conteudos:{
                            formulario: formulario[4]
                        }
                    }
                ]
            }
        ]
    }

    return <ModeloDePaginaInicial sessionProps={PaginaLogin} />
}