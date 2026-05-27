import { useState } from "react"; // 1. Importe o useState
import { Form } from "react-router";
import { Input } from "../../atomos/input/Input";

export const Botao = ({ texto, classe, forme, inputImagem }) => {
  // 2. Crie o estado do "interruptor"
  const [mostrarInput, setMostrarInput] = useState(false);

  // Caso 1: Botão de Formulário (Action do React Router)
  if (forme) {
    return (
      <Form method="post" action={forme}>
        <button className={classe} type="submit">{texto}</button>
      </Form>
    );
  }

  // Caso 2: Botão que abre um Input (Uso do useState)
  if (inputImagem) {
    return (
      <div className="flex flex-col items-center gap-4">
        <button
          className={classe}
          type="button"
          onClick={() => setMostrarInput(!mostrarInput)} // 3. Inverte o valor ao clicar
        >
          {texto}
        </button>

        {/* 4. Lógica Condicional: Se mostrarInput for true, o componente aparece */}
        {mostrarInput && (
          <div className="animate-in fade-in zoom-in duration-300">
            <Input
              id={inputImagem.id}
              type={inputImagem.type}
              name={inputImagem.id}
              placeholder={inputImagem.placeholder}
              classe={inputImagem.classe}
            />
          </div>
        )}
      </div>
    );
  }

  // Caso 3: Botão Comum
  return <button className={classe}>{texto}</button>;
};