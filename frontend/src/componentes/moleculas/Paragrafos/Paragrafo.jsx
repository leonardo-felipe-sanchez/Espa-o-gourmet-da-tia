import { Texto } from "../../atomos/Texto/Texto";
import { Botao } from "../../atomos/botao/Botao";

export const Paragrafo = ({ classe, textos, botao = {} }) => (
  <div className={classe}>
    {textos?.map((textinho, index) => {
      return (
        <>
          <Texto
            key={index + 10}
            como={textinho.como}
            referencia={textinho.recurso}
            classe={textinho.classe}
          >
            {textinho.texto}{" "}
          </Texto>
          
        </>
      );
    })}
{botao ? <Botao classe={botao.classe} texto={botao.texto} /> : null}
  </div>
);
