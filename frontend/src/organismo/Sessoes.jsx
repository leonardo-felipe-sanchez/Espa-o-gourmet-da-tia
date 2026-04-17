import { Imagem } from "../atomos/imagem/imagem";
import { Paragrafo } from "../moleculas/Paragrafos/Paragrafo";
import { CaixaFlexivel } from "../moleculas/caixaFlexivel/CaixaFlexivel";
import { Lista } from "../moleculas/lista/Lista";
import { RedeSocial } from "../moleculas/RedeSocial";
import { Formulario } from "../moleculas/formulario/Formulario";

export const Sessao = ({
  classe = {},
  divisoria,
  imagem = {},
  conteudos = [],
}) => {
  const estiloFundo = imagem?.imagem
    ? { backgroundImage: `url(${imagem.imagem})` }
    : {};
  return (
    <section
      id={classe.identificador}
      className={classe?.classe}
      style={estiloFundo}
    >
      {Divisor(divisoria, conteudos)}
    </section>
  );
};

function Divisor(divisoria, conteudos) {
  if (!conteudos || conteudos.length === 0) return null;

  const larguras = {
    1: "xl:w-full",
    2: "xl:w-9/12",
    3: "xl:w-7/12",
    4: "xl:w-1/2",
    5: "xl:w-1/3",
  };

  return conteudos.map((conteudo, indexador) => (
    <div
      key={indexador}
      className={`${larguras[divisoria] || "w-full"} ${conteudo?.classe || ""}`}
    >
      {conteudo?.paragrafo ? (
        <Paragrafo
          classe={conteudo?.paragrafo?.classe}
          textos={conteudo?.paragrafo?.texto || []}
        />
      ) : null}
      {conteudo?.imagem ? (
        <Imagem
          caminho={conteudo?.imagem?.imagem}
          classe={conteudo?.imagem?.classe}
          como={conteudo?.imagem?.como}
        />
      ) : null}
      {conteudo?.caixa ? (
        <div className={conteudo?.caixa.classe}>
          {ListaDeCaixaFlexivel(conteudo?.caixa)}
        </div>
      ) : (
        ""
      )}
            {conteudo?.lista ? (
        <Lista lista={conteudo?.lista.lista} direcionamento={conteudo?.lista.direcionamento}/>
      ) : (
        ""
      )}
      {conteudo?.redesocial === "oi" ? (
        <RedeSocial />
      ) : (
        ""
      )}
      {conteudo?.conteudos ? (
        (<Formulario
          formulario={conteudo?.conteudos.formulario}
        />)
      ) : (
        ""
      )}
    </div>
  ));
}

function ListaDeCaixaFlexivel(caixinha) {
  return caixinha.caixas.map((caixa, chave) => {
    return (
      <CaixaFlexivel
        key={chave}
        titulo={caixa?.titulo}
        imagem={caixa?.imagem}
        texto={caixa?.texto}
        classe={caixa?.classe}
        tipo={caixa?.tipo}
      />
    );
  });
}
