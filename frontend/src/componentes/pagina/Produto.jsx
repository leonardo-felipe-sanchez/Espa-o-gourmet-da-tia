import { Form, useParams, useLoaderData } from "react-router";
import { Formulario } from "../../dados/dadosDoFormulario";
import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";

export function UmProduto() {
  const { produtoId } = useParams();
  const dados = useLoaderData();
  const formulario = Formulario({id: produtoId, produto:dados.produto, dadosDaAPI:dados.categorias});

  const Produto = {
    conteudos: [
      {
        classe: {
          identificador: "produto",
          classe: "h-screen flex flex-col-reverse items-center justify-center mt-20 gap-y-10",
        },
        divisoria: 1,
        conteudos: [
          {
            classe: "w-full flex items-center justify-center",
            paragrafo: {
              classe: "text-center py-5 flex items-center justify-center gap-y-10 flex-col",
              texto: [
                {
                  texto: String(dados.produto.nome),
                  como: "h2",
                  classe: "text-5xl text-pink-500",
                },
                {
                  texto: `Preço: R$ ${dados.produto.preco}`,
                  como: "h2",
                  classe: "text-3xl text-pink-400",
                },
                {
                  texto: `${dados.produto.descricao}`,
                  como: "p",
                  classe: "text-xl text-pink-300 max-w-[400px] text-center",
                }
              ],
            },
          },
          {
            classe: "w-full flex items-center justify-center",
            imagem: {
              imagem: dados.produto.imagem,
              classe: "w-80 rounded-lg shadow-md",
            },
          },
        ],
      },
      {
        classe: {
          classe: "h-screen flex items-center justify-center",
        },
        divisoria: 1,
        conteudos: [
          {
            classe: "w-full flex items-center justify-center",
            conteudos: {
              classe: "w-full flex items-center justify-center",
              formulario: formulario[2], // Assuming the third form is for editing
            },
          },
        ],
      },
    ],
  };

return <ModeloDePaginaInicial sessionProps={Produto} />;

  /**
   * return (
    <div className="h-screen flex flex-col justify-center items-center gap-y-5 mt-20">
      <div className="my-5 flex flex-col items-center gap-y-5">
        <h2>{dados.produto.nome}</h2>

        {dados?.produto?.imagem && (
          <img
            src={dados?.produto?.imagem}
            alt={dados.produto?.nome}
            className="w-80 rounded-lg shadow-md"
          />
        )}
      </div>

      <Form
        method="patch"
        encType="multipart/form-data"
        className="flex flex-col items-center gap-y-10"
      >
        <h2>Editando produto: {produtoId}</h2>

        <div className="flex items-center">
          <label className="bg-pink-500 p-2 border-2 border-pink-500 rounded-l-full text-white">
            Nome
          </label>
          <input
            name="nome"
            type="text"
            defaultValue={dados?.produto?.nome}
            className="border-2 border-pink-500 text-pink-500 p-2 rounded-r-full text-center"
          />
        </div>

        <div className="flex items-center border-2 border-pink-500 rounded-full">
          <label className="bg-pink-500 p-2 border-2 border-pink-500 rounded-l-full text-white mr-10">
            Imagem
          </label>
          <input className="w-100" type="file" name="imagem" />
        </div>

        <div className="flex items-center">
          <label className="bg-pink-500 p-2 border-3 border-pink-500 rounded-l-full text-white">
            Categoria
          </label>
          <select
            name="classinha"
            className="border-2 border-pink-500 p-3 rounded-r-full"
          >
            {dados.categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-pink-500 text-white p-4 rounded-full"
        >
          Atualizar agora
        </button>
      </Form>
    </div>
  );
   */
}