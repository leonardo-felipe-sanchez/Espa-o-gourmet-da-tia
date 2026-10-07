import { Form, useLoaderData } from "react-router";
import { Formulario } from "../../dados/dadosDoFormulario";
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";

export function UmBolo() {
    const dados = useLoaderData();
  

  const Produto = {
    conteudos: [
      {
        classe: {
          identificador: "produto",
          classe: "h-fit mt-40 flex flex-col-reverse items-center justify-center mt-20 gap-y-10",
        },
        divisoria: 1,
        conteudos: [
          {
            classe: "w-full flex items-center justify-center",
            paragrafo: {
              classe: "text-center py-5 flex items-center justify-center gap-y-10 flex-col max-w-[80vw]",
              texto: [
                {
                  texto: dados.bolos.bolo[0].tema,
                  como: "h1",
                  classe: "text-5xl text-pink-500",
                },
                {
                  imagem:"oi",
                  classe: "w-80 rounded-lg shadow-md",
                  recurso: dados.bolos.bolo_imagem[0].signedUrl
                },
                {
                  texto: `DESCRICAO DO BOLO`,
                  como: "h2",
                  classe: "text-3xl text-pink-500",
                },
                {
                  texto: `Bolo de forma ${dados.bolos.bolo[0].forma}, com recheio de ${dados.bolos.bolo[0].recheio}, com massa de ${dados.bolos.bolo[0].massa} cobertura de ${dados.bolos.bolo[0].cobertura}  OBS: ${dados.bolos.bolo[0].descricao}`,
                },
                {
                  texto: `DESCRIÇÃO DO TOPPER`,
                  como: "h2",
                  classe: "text-3xl text-pink-300 max-w-[400px] text-center",
                },
                {
                  imagem:"oi",
                  classe: "w-80 rounded-lg shadow-md",
                  recurso: dados.bolos.topper_imagem[0].signedUrl
                },
                {
                  texto: dados.bolos.bolo[0].detalhamento_topper
                }
              ],
            },
          },
          {
            classe: "w-full flex items-center justify-center",
            
          }
        ],
      },
    ],
  };

return console.log(dados.bolos), <ModeloDePaginaInicial sessionProps={Produto} />;

}