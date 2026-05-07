import { Form, useParams, useLoaderData } from "react-router";

export function UmProduto() {
  const { produtoId } = useParams();
  const dados = useLoaderData();

  return (
    console.log(dados.categorias),
    (
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
            <input type="file" name="imagem" placeholder="manda imagem" />
          </div>

          <div className="flex items-center">
            <label className="bg-pink-500 p-2 border-3 border-pink-500 rounded-l-full text-white">
              Categoria
            </label>
            <select name="classinha" className="border-2 border-pink-500 p-3 rounded-r-full">
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
    )
  );
}
