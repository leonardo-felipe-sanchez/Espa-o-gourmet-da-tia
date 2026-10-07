import { Formulario } from "../../dados/dadosDoFormulario"
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal"
import { getTestao } from "../../dados/dadosDoTexto";
import { GetCaixas } from "../../dados/dadosDaCaixa";
import {
  Link,
  useLoaderData,
  Outlet,
} from "react-router";
import { useParams } from "react-router";

export const ListaBolo = () => {

const resultado = useLoaderData();
  const { dadosDaAPI, textosFixos} = getTestao(resultado);

  const {boloId} = useParams();

    const caixas = GetCaixas(textosFixos, dadosDaAPI).filter(
    (caixa) => typeof caixa.tipo === "object",
  );

    const PaginaBolos = {

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
                  texto: "Meus Bolos",
                  como: "h2",
                  classe: "uppercase font-titulo",
                },
              ],
            },
          },
                              {
            classe:
              "flex flex-col-reverse items-center justify-center gap-y-10 h-fit",
            caixa: {
              classe:
                "flex gap-10 flex-wrap w-[80vw] items-center justify-center py-10",
              caixas: caixas,
            },
          },
                ]
            }
        ],
            subrota: boloId,
    }

    return console.log(boloId) ,<ModeloDePaginaInicial sessionProps={PaginaBolos} />
}