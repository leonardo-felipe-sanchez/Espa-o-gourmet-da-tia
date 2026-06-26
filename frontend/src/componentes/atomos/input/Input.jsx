import { useState } from "react";

export const Input = ({
  placeholder,
  name,
  defaultValue,
  classe,
  id,
  type,
  opcao = []
}) => {
  const [adicionarlinha, setAdicionarLinha] = useState(9);

  if (type === "textarea") {
    return (
      console.log(adicionarlinha),
      (
        <textarea
          name={name}
          id={id}
          rows={adicionarlinha}
          className={classe}
          placeholder={placeholder}
          onInput={(e) =>
            setAdicionarLinha(aumentarTamanho(e.target.value, adicionarlinha))
          }
        />
      )
    );
  } else if (type === "select"){
   return (
     <select name={name} className={classe}>
      {
        opcao.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))
      }
    </select>
   )
  } else {

    /**
     *             <select key={index} name={campo.id} className={campo.classe}>
              {campo.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
     */
    return (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={id}
        className={classe}
        required
      />
    );
  }
};

function aumentarTamanho(valor, linha) {
  //  const contador = valor.split('\n')

  if (valor.length % 39 === 0) {
    //return console.log("entrou",typeof linha, typeof valor)
    return linha + 1;
  } else {
    //return console.log("naoentrou", typeof linha, typeof valor)
    return linha;
  }
}
