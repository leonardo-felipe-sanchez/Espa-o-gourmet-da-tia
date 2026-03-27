import { ModeloDePaginaInicial } from "../modelo/ModeloDePaginaPrincipal"
import hero from "../assets/hero.png"

export const PaginaPrincipal = (() => {

    const headerData = {
        classe: "mx-auto flex w-full h-30 items-center justify-center p-6 lg:px-8",
        direcionamento: "flex",
        lista:[
            { texto: "ALMOÇO", recurso: "#almoco", como:"a"},
            {texto: "BOLOS", recurso: "#bolos", como:"a"},
            {texto: "PRODUTOS", recurso: "#produtos", como:"a"},
            {imagem: hero, recurso: "#", classe: "w-23"},
            { texto: "SOBRE MIM", recurso: "#sobremim", como:"a"},
            { texto: "CONTATO", recurso: "#contato",como:"a"},
        ]
    }

const listaImagem = [ {imagem: hero, recurso: "#face", classe: "w-13"}, {imagem: hero, recurso: "#instagram", classe: "w-13"}, {imagem: hero, recurso: "#whatsapp", classe: "w-13"},];

    const footerData = {
        classe: "mx-auto flex w-full h-30 items-center justify-center p-6 lg:px-8 bg-red-200",
         direcionamento: "flex",
         lista:[
            {imagem: hero, recurso: "#", classe: "w-23"},
            {texto: "SOBRE MIM", recurso: "#sobremim", como:"a"},
            {texto: "PRODUTOS", recurso: "#produtos", como:"a"},
            {texto: "CONTATOS", recurso: "#contatos", como:"a"},
            {texto: "POLITICA DE PRIVACIDADE", recurso: "#privacidade", como:"a"},
         ],
         imagens: listaImagem
    }

const Testao = [{texto: "a", como:"h1"}, {texto:"b", como:"p"}]

    const PaginaInicial={
        classe: {identificador:"inicial",classe:" "},
        divisoria: 2,
        imagem: {imagem: hero, classe: "w-full"},
        conteudos:[
            {classe: "a", paragrafo: {classe:"", texto:Testao}}
        ]
    }
    

    return(
<> 
        <ModeloDePaginaInicial  headerProps={headerData} sessionProps={PaginaInicial} footerProps={footerData}/>
</>
    )
})