import brigadeiro from "../assets/brigadeirinho.webp";
import prato from "../assets/pratinho.webp";
import paoDeMel from "../assets/pao de mel.webp";
import tortas from "../assets/tortinha-de-morango.webp";
import coca from "../assets/coquinha.webp";
import coxinha from "../assets/coxinha.webp";


export const GetCaixas = (textosFixos, dadosDaAPI) => {


if (!textosFixos || textosFixos.length === 0) return [];
  return [
    {
      imagem: {
        imagem: brigadeiro,
        classe: "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [textosFixos[9], textosFixos[10], textosFixos[11]]
      },
      classe:
        "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
    tipo: {
    //caminho: `/produtos/deletar/${produto.id}`,
    //comando: `deletar`
    caminho: `/produtos/4`,
    comando: `criar`
    
  }
      },
    {
      imagem: {
        imagem: prato,
        classe: "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [textosFixos[12], textosFixos[13]],
      },
      classe:
        "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
      tipo: {
        caminho: `/produtos/2`,
        comando: `criar` 
  }
    },
    {
      imagem: {
        imagem: paoDeMel,
        classe: "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-7 flex flex-col justify-center items-center",
        texto: [textosFixos[21], textosFixos[15]],
      },
      classe:
        "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
      tipo: {
    //caminho: `/produtos/deletar/${produto.id}`,
    //comando: `deletar`
    caminho: `/produtos/1`,
    comando: `criar`
    
  }
    },
    {
      imagem: {
        imagem: tortas,
        classe: "w-full max-w-[400px] h-140 bg-cover bg-bottom rounded-t-[500px]",
      },
      texto: {
        classe: " w-[240px] py-5 flex flex-col justify-center items-center",
        texto: [textosFixos[14], textosFixos[10], textosFixos[11]],
      },
      classe:
        "flex-shrink-0 bg-white w-full max-w-[400px] h-[550px] flex flex-col justify-center items-center rounded-t-[500px] mx-6",
      tipo: {
        caminho: `/produtos/3`,
    comando: `criar`
    
  }
    },
    {
      titulo: textosFixos[19],
      imagem: { imagem: coxinha, classe: "w-[80vw] max-w-[400px] rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-600 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
        texto: [textosFixos[23]],
      },
      classe:
        "w-full max-w-[400px] h-[400px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
      tipo: "imagem"
    },
    {
      titulo: textosFixos[17],
      imagem: { imagem: coca, classe: " w-[80vw] max-w-[400px]  rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-500 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
        texto: [textosFixos[24]],
      },
      classe:
        "flex-shrink-0 w-[80vw] max-w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
      tipo: "imagem"
    },
    {
      titulo: textosFixos[18],
      imagem: { imagem: brigadeiro, classe: "w-full max-w-[400px] rounded-t-[20px]" },
      texto: {
        classe:
          "bg-pink-400 flex flex-col justify-center items-center rounded-b-[40px] w-[80vw] max-w-[400px] p-5",
        texto: [textosFixos[22]],
      },
      classe:
        "flex-shrink-0 w-[80vw] max-w-[400px] h-[200px] flex flex-col justify-center items-center rounded-[20px] mx-auto",
      tipo: "imagem"
    },
    ...(dadosDaAPI.map((produto)=>{
return {
  classe: "flex flex-col gap-x-5 items-center w-[300px] bg-pink-400 rounded-t-[50px] mx-6 pointer",
  titulo: {texto: produto.classe, como: "h2", classe: "hidden"},
  imagem: { imagem: produto.imagem, classe: "w-full max-w-[300px] h-[350px] bg-cover bg-center rounded-t-[50px]"  },
  texto: {
    classe: "flex flex-col justify-center items-center",
    texto: [{ texto: produto.nome, como: "p", classe: "text-white font-bold my-12 text-xl" }], 
    botao: {
      classe: "bg-pink-500 text-white p-3 relative z-3 pointer",
      texto: "deletar",
      forme: `/produtos/deletar/${produto.id}`
    }
  },
  tipo: {
    //caminho: `/produtos/deletar/${produto.id}`,
    //comando: `deletar`
    caminho: `/produtos/${produto.id}`,
    comando: `criar`
    
  }
}
    }))
  ]
};