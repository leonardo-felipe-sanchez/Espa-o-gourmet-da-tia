import { Botao } from "../../atomos/botao/Botao";
import { Input } from "../../atomos/input/Input";
import { Texto } from "../../atomos/Texto/Texto";

export const Formulario = ({ formulario }) => {

const lidarComEnvio = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        // Leia o JSON uma única vez e guarde na variável 'resultado'
        const resultado = await response.json();

        if (response.ok) {
            alert("Mensagem enviada com sucesso!");
            event.target.reset(); // Opcional: limpa o form após sucesso
        } else {
            alert("Erro do servidor: " + (resultado.error || "Tente novamente."));
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
        alert("Não foi possível conectar ao servidor.");
    }
};

  return (
    <form className={formulario.classe} onSubmit={lidarComEnvio}>
      <Texto classe={formulario.titulo.classe} como={formulario.titulo.como}>
        {formulario.titulo.texto}
      </Texto>
      {formulario.inputs.map((campo, index) => {
        return (
          <div key={index} className="mb-4">
            <label
              className=" text-gray-700 text-sm font-bold mb-2 hidden"
              htmlFor={campo.id}
            >
              {campo.label}
            </label>
            <Input
              id={campo.id}
              type={campo.type}
              name={campo.id}
              placeholder={campo.placeholder}
              defaultValue={campo.value}
              classe={campo.classe}
            />
          </div>
        );
      })}
      <Botao texto={formulario.botao.texto} classe={formulario.botao.classe} />
    </form>
  );
};
