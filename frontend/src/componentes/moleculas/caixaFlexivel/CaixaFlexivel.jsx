import { Imagem } from "../../atomos/imagem/imagem";
import { Paragrafo } from "../Paragrafos/Paragrafo";
import { Texto } from "../../atomos/Texto/Texto";
import { Form, Link } from "react-router";

export const CaixaFlexivel = ({
  imagem = {},
  texto = {},
  classe,
  titulo,
  tipo = "",
}) => {
  if (typeof tipo === "object" && tipo.comando === "criar") {
    return (
      <Link to={tipo.caminho} state={{ imagem }}>
        <div className={classe}>
          {titulo ? (
            <Texto como={titulo.como} classe={titulo.classe}>
              {" "}
              {titulo.texto}{" "}
            </Texto>
          ) : null}
          {tipo.imagem == "imagem" ? (
            <Imagem classe={imagem.classe} caminho={imagem.imagem} />
          ) : (
            <div
              className={`${imagem.classe}`}
              style={{ backgroundImage: `url(${imagem.imagem})` }}
            ></div>
          )}

          <Paragrafo classe={texto.classe} textos={texto.texto} />
        </div>
      </Link>
    );
  } else if (tipo.comando === "deletar") {
    return (
      <Form method="post" action={tipo.caminho}>
        <div type="submit" className={classe}>
          {titulo ? (
            <Texto como={titulo.como} classe={titulo.classe}>
              {" "}
              {titulo.texto}{" "}
            </Texto>
          ) : null}
          {tipo.imagem == "imagem" ? (
            <Imagem classe={imagem.classe} caminho={imagem.imagem} />
          ) : (
            <div
              className={`${imagem.classe}`}
              style={{ backgroundImage: `url(${imagem.imagem})` }}
            ></div>
          )}

          <Paragrafo
            classe={texto.classe}
            textos={texto.texto}
            botao={texto.botao ? texto.botao : false}
          />
        </div>
      </Form>
    );
  } else {
    return (
      <div className={classe}>
        {titulo ? (
          <Texto como={titulo.como} classe={titulo.classe}>
            {" "}
            {titulo.texto}{" "}
          </Texto>
        ) : null}
        {tipo == "imagem" ? (
          <Imagem classe={imagem.classe} caminho={imagem.imagem} />
        ) : (
          <div
            className={`${imagem.classe}`}
            style={{ backgroundImage: `url(${imagem.imagem})` }}
          ></div>
        )}

        <Paragrafo
          classe={texto.classe}
          textos={texto.texto}
          botao={texto.botao ? texto.botao : false}
        />
      </div>
    );
  }
};
