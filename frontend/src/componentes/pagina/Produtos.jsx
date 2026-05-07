import { getTestao } from "../../dados/dadosDoTexto";
import { GetCaixas } from "../../dados/dadosDaCaixa";
import {
  useLocation,
  Link,
  useLoaderData,
  useParams,
  Outlet,
} from "react-router";
import { CaixaFlexivel } from "../moleculas/caixaFlexivel/CaixaFlexivel";
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";

export const Produtos = () => {
  const { produtoId, categoriao } = useParams();
  const location = useLocation();

  const EstaNaSubRota = produtoId || location.pathname.endsWith("/criar") || categoriao;

  const resultado = useLoaderData();
  const { dadosDaAPI, textosFixos, classesDaAPI } = getTestao(resultado);

  const caixas = GetCaixas(textosFixos, dadosDaAPI).filter(
    (caixa) => typeof caixa.tipo === "object",
  );

  const PaginaProdutos = location.pathname === `/produtos/filtro/${categoriao}` ? 
{
    conteudos: [
      {
        classe: {
          identificador: "produtos",
          classe:
            "flex flex-col justify-center items-center max-h-max mt-30 mb-10",
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
                  texto: String(categoriao),
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
              caixas: caixas.filter((caixa) => caixa.titulo?.texto === categoriao),
            },
          },
        ],
      },
      {
        classe: "flex flex-col items-center justify-center gap-y-10 h-fit ",
        paragrafo: {
          classe: "",
          texto: [textosFixos[20]],
        },
      },
    ],
}
: 
{
    conteudos: [
      {
        classe: {
          identificador: "produtos",
          classe:
            "flex flex-col justify-center items-center max-h-max mt-30 mb-10",
        },
        divisoria: 1,
        conteudos: [
          ...classesDaAPI.flatMap((categoria) => {
            const ProdutosCategoria = caixas.filter(
              (caixa) => caixa.titulo?.texto === categoria,
            );

            if (ProdutosCategoria.length === 0) {
              return [];
            }

            return [
              {
                classe:
                  "text-pink-500 font-bold flex items-center justify-center",
                paragrafo: {
                  classe:
                    "text-center py-5 flex items-center justify-center text-3xl",
                  texto: [
                    {
                      texto: String(categoria),
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
                  caixas: ProdutosCategoria,
                },
              },
            ];
          }),
          {
            classe: "flex flex-col items-center justify-center gap-y-10 h-fit ",
            paragrafo: {
              classe: "",
              texto: [textosFixos[20]],
            },
          },
        ],
      },
    ],
    classe: "",
    subrota: EstaNaSubRota,
  };

  return console.log(categoriao),<ModeloDePaginaInicial sessionProps={PaginaProdutos} />;
};
