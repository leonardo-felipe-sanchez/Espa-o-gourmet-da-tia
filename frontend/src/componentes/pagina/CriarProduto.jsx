import { Form, useLoaderData } from "react-router";
import { Formulario } from "../../dados/dadosDoFormulario.jsx";
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";

export function CriarProduto() {
  const resultado = useLoaderData().classe;

  const formulario = Formulario({ dadosDaAPI: resultado });

  const PaginaProduto = {
    conteudos: [
      {
        classe: {
          identificador: "criarProduto",
          classe: "h-screen flex items-center justify-center",
        },
        divisoria: 1,
        conteudos: [
          {
          classe: "w-full flex items-center justify-center",
          conteudos: {
            classe: "w-full flex items-center justify-center",
            formulario: formulario[1],
          },
        }
      ],
      },
    ],
  };

  return <ModeloDePaginaInicial sessionProps={PaginaProduto} />;
  } 