import { Form, useLoaderData } from "react-router";
export function CriarProduto() {
  const resultado = useLoaderData().classe;

  return (
    console.log(resultado),
    (
      <Form method="POST" encType="multipart/form-data">
        <div className="h-screen flex flex-col items-center justify-center gap-y-15">
          <h2>Criar nova tarefa</h2>
          <div className="flex items-center">
            <label className="bg-pink-500 p-2 border-2 border-pink-500 rounded-l-full text-white">
              Nome
            </label>

            <input
              name="nome"
              type="text"
              placeholder="escreva aqui a nova tarefa"
              className="border-2 border-pink-500 placeholder:text-pink-300 p-2 rounded-r-full"
            />
          </div>

          <div className="flex items-center">
            <label className="bg-pink-500 p-2 border-2 border-pink-500 rounded-l-full text-white">
              imagem
            </label>
            <input type="file" name="imagem" placeholder="manda imagem" />
          </div>

         <div className="flex items-center">
          <label className="bg-pink-500 p-2 border-2 border-pink-500 rounded-l-full text-white">
              Categoria
          </label>
          <select name="classinha" className="border-2 border-pink-500 p-2 rounded-r-full">
            {resultado.map((categoria) => (
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
            criar agora
          </button>
        </div>
      </Form>
    )
  );
}
