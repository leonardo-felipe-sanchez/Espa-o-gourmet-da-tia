import brigadeiro from "../assets/brigadeirinho.webp";
import prato from "../assets/pratinho.webp";
import paoDeMel from "../assets/pao de mel.webp";
import tortas from "../assets/tortinha-de-morango.webp";
import coca from "../assets/coquinha.webp";
import coxinha from "../assets/coxinha.webp";
import { IconeBolo, IconeTopper } from "../componentes/atomos/imagem/iconeS";

export const GetCaixas = (textosFixos, dadosDaAPI = []) => {

  if (!textosFixos || textosFixos.length === 0) return [];
  if (dadosDaAPI.length < 1) {
    return [
      {
        imagem: {
          imagem: brigadeiro,
          classe:
            "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
        },
        texto: {
          classe: " w-[240px] py-5 flex flex-col justify-center items-center",
          texto: [textosFixos[9], textosFixos[10], textosFixos[11]],
        },
        classe:
          "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
        tipo: {
          //caminho: `/produtos/deletar/${produto.id}`,
          //comando: `deletar`
          caminho: `/produtos/4`,
          comando: `criar`,
        },
      },
      {
        imagem: {
          imagem: prato,
          classe:
            "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
        },
        texto: {
          classe: " w-[240px] py-5 flex flex-col justify-center items-center",
          texto: [textosFixos[12], textosFixos[13]],
        },
        classe:
          "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
        tipo: {
          caminho: `/produtos/2`,
          comando: `criar`,
        },
      },
      {
        imagem: {
          imagem: paoDeMel,
          classe:
            "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
        },
        texto: {
          classe: " w-[240px] py-7 flex flex-col justify-center items-center",
          texto: [textosFixos[21], textosFixos[15]],
        },
        classe:
          "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
        tipo: {
          //caminho: `/produtos/deletar/${produto.id}`,
          //comando: `deletar`
          caminho: `/produtos/1`,
          comando: `criar`,
        },
      },
      {
        imagem: {
          imagem: tortas,
          classe:
            "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
        },
        texto: {
          classe: " w-[240px] py-5 flex flex-col justify-center items-center",
          texto: [textosFixos[14], textosFixos[10], textosFixos[11]],
        },
        classe:
          "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
        tipo: {
          caminho: `/produtos/3`,
          comando: `criar`,
        },
      },
      {
        titulo: textosFixos[19],
        imagem: {
          imagem: coxinha,
          classe: "w-[80vw] max-w-[400px] rounded-t-[20px]",
        },
        texto: {
          classe:
            "bg-pink-600 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
          texto: [textosFixos[23]],
        },
        classe:
          "w-full max-w-[400px] h-[400px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
        tipo: "imagem",
      },
      {
        titulo: textosFixos[17],
        imagem: {
          imagem: coca,
          classe: " w-[80vw] max-w-[400px]  rounded-t-[20px]",
        },
        texto: {
          classe:
            "bg-pink-500 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
          texto: [textosFixos[24]],
        },
        classe:
          "flex-shrink-0 w-[80vw] max-w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
        tipo: "imagem",
      },
      {
        titulo: textosFixos[18],
        imagem: {
          imagem: brigadeiro,
          classe: "w-full max-w-[400px] rounded-t-[20px]",
        },
        texto: {
          classe:
            "bg-pink-400 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
          texto: [textosFixos[22]],
        },
        classe:
          "flex-shrink-0 w-[80vw] max-w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
        tipo: "imagem",
      },
    ];
  } else if (dadosDaAPI?.bolo) {
    let index = 0;

    return [
      ...dadosDaAPI.bolo.map((bolo) => {
        return {
          classe:
            "flex flex-col sm:flex-row gap-x-2 items-center w-[350px] sm:w-[600px] outline outline-offset-2 rounded-[50px] mx-3 pointer",
          titulo: { texto: bolo.tema, como: "h2", classe: "hidden" },
          imagem: {
            imagem: dadosDaAPI.bolo_imagem[index].signedUrl,
            classe:
              "w-[350px] sm:w-full sm:max-w-[250px] h-[350px] bg-cover bg-center rounded-t-[50px] sm:rounded-l-[50px]",
          },
          texto: {
            classe:
              "grid grid-cols-2 justify-center items-center gap-y-10 p-5 bg-pink-100 rounded-b-[50px]  sm:rounded-r-[50px] h-[350px] w-[350px]",
            texto: [
              {
                texto: (
                  <div className="flex gap-x-2 ">
                    <IconeBolo classe=" size-7 -top-1 relative text-pink-600" />
                    <span className="text-pink-600  text-2xl mr-5">Bolo:</span>
                  </div>
                ),
                como: "h2",
                classe: "text-pink-600  text-2xl",
              },
              {
                texto: bolo.tema,
                como: "p",
                classe: "text-pink-400 tracking-[1px] font-bold text-xl",
              },
              {
                texto: (
                  <div className="flex gap-x-2 ">
                    <IconeTopper classe=" size-8 -top-1 relative text-pink-600" />
                    <span className="text-pink-600  text-xl mr-5">Topper:</span>
                  </div>
                ),
                como: "h2",
                classe: "text-pink-600  text-xl",
              },
              {
                texto: bolo.detalhamento_topper,
                como: "p",
                classe: "text-pink-400 tracking-[1px] font-bold text-xl",
              },
            ],
            botao: {
              classe: "bg-pink-500 text-white p-3 relative z-3 pointer",
              texto: "deletar",
              forme: `/bolo/deletar/${bolo.id}`,
            },
          },
          tipo: {
            //caminho: `/produtos/deletar/${produto.id}`,
            //comando: `deletar`
            caminho: `/bolo-personalizado/${bolo.id}`,
            comando: `criar`,
          },
        };
      }),
    ];
  } else if (dadosDaAPI[0].tipo.tipo) {
    return [
      ...dadosDaAPI.map((produto) => {
        return {
          classe:
            "flex flex-col gap-x-5 items-center w-[300px] bg-pink-400 rounded-t-[50px] mx-6 pointer",
          titulo: { texto: produto.tipo.tipo, como: "h2", classe: "hidden" },
          imagem: {
            imagem: produto.imagem,
            classe:
              "w-full max-w-[300px] h-[350px] bg-cover bg-center rounded-t-[50px]",
          },
          texto: {
            classe: "flex flex-col justify-center items-center gap-y-2 p-5",
            texto: [
              {
                texto: produto.nome,
                como: "h2",
                classe: "text-white  text-2xl text-center",
              },
              {
                texto: `R$ ${produto.preco}`,
                como: "p",
                classe: "text-white font-bold text-xl",
              },
            ],
            botao: {
              classe: "bg-pink-500 text-white p-3 relative z-3 pointer",
              texto: "deletar",
              forme: `/produtos/deletar/${produto.id}`,
            },
          },
          tipo: {
            //caminho: `/produtos/deletar/${produto.id}`,
            //comando: `deletar`
            caminho: `/produtos/${produto.id}`,
            comando: `criar`,
          },
        };
      }),
    ];
  }
};
