import { Form } from "react-router";
import { Botao } from "../../atomos/botao/Botao";
import { Input } from "../../atomos/input/Input";
import { Texto } from "../../atomos/Texto/Texto";
import { useState } from "react";

export const Formulario = ({ formulario }) => {
  const formular = { formulario };

  const [formularioParticionado, setFormularioParticionado] = useState(0);

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

      const resultado = await response.json();

      if (response.ok) {
        alert("Mensagem enviada com sucesso!");
        event.target.reset();
      } else {
        alert("Erro do servidor: " + (resultado.error || "Tente novamente."));
      }
    } catch (error) {
      console.error("Erro na conexão:", error);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  if (formular.formulario.subimitar === "lidar com envio") {
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
        <Botao
          texto={formulario.botao.texto}
          classe={formulario.botao.classe}
        />
      </form>
    );
  } else {
    if (typeof formular.formulario.titulo.texto === "string") {
      return (
        <Form
          method={formulario.metodo}
          encType={formulario.subimitar}
          className={formulario.classe}
        >
          <Texto
            classe={formulario.titulo.classe}
            como={formulario.titulo.como}
          >
            {formulario.titulo.texto}
          </Texto>

          {formulario.inputs.map((campo, index) => {
            return (
              <div key={index} className="mb-4">
                {campo.type === "select" ? (
                  <select name={campo.id} className={campo.classe}>
                    {campo.options.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <>
                    <label
                      className=" text-gray-700 text-sm font-bold mb-2 hidden"
                      htmlFor={campo.id}
                    >
                      {campo.label}
                    </label>
                    {campo.type === "file" ? (
                      <Botao
                        texto={campo.label}
                        classe={campo.classe}
                        inputImagem={campo}
                      />
                    ) : (
                      <Input
                        id={campo.id}
                        type={campo.type}
                        name={campo.id}
                        placeholder={campo.placeholder}
                        defaultValue={campo.defaultValue}
                        classe={campo.classe}
                      />
                    )}
                  </>
                )}
              </div>
            );
          })}
          <Botao
            texto={formulario.botao.texto}
            classe={formulario.botao.classe}
          />
        </Form>
      );
    } else {
      return (
        <Form
          method={formulario.metodo}
          className={formulario.classe}
          encType={formulario.subimitar}
        >
          <Texto
            como={
              formular.formulario.titulo.texto[formularioParticionado]?.como
            }
            classe={
              formular.formulario.titulo.texto[formularioParticionado]?.classe
            }
          >
            {formular.formulario.titulo.texto[formularioParticionado]?.texto}
          </Texto>

          {formular.formulario.inputs.map((campo, index) => {
            const condicionalInput =
              (campo.id === "peso" && formularioParticionado === 0) ||
              (campo.id === "forma" && formularioParticionado === 0) ||
              (campo.id === "massa" && formularioParticionado === 1) ||
              (campo.id === "recheio" && formularioParticionado === 1) ||
              (campo.id === "cobertura" && formularioParticionado === 1) ||
              (campo.id === "tema" && formularioParticionado === 2) ||
              (campo.id === "descricao" && formularioParticionado === 2) ||
              (campo.id === "imagem" && formularioParticionado === 2) ||
              (campo.id === "topper" && formularioParticionado === 3) ||
              (campo.id === "detalhamentoTopper" &&
                formularioParticionado === 3);
            return (
              <Input
                key={index}
                id={campo.id}
                type={campo.type}
                name={campo.id}
                placeholder={campo.placeholder}
                defaultValue={campo.defaultValue}
                classe={`${campo.classe} ${condicionalInput ? "block" : "hidden"}`}
                opcao={campo.options ? campo.options : []}
              />
            );
          })}

          <div className="flex gap-4 mt-4">
            {formularioParticionado > 0 && (
              <button
                type="button"
                onClick={() => setFormularioParticionado((p) => p - 1)}
              >
                voltar
              </button>
            )}

            <button type={formularioParticionado === 3 ? "submit" : "button"} onClick={() => {
              if(formularioParticionado < 3){
                setFormularioParticionado(p => p+1)
              }
            }}>
              {formularioParticionado === 3 ? "Enviar bolo" : "continuar"}
            </button>
          </div>
        </Form>
      );
    }
  }
};
