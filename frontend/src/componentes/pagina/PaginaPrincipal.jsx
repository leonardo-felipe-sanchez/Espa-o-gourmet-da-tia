import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";
import bolo from "../../assets/bolo2.webp";
import ires from "../../assets/ires.webp";
import marmitas from "../../assets/marmitas.webp";
import { listaImagem } from "../../dados/listaImagem.jsx";
import { getTestao } from "../../dados/dadosDoTexto.js";
import { GetCaixas } from "../../dados/dadosDaCaixa.jsx";
import { Formulario } from "../../dados/dadosDoFormulario.jsx";
import { IconeS, IconeB, IconeM } from "../atomos/imagem/iconeS";

export const PaginaPrincipal = () => {

  const Testao = getTestao().textosFixos;
  
  const { dadosDaAPI, textosFixos } = getTestao();
  const Caixas = GetCaixas(textosFixos, dadosDaAPI);
  const formulario = Formulario({id:"1", dadosDaAPI:dadosDaAPI, produto:{}});
  const PaginaInicial = {
    conteudos: [
      {
        classe: {
          identificador: "inicial",
          classe: "h-screen min-h-[600px] bg-cover bg-bottom-right",
        },
        divisoria: 3,
        imagem: { imagem: bolo, classe: "" },
        conteudos: [
          {
            classe: " flex pt-55 gap-x-2 h-screen",
            paragrafo: {
              classe: "relative",
              texto: [
                {
                  texto: (
                    <div className="flex items-center justify-start w-[80vw] mx-auto sm:pl-15">
                      <IconeB classe=" size-18 sm:size-22 -top-8 left-4 sm:-top-10 md:-top-5 lg:-top-3 relative text-pink-600" />
                      <span className={Testao[0].classe}>
                        {Testao[0].texto}
                      </span>
                    </div>
                  ),
                  como: "h1",
                },
                Testao[1],
              ],
            },
          },
        ],
      },
      {
        classe: {
          identificador: "sobreMim",
          classe: "py-20 flex flex-col-reverse xl:flex-row my-10 ",
        },
        divisoria: 4,
        conteudos: [
          {
            classe:
              "h-100 xl:h-150 flex flex-col md:flex-row items-center justify-center",
            imagem: {
              imagem: ires,
              classe: "w-[70vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw]",
            },
          },
          {
            classe:
              "h-auto py-20 flex flex-col items-center justify-center z-1 relative",
            paragrafo: {
              classe: "z-2 relative px-10 max-w-4xl",
              texto: [
                {
                  texto: (
                    <div className="flex items-center justify-center w-full mb-10">
                      {/* Ajustei o top e removi o left-4 para centralizar */}
                      <IconeS classe="size-24 relative left-5.5 -top-2 md:-top-4 text-pink-600" />
                      <span className={Testao[2].classe}>
                        {Testao[2].texto}
                      </span>
                    </div>
                  ),
                  como: "h1",
                },
                Testao[3],
                Testao[4],
                Testao[5],
              ],
            },
          },
        ],
      },
      {
        classe: {
          identificador: "confeitaria",
          classe:
            "flex flex-col-reverse xl:flex-row mx-7 md:mx-14 lg:mx-20 my-20 gap-y-10 rounded-[4vw] bg-pink-100",
        },
        divisoria: 4,
        conteudos: [
          {
            classe:
              "h-180 rounded-b-[4vw] xl:rounded-l-[4vw] bg-pink-100 flex flex-col items-center justify-center pt-10",
            caixa: {
              classe:
                "flex flex-nowrap overflow-x-scroll overscroll-contain h-155 gap-x-6 w-11/12",
              caixas: Caixas.slice(0, 4),
            },
          },
          {
            classe:
              "rounded-t-[4vw] xl:rounded-l-[0vw] xl:rounded-r-[4vw] bg-pink-400 h-180",
          },
        ],
      },
      {
        classe: {
          identificador: "marmita",
          classe: "flex flex-col xl:flex-row px-7 py-10",
        },
        divisoria: 4,
        conteudos: [
          {
            classe:
              " h-120 rounded-t-[4vw] xl:rounded-r-[0vw] xl:rounded-l-[4vw] bg-pink-100 p-17 xl:ml-20 flex flex-col items-center justify-center",
            paragrafo: {
              classe: "z-2 relative ",
              texto: [
                {
                  texto: (
                    <div className="flex items-center justify-center w-full mb-10">
                      <IconeM classe="size-24 relative left-13.5 -top-7 sm:-top-4 sm:left-5.5 text-pink-600" />
                      <span className={Testao[6].classe}>
                        {Testao[6].texto}
                      </span>
                    </div>
                  ),
                  como: "h1",
                },
                Testao[7],
                Testao[8],
              ],
            },
          },
          {
            classe: `xl:h-120 w-full rounded-b-[4vw] xl:rounded-r-[4vw] xl:rounded-bl-[0vw] `,
            imagem: {
              imagem: marmitas,
              classe:
                "w-[95vw] xl:w-[41vw] rounded-b-[9vw] xl:rounded-l-[0vw] xl:rounded-r-[4vw] xl:h-120",
            },
          },
        ],
      },
      {
        classe: {
          identificador: "produtinho",
          classe: " px-7 py-10",
        },
        divisoria: 1,
        conteudos: [
          {
            classe: "py-30 xl:py-60 flex items-center justify-center",
            caixa: {
              classe:
                "flex flex-col lg:flex-row flex-wrap items-center justify-center gap-y-100 xl:gap-x-6",
              caixas: Caixas.slice(4, 7),
            },
          },
        ],
      },
      {
        classe: {
          identificador: "converse-conosco",
          classe:
            "xl:h-190 flex flex-col xl:flex-row xl:px-7 xl:py-10 items-center",
        },
        divisoria: 4,
        conteudos: [
          {
            classe:
              "xl:border-r-2 xl:border-r-pink-500 flex flex-col xl:flex-row items-center justify-center pb-10 mb-20 border-b-2 border-b-pink-500 xl:border-b-0 w-[80vw]",
            lista: {
              direcionamento:
                "xl:w-50 xl:mr-20 flex flex-row xl:flex-col items-center justify-center h-[200px]",
              lista: listaImagem,
            },
            redesocial: "oi",
          },
          {
            classe: "px-auto flex items-center justify-center mb-20",
            conteudos: {
              classe: "w-full flex items-center justify-center",
              formulario: formulario[0],
            },
          },
        ],
      },
    ],
    classe: "w-full flex flex-col pb-20",
  };

  return (
    <>
    {console.log(formulario[0])},
      <ModeloDePaginaInicial sessionProps={PaginaInicial} />
    </>
  );
};