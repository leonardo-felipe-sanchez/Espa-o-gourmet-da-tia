import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";
import bolo from "../assets/bolo2.webp";
import ires from "../assets/ires.webp";
import marmitas from "../assets/marmitas.webp";
import coca from "../assets/coquinha.webp";
import coxinha from "../assets/coxinha.webp";
import brigadeiro from "../assets/brigadeirinho.webp";
import prato from "../assets/pratinho.webp";
import tortas from "../assets/tortinha-de-morango.webp";
import paoDeMel from "../assets/pao de mel.webp";
import { listaImagem } from "../moleculas/lista/listaImagem";

import { IconeS, IconeB, IconeM } from "../atomos/imagem/iconeS";

export const PaginaPrincipal = () => {
  const Testao = [
    {
      texto: "olos personalizados que te representam!",
      classe:
        "text-left text-3xl lg:text-4xl lg:w-3/4 text-pink-600",
      como: "h1",
    },
    {
      texto:
        "Aqui você tem a liberdade para criar, acompanhando cada processo em tempo real ",
      como: "p",
      classe:
        " text-center md:text-justify text-xl lg:w-3/4 lg:text-2xl md:w-[650px] px-10 pt-20 xl:pt-50 text-pink-600",
    },
    {
      texto: "obre mim",
      classe: "text-3xl md:text-4xl text-center text-pink-600",
      como: "h1",
    },
    {
      texto:
        "A história do Espaço Gourmet da Tia nasceu do talento e da paixão da Tia Ires por fazer bolos, um dom que rapidamente se tornou um negócio, conquistando uma base de clientes fiéis na Zona Norte de São Paulo",
      como: "p",
      classe: "pt-10 text-justify md:text-xl",
    },
    {
      texto:
        "Com a crescente demanda, ela inaugurou um espaço físico que, por sugestão de uma cliente, foi rebatizado com o nome que carrega até hoje. ",
      como: "p",
      classe: "pt-10 text-justify md:text-xl",
    },
    {
      texto:
        "Com quase 3 décadas de experiência, Tia Ires consolidou um legado de sabor e afeto, expandindo sua marca para atender a todas as ocasiões e a uma gama versátil de serviços, de refeições a bolos de casamento. ",
      como: "p",
      classe: "pt-10 text-justify md:text-xl mb-20",
    },
    {
      texto: "armitas fresquinhas!",
      classe: "text-3xl md:text-4xl text-center text-pink-600",
      como: "h1",
    },
    {
      texto: "Comida caseira e saudavel por um clique de distância.",
      como: "p",
      classe: "pt-10 text-2xl text-center",
    },
    {
      texto: "Faça seu pedido e receba na sua casa!",
      como: "p",
      classe: "pt-10 text-2xl text-center",
    },
    {
      texto: "Kit festa",
      como: "h2",
      classe: "text-2xl text-center text-pink-500 font-bold",
    },
    {
      texto: "Bolo + docinho",
      como: "p",
      classe: "text-lg text-center text-pink-500",
    },
    {
      texto: "Brigadeiros variados a seu gosto!",
      como: "p",
      classe: "text-lg text-center text-pink-500",
    },
    {
      texto: "Cesta café da manhã e tarde",
      como: "h2",
      classe: "text-2xl text-center text-pink-500 font-bold",
    },
    {
      texto: "Monte a sua cesta com suas marcas favoritas",
      como: "p",
      classe: "text-lg text-center text-pink-500",
    },
    {
      texto: "Torta de morango",
      como: "h2",
      classe: "pt-2 text-center text-pink-500 text-2xl font-bold",
    },
    {
      texto: "Recheio de doçe de leite e brigadeiro",
      como: "p",
      classe: "pt-2 text-lg text-center text-pink-500",
    },
    {
      texto: "VER MAIS",
      como: "a",
      classe:
        "pt-2 text-center text-white border-solid border-2 border-white rounded-[50px] cursor-pointer px-4 py-2",
      recurso: "#almoco",
    },
  ];

  const Caixas = [
    {
      imagem: {
        imagem: brigadeiro,
        classe: "w-75 h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [Testao[9], Testao[10], Testao[11]],
      },
      classe:
        "flex-shrink-0 bg-white w-[300px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
    },
    {
      imagem: {
        imagem: prato,
        classe: "w-75 h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [Testao[12], Testao[13]],
      },
      classe:
        "flex-shrink-0 bg-white w-[300px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
    },
    {
      imagem: {
        imagem: paoDeMel,
        classe: "w-75 h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-7 flex flex-col justify-center items-center",
        texto: [Testao[14], Testao[15]],
      },
      classe:
        "flex-shrink-0 bg-white w-[300px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
    },
    {
      imagem: {
        imagem: tortas,
        classe: "w-75 h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [Testao[14], Testao[10], Testao[11]],
      },
      classe:
        "flex-shrink-0 bg-white w-[300px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
    },
    {
      titulo: {
        texto: "Salgados",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      imagem: { imagem: coxinha, classe: "w-[400px] rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-600 flex flex-col justify-center items-center rounded-b-[40px] size-[400px] p-5",
        texto: [Testao[16]],
      },
      classe:
        "w-[400px] h-[400px] flex flex-col justify-center items-center rounded-[20px] mx-6",
      tipo: "imagem"
    },
    {
      titulo: {
        texto: "Bebidas",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      imagem: { imagem: coca, classe: "w-[400px] rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-500 flex flex-col justify-center items-center rounded-b-[40px] w-[400px] p-5",
        texto: [Testao[16]],
      },
      classe:
        "flex-shrink-0 w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-6",
      tipo: "imagem"
    },
    {
      titulo: {
        texto: "Sobremesas",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      imagem: { imagem: brigadeiro, classe: "w-[400px] rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-400 flex flex-col justify-center items-center rounded-b-[40px] w-[400px] p-5",
        texto: [Testao[16]],
      },
      classe:
        "flex-shrink-0 w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-6",
      tipo: "imagem"
    },
  ];

  const Formulario = {
    titulo: {
      texto: "Envie mensagem",
      classe: "text-3xl font-bold text-pink-500 m-3 text-pink-500",
      como: "h1",
    },
    classe:
      "flex items-center justify-center flex-col gap-4 w-full xl:w-110 border border-pink-500 rounded-[1vw] p-10",
    inputs: [
      {
        id: "nome",
        label: "Nome",
        type: "text",
        placeholder: "NOME",
        defaultValue: "",
        classe:
          " m-1 p-3 border hover:border-2 border-pink-400 w-80 rounded-[1vw] text-center ",
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "EMAIL",
        defaultValue: "",
        classe: "m-1 p-3 hover:border-2 border border-pink-500 w-80 rounded-[1vw] text-center",
      },
      {
        id: "telefone",
        label: "Telefone",
        type: "tel",
        placeholder: "TELEFONE",
        defaultValue: "",
        classe: "m-1 p-3 border hover:border-2 border-pink-500 w-80 rounded-[1vw] text-center",
      },
      {
        id: "mensagem",
        label: "Mensagem",
        type: "textarea",
        placeholder: "MENSAGEM",
        defaultValue: "",
        classe:
          "caret-pink-600 m-1 p-3 border hover:border-2 border-pink-500 w-80 rounded-[1vw] h-32 text-center",
      },
    ],
    botao: {
      texto: "Enviar",
      classe:
        "transition delay-150 duration-300 ease-in-out hover:-translate-y-1 bg-pink-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-pink-600 transition-colors duration-300 rounded-[2vw]",
    },
  };

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
            // Criamos um "container" para a capitular
            texto: (
              <div className="flex items-center justify-start w-[80vw] mx-auto">
                {/* O SVG com tamanho controlado, não w-full */}
                <IconeB classe="size-22 left-4 -top-10 md:-top-5 lg:-top-3 relative text-pink-600" /> 
                <span className={Testao[0].classe}>
                  {Testao[0].texto}
                </span>
              </div>
            ),
            como: "h1"
          },
          Testao[1] // O resto do texto
        ]
      }
    }
  ]
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
  classe: "h-auto py-20 flex flex-col items-center justify-center z-1 relative",
  paragrafo: {
    classe: "z-2 relative px-10 max-w-4xl",
    texto: [
          {texto: (
      <div className="flex items-center justify-center w-full mb-10">
        {/* Ajustei o top e removi o left-4 para centralizar */}
        <IconeS classe="size-24 relative left-5.5 -top-2 md:-top-4 text-pink-600" /> 
                <span className={Testao[2].classe}>
                  {Testao[2].texto}
                </span>
      </div>
    ),
    como: "h1"},
      Testao[3], 
      Testao[4], 
      Testao[5]],
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
                {texto: (
      <div className="flex items-center justify-center w-full mb-10">
        {/* Ajustei o top e removi o left-4 para centralizar */}
        <IconeM classe="size-24 relative left-4 -top-2 text-pink-600" /> 
                <span className={Testao[6].classe}>
                  {Testao[6].texto}
                </span>
      </div>
    ),
    como: "h1"},
                 Testao[7], Testao[8]],
            },
          },
          {
            classe: `h-120 w-full rounded-b-[4vw] xl:rounded-r-[4vw] xl:rounded-bl-[0vw] `,
            imagem: {
              imagem: marmitas,
              classe: "w-[95vw] xl:w-[41vw] rounded-b-[9vw] xl:rounded-l-[0vw] xl:rounded-r-[4vw]",
            },
          },
        ],
      },
      {
        classe: {
          identificador: "produtinho",
          classe: "px-7 py-10",
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
            classe: "px-7 flex items-center justify-center mb-20",
            conteudos: {
              classe: "w-full flex items-center justify-center",
              formulario: Formulario,
            },
          },
        ],
      },
    ],
    classe: "w-full flex flex-col",
  };

  return (
    <>
      <ModeloDePaginaInicial sessionProps={PaginaInicial} />
    </>
  );
};
