import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal";
import hero from "../assets/hero.png";

export const PaginaPrincipal = () => {
  const headerData = {
    classe: "mx-auto flex w-full h-30 items-center justify-center p-6 lg:px-8",
    direcionamento: "flex",
    lista: [
      { texto: "ALMOÇO", recurso: "#almoco", como: "a" },
      { texto: "BOLOS", recurso: "#bolos", como: "a" },
      { texto: "PRODUTOS", recurso: "#produtos", como: "a" },
      { imagem: hero, recurso: "#", classe: "w-23" },
      { texto: "SOBRE MIM", recurso: "#sobremim", como: "a" },
      { texto: "CONTATO", recurso: "#contato", como: "a" },
    ],
  };

  const listaImagem = [
    { imagem: hero, recurso: "#face", classe: "w-13" },
    { imagem: hero, recurso: "#instagram", classe: "w-13" },
    { imagem: hero, recurso: "#whatsapp", classe: "w-13" },
  ];

  const footerData = {
    classe:
      "mx-auto flex w-full h-40 items-center justify-center p-6 lg:px-8 bg-red-200",
    direcionamento: "flex",
    lista: [
      { imagem: hero, recurso: "#", classe: "w-23" },
      { texto: "SOBRE MIM", recurso: "#sobremim", como: "a" },
      { texto: "PRODUTOS", recurso: "#produtos", como: "a" },
      { texto: "CONTATOS", recurso: "#contatos", como: "a" },
      { texto: "POLITICA DE PRIVACIDADE", recurso: "#privacidade", como: "a" },
    ],
    imagens: listaImagem,
  };

  const Testao = [
    { texto: "Bolos personalizados que te representam!", classe: "text-6xl font-semibold", como: "p" },
    {
      texto:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea facilis numquam maiores iure tempora hic voluptas fugiat harum pariatur, vitae eum ab atque ullam laudantium nulla accusantium ipsam iste ipsa, veritatis natus sed. Enim ut laudantium, aspernatur a earum natus?",
      como: "p",
      classe: "pt-50"
    },
  ];

  const PaginaInicial = [{
    classe: { identificador: "inicial", classe: "h-150 bg-cover bg-center" },
    divisoria: 3,
    imagem: { imagem: hero, classe: "" },
    conteudos: [
      {
        classe: "h-150 flex items-center pl-17 pr-20 justify-center z-1 relative",
        paragrafo: { classe: "z-2 relative", texto: Testao },
      },
    ],
  }, {
    classe: { identificador: "sobreMim", classe: "h-150 flex" },
    divisoria: 4,
    conteudos: [
        {
            classe: "bg-black h-150"
        },
      {
        classe: "h-150 flex items-center pl-17 pr-20 justify-center z-1 relative",
        paragrafo: { classe: "z-2 relative", texto: Testao },
      },
    ],
  }];

  return (
    <>
      <ModeloDePaginaInicial
        headerProps={headerData}
        sessionProps={PaginaInicial}
        footerProps={footerData}
      />
    </>
  );
};
