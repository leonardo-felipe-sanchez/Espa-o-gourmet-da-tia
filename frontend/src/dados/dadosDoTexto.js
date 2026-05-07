export const getTestao = (resultadoAPI) => {
  
  const textosFixos= [
      {
        texto: "olos personalizados que te representam!",
        classe:
          "text-left text-2xl sm:text-3xl lg:text-4xl lg:w-3/4 text-pink-600",
        como: "h1",
      },
      {
        texto:
          "Aqui você tem a liberdade para criar, acompanhando cada processo em tempo real ",
        como: "p",
        classe:
          "text-center sm:text-left text-xl sm:w-[600px] lg:text-2xl  pr-25 pl-12 sm:pl-20 pt-8 md:pt-10 text-pink-600",
      },
      {
        texto: "obre mim",
        classe: "text-3xl md:text-4xl text-center text-pink-600",
        como: "h1",
      },
      {
        texto:
          "A história do Espaço Gourmet da Tia nasceu do talento e da paixão da Tia Ires por fazer bolos, um dom que rapidamente se tornou um negócio, conquistando uma base de clientes fiéis na Zona Norte de São Paulo",
        como: "p",
        classe: "pt-10 text-justify md:text-xl",
      },
      {
        texto:
          "Com a crescente demanda, ela inaugurou um espaço físico que, por sugestão de uma cliente, foi rebatizado com o nome que carrega até hoje. ",
        como: "p",
        classe: "pt-10 text-justify md:text-xl",
      },
      {
        texto:
          "Com quase 3 décadas de experiência, Tia Ires consolidou um legado de sabor e afeto, expandindo sua marca para atender a todas as ocasiões e a uma gama versátil de serviços, de refeições a bolos de casamento. ",
        como: "p",
        classe: "pt-10 text-justify md:text-xl mb-20",
      },
      {
        texto: "armitas fresquinhas!",
        classe: "text-3xl md:text-4xl text-center text-pink-600",
        como: "h1",
      },
      {
        texto: "Comida caseira e saudavel por um clique de distância.",
        como: "p",
        classe: "pt-10 text-2xl text-center",
      },
      {
        texto: "Faça seu pedido e receba na sua casa!",
        como: "p",
        classe: "pt-10 text-2xl text-center",
      },
      {
        texto: "Kit festa",
        como: "h2",
        classe: "text-2xl text-center text-pink-500 font-bold",
      },
      {
        texto: "Bolo + docinho",
        como: "p",
        classe: "text-lg text-center text-pink-500",
      },
      {
        texto: "Brigadeiros variados a seu gosto!",
        como: "p",
        classe: "text-lg text-center text-pink-500",
      },
      {
        texto: "Cesta café da manhã e tarde",
        como: "h2",
        classe: "text-2xl text-center text-pink-500 font-bold",
      },
      {
        texto: "Monte a sua cesta com suas marcas favoritas",
        como: "p",
        classe: "text-lg text-center text-pink-500",
      },
      {
        texto: "Torta de morango",
        como: "h2",
        classe: "pt-2 text-center text-pink-500 text-2xl font-bold",
      },
      {
        texto: "Recheio de doçe de leite e brigadeiro",
        como: "p",
        classe: "pt-2 text-lg text-center text-pink-500",
      },
      {
        texto: "VER MAIS",
        como: "a",
        classe:
          "pt-2 text-center text-white border-solid border-2 border-white rounded-[50px] cursor-pointer px-4 py-2",
        recurso: "/",
        identidade: "#almoco"
      },
      {
        texto: "Bebidas",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      {
        texto: "Sobremesas",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      {
        texto: "Salgados",
        classe: "text-4xl text-pink-500 py-10",
        como: "h2",
      },
      {
        texto: "+ Adicionar Novo Produto",
        como: "a",
        classe: "border-2 border-pink-500 text-pink-500 px-8 py-3 rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 font-bold uppercase shadow-md",
        recurso: "/produtos/criar"
      },
      {
        texto: "pão de mel",
        como: "h2",
        classe: "text-2xl text-center text-pink-500 font-bold"
      },
      {
        texto: "VER MAIS",
        como: "a",
        classe:
          "pt-2 text-center text-white border-solid border-2 border-white rounded-[50px] cursor-pointer px-4 py-2",
        recurso: "/produtos/filtro/sobremesas"
      },

      {
        texto: "VER MAIS",
        como: "a",
        classe:
          "pt-2 text-center text-white border-solid border-2 border-white rounded-[50px] cursor-pointer px-4 py-2",
        recurso: "/produtos/filtro/bebidas"
      },

      {
        texto: "VER MAIS",
        como: "a",
        classe:
          "pt-2 text-center text-white border-solid border-2 border-white rounded-[50px] cursor-pointer px-4 py-2",
        recurso: "/produtos/filtro/bebidas"
      },
    ]

  const dadosDaAPI = resultadoAPI?.produtos || [];
  const classesDaAPI = resultadoAPI?.classe || [];
  return {
textosFixos, dadosDaAPI, classesDaAPI
  };
};
