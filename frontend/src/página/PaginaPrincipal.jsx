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
      "mx-auto flex w-full h-40 items-center justify-center p-6 lg:px-8 bg-pink-100",
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
    {
      texto: "Bolos personalizados que te representam!",
      classe: "text-6xl font-semibold",
      como: "p",
    },
    {
      texto:
        "Aqui você tem a liberdade para criar, acompanhando cada processo em tempo real ",
      como: "p",
      classe: "pt-50",
    },
    {
      texto: "Sobre mim",
      classe: "text-6xl font-semibold",
      como: "p",
    },
        {
      texto: "A história do Espaço Gourmet da Tia nasceu do talento e da paixão da Tia Ires por fazer bolos, um dom que rapidamente se tornou um negócio, conquistando uma base de clientes fiéis na Zona Norte de São Paulo",
      como: "p",
      classe: "pt-10 text-justify",
    },
            {
      texto: "Com a crescente demanda, ela inaugurou um espaço físico que, por sugestão de uma cliente, foi rebatizado com o nome que carrega até hoje. ",
      como: "p",
      classe: "pt-10 text-justify",
    },
                {
      texto: "Com quase 3 décadas de experiência, Tia Ires consolidou um legado de sabor e afeto, expandindo sua marca para atender a todas as ocasiões e a uma gama versátil de serviços, de refeições a bolos de casamento. ",
      como: "p",
      classe: "pt-10 text-justify",
    },
        {
      texto: "Marmitas fresquinhas!",
      classe: "text-6xl font-semibold",
      como: "p",
    },
                    {
      texto: "Comida caseira e saudavel por um clique de distância.",
      como: "p",
      classe: "pt-10 text-justify",
    },
                        {
      texto: "Faça seu pedido e receba na sua casa!",
      como: "p",
      classe: "pt-5 text-justify",
    },
  ];

  const PaginaInicial = [
    {
      classe: { identificador: "inicial", classe: "h-150 bg-cover bg-center" },
      divisoria: 3,
      imagem: { imagem: hero, classe: "" },
      conteudos: [
        {
          classe:
            "h-150 flex items-center pl-17 pr-20 justify-center z-1 relative",
          paragrafo: { classe: "z-2 relative", texto: [Testao[0], Testao[1]] },
        },
      ],
    },
    {
      classe: { identificador: "sobreMim", classe: "h-150 flex pt-10 pb-10" },
      divisoria: 4,
      conteudos: [
        {
          classe: "h-150 flex items-center justify-center",
          imagem: {
            imagem: hero,
            classe: "h-120 w-100 border-solid border-4 border-gray-600 rounded-lg",
          },
        },
        {
          classe:
            "h-150 flex items-center pl-17 pr-20 justify-center z-1 relative",
          paragrafo: { classe: "z-2 relative", texto: [Testao[2], Testao[3], Testao[4], Testao[5]] },
        },
      ],
    },
        {
      classe: { identificador: "confeitaria", classe: "h-120 flex pl-7 pr-7 pt-10 pb-10" },
      divisoria: 4,
      conteudos: [
        {
          classe: " rounded-l-[4vw] bg-pink-100",

        },
        {
          classe:
            "rounded-r-[4vw] bg-pink-400",
        },
      ],
    },
    {
      classe: {identificador: "marmita",  classe: "h-150 flex pl-7 pr-7 pt-10 pb-10"},
      divisoria: 4,
      conteudos:[
                {
          classe: " h-120 rounded-l-[4vw] bg-pink-100 p-17",
          paragrafo: { classe: "z-2 relative", texto: [Testao[6], Testao[7], Testao[8]] },
        },
        {
          classe: "h-120 w-full  rounded-r-[4vw]",
          imagem: {
            imagem: hero,
            classe: "h-120 w-full",
          },
        }
      ]
    }
  ];

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
