import { useState } from "react";
import { Imagem } from "../../atomos/imagem/imagem";
import { Texto } from "../../atomos/Texto/Texto";

export const Lista = ({ direcionamento, lista = [], imagens = [] }) => {
  return (
    <ul className={direcionamento}>
      {Listao(lista)}
      {imagens ? <ul className="flex">{Listao(imagens)}</ul> : null}
    </ul>
  );
};

function Listao(pista) {

  return pista.map((item, chave) => {
    if (item.texto) {
      return (
        <li key={chave} className={item.classe}>
          <Texto como={item.como} referencia={item.recurso}>
            {item.texto}
          </Texto>
        </li>
      );
    }

    if (item.imagem) {
      if (item.vemClicar) {
        return (
          <ItemInterativo key={chave} listinha={pista} />
        );
      }

      return (
        <li key={chave} className={item.classe}>
          <a href={item.recurso}>
            <Imagem caminho={item.imagem} classe={item.classe} como={item.como || "img"} />
          </a>
        </li>
      );
    }

    return null;
  });
}

const ItemInterativo = ( listaCompleta ) => {
  const [clicado, setClicado] = useState(false);

  return (
<li className={`
  absolute top-0 right-1 flex flex-col items-end 
  transition-transform duration-500 ease-in-out 
  ${clicado ? '-translate-x-2' : 'translate-x-0'} 
  hover:-translate-y-1 gap-y-0.5 z-10
`}>
      <button 
        type="button" 
        onClick={() => setClicado(!clicado)} // Alterna entre abrir e fechar
        className="cursor-pointer">
        <Imagem caminho={listaCompleta.listinha[6].imagem} classe={listaCompleta.listinha[6].classe} como="svg" />
      </button>

      {/* Se clicado for true, mostra a lista de links */}
      {clicado && (
        <ul className="flex flex-col justify-end bg-white p-4 shadow-lg z-2">
          {listaCompleta.listinha.map((item, index) => (
            // Só mostra os itens que TÊM texto (evita mostrar o próprio botão de novo)
            item.texto && (
              <li key={index}>
                <Texto como={item.como} referencia={item.recurso} classe="block">
                  {item.texto}
                </Texto>
              </li>
            )
          ))}
        </ul>
      )}
    </li>
  );
}
