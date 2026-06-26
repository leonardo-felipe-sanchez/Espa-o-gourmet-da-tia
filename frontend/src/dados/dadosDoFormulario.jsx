export const Formulario = ({id = "",produto = {}, dadosDaAPI = []}) => {
  return [
    {
      subimitar: String("lidar com envio"),
      titulo: {
        texto: "Envie mensagem",
        classe: "text-3xl text-pink-500 m-3 text-pink-500",
        como: "h1",
      },
      classe:
        "flex items-center justify-center flex-col gap-4 w-[90vw] xl:w-110 border border-pink-500 rounded-[1vw] p-2 xl:p-10",
      inputs: [
        {
          id: "nome",
          label: "Nome",
          type: "text",
          placeholder: "NOME",
          defaultValue: "",
          classe:
            " m-1 p-3 border hover:border-2 border-pink-400  w-full max-w-[320px] rounded-[1vw] text-center ",
        },
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "EMAIL",
          defaultValue: "",
          classe:
            "m-1 p-3 hover:border-2 border border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
        },
        {
          id: "telefone",
          label: "Telefone",
          type: "tel",
          placeholder: "TELEFONE",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
        },
        {
          id: "mensagem",
          label: "Mensagem",
          type: "textarea",
          placeholder: "MENSAGEM",
          defaultValue: "",
          classe:
            "caret-pink-600 m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] h-32 text-center",
        },
      ],
      botao: {
        texto: "Enviar",
        classe:
          "transition delay-150 duration-300 ease-in-out hover:-translate-y-1 bg-pink-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-pink-600 transition-colors duration-300 rounded-[2vw]",
      },
    },
    {
      metodo: "POST",
      subimitar: String("multipart/form-data"),
      titulo: {
        texto: "Adicionar novo produto",
        como: "h2",
        classe: "text-2xl text-pink-500 m-3 text-pink-500",
      },
      classe:
        "h-max-content flex items-center justify-center flex-col gap-y-15",
      inputs: [
        {
          id: "nome",
          label: "Nome do produto",
          type: "text",
          placeholder: "NOME DO PRODUTO",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
        },
        {
          id: "imagem",
          label: "Imagem do produto",
          type: "file",
          placeholder: "",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full",
        },
        {
          id: "preco",
          label: "Preço do produto",
          type: "text",
          placeholder: "PREÇO DO PRODUTO",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
        },
        {
          id: "classinha",
          label: "Categoria do produto",
          type: "select",
          options: dadosDaAPI?.map((categoria) => ({
            value: categoria,
            label: categoria,
          })),
          defaultValue: "",
          classe: "border-2 border-pink-500 p-2 rounded-full cursor-pointer",
        },
        {
          id: "descricao",
          label: "Descrição do produto",
          type: "textarea",
          placeholder: "DESCRIÇÃO DO PRODUTO",
          defaultValue: "",
          classe:
            "caret-pink-600 m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] h-32 text-center",
        }
      ],
      botao: {
        texto: "Criar produto",
        classe:
          "bg-pink-500 text-white p-4 rounded-full transition-colors duration-300 hover:bg-pink-600",
    },
    },
    {
      metodo: "PATCH",
      subimitar: String("multipart/form-data"),
      titulo: {
        texto: `Editar produto ${id}`,
        como: "h2",
        classe: "text-2xl text-pink-500 m-3 text-pink-500",
      },
      classe:
        "h-max-content flex items-center justify-center flex-col gap-y-15",
      inputs: [
        {
          id: "nome",
          label: "Nome do produto",
          type: "text",
          placeholder: `${produto?.nome || ""}`,
          defaultValue: `${produto?.nome || ""} `,
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
        },
        {
          id: "imagem",
          label: "Imagem do produto",
          type: "file",
          placeholder: "",
          defaultValue: `${produto?.imagem || ""}`,
          classe: "border-2 border-pink-500 p-3 rounded-full cursor-pointer",
        },
        {
          id: "preco",
          label: "Preço do produto",
          type: "text",
          placeholder: "PREÇO DO PRODUTO",
          defaultValue: `${produto?.preco || ""}`,
          classe: "border-2 border-pink-500 p-3 rounded-full text-center cursor-pointer",
        },
        {
          id: "classinha",
          label: "Categoria do produto",
          type: "select",
          options: dadosDaAPI?.map((categoria) => ({
            value: categoria,
            label: categoria,
          })),
          defaultValue: `${produto?.categoria || ""}`,
          classe: "border-2 border-pink-500 p-2 rounded-full cursor-pointer",
        },
        {
          id: "descricao",
          label: "Descrição do produto",
          type: "textarea",
          placeholder: "DESCRIÇÃO DO PRODUTO",
          defaultValue: `${produto?.descricao || ""}`,
          classe:
            "caret-pink-600 m-1 p-3 border border-2 hover:border-3 border-pink-500 w-full max-w-[320px] rounded-[1vw] h-32 text-center",
        }
      ],
      botao: {
        texto: "Salvar alterações",
        classe:
          "bg-pink-500 text-white p-4 rounded-full transition-colors duration-300 hover:bg-pink-600",
      },
    },
    {
      metodo: "POST",
      subimitar: String("multipart/form-data"),
      titulo: {
        texto: [
        {
          texto: "Dimensionalidade do bolo",
          como: "h2",
          classe: "text-4xl text-pink-500 m-3",
        },
        {
          texto: "Sabor do bolo",
        como: "h2",
          classe: "text-4xl text-pink-500 m-3",
        },
        {
          texto: "Tematica do bolo",
        como: "h2",
          classe: "text-4xl text-pink-500 m-3",
        },
        {
          texto: "Topper",
        como: "h2",
          classe: "text-4xl text-pink-500 m-3",
        }
      ]
      },
      classe:
      "h-screen flex items-center justify-center flex-col gap-y-15",
      inputs: [
        {
          id: "peso",
          label: "Peso do bolo",
          type: "text",
          placeholder: "PESO",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
          particionado: 0
        },
        {
          id: "forma",
          label: "Forma do bolo",
          type: "select",
          options: [
            { value: "redonda", label: "Redonda" },
            { value: "quadrada", label: "Quadrada" },
            { value: "bolo-de-anel", label: "Bolo de anel" }
          ],
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
          particionado: 0
        },
        {
          id: "massa",
          label: "Massa do bolo",
          type: "text",
          placeholder: "MASSA",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
          particionado: 1
        },
        {
          id:"recheio",
          label: "Recheio do bolo",
          type: "text",
          placeholder: "RECHEIO",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
          particionado: 1
        },
        {
          id:"cobertura",
          label: "Cobertura do bolo",
          type: "text",
          placeholder: "COBERTURA",
          defaultValue: "",
          classe: "border-2 border-pink-500 p-3 rounded-full text-center",
          particionado: 1
        },
        
        {
          id:"tema",
          label: "cite em poucas palavras do tema da festa",
          type: "text",
          placeholder: "exemplo: festa do filme carros",
          defaultValue: "",
          classe: "border-2 border-pink-500 w-100 p-3 rounded-full text-center",
          particionado: 2
        },
        {
          id:"descricao",
          label: "Agora descreva melhor sobre como será seu bolo, quando mais detalhes melhor",
          type: "textarea",
          placeholder: "exemplo: o bolo terá o formato do pneu do Relampago McQueen, tendo a borda preta e o meio vermelho",
          defaultValue: "",
          classe: "outline-none w-100 p-4 rounded-[30px] border-2 border-pink-500 overfolow-hidden resize-none",
          particionado: 2
        },
        {
          id: "imagem",
          label: "Insere aqui uma imagem de referência do bolo",
          type: "file",
          placeholder: "",
          defaultValue: "",
          classe: "field-sizing-content p-3 border-2 border-pink-500 rounded-[1vw] h-32 text-clip text-center",
          particionado: 2
        },
        {
          id: "topper",
          label: "topper são as papeis impressos que serão colocadas no bolo, como o nome e idade do aniversariante e figuras de personagens",
          type: "file",
          placeholder: "",
          defaultValue: "",
          classe: "field-sizing-content p-3 border-2 border-pink-500 rounded-[1vw] h-32 text-clip text-center",
          particionado: 3
        },
        {
          id:"detalhamentoTopper",
          label:"caso queira algumas modificações das imagens, você pode descrever aqui os detalhes",
          type: "textarea",
          placeholder:"exemplo: 'mudar a idade para 22 anos', 'mudar nome para X', 'colocar imagem de um X personagem'",
          defaultValue:"",
          classe: "outline-none w-100 p-4 rounded-[30px] border-2 border-pink-500 overfolow-hidden resize-none",
          particionado: 3
        }
      ],
    },
    {
      metodo: "POST",
      subimitar: String("multipart/form-data"),
      titulo: {
        texto: "Faça seu login",
        como: "h2",
        classe: "text-2xl text-pink-500 m-3 text-pink-500",
      },
      classe:
        "h-max-content flex items-center justify-center flex-col gap-y-15",
      inputs: [
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "EMAIL",
          defaultValue: "",
          classe:
            "m-1 p-3 hover:border-2 border border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
        },
        {
          id: "password",
          label: "Senha",
          type: "password",
          placeholder: "SENHA",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
        },
      ],
      botao: {
        texto: "Entrar",
        classe:
          "bg-pink-500 text-white p-4 rounded-full transition-colors duration-300 hover:bg-pink-600",
      },
    },
    {
      metodo: "POST",
      subimitar: String("multipart/form-data"),
      titulo: {
        texto: [
          {
            texto: "Crie sua conta",
            como: "h2",
            classe: "text-4xl text-pink-500 m-3",
          },
          {
            texto: "Dados pessoais",
            como: "h2",
            classe: "text-2xl text-pink-500 m-3",
          },
          {
            texto: "Endereço",
            como: "h2",
            classe: "text-2xl text-pink-500 m-3",
          },
          {
            texto: "informações adicionais",
            como: "h2",
            classe: "text-2xl text-pink-500 m-3",
          }
        ],
        como: "h2",
        classe: "text-2xl text-pink-500 m-3 text-pink-500",
      },
      classe:
        "h-max-content flex items-center justify-center flex-col gap-y-15",
      inputs: [
        {
          id: "email",
          label: "Email",
          type: "email",
          placeholder: "EMAIL",
          defaultValue: "",
          classe:
            "m-1 p-3 hover:border-2 border border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 0
        },
        {
          id: "password",
          label: "Senha",
          type: "password",
          placeholder: "SENHA",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 0
        },
        {
          id: "confirmPassword",
          label: "Confirmar senha",
          type: "password",
          placeholder: "CONFIRMAR SENHA",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 0
        },
        {
          id: "nome",
          label: "Nome completo",
          type: "text",
          placeholder: "NOME COMPLETO",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 1
        },
        {
          id: "cpf",
          label: "CPF",
          type: "text",
          placeholder: "CPF",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 1
        },
        {
          id: "idade",
          label: "Idade",
          type: "number",
          placeholder: "IDADE",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 1
        },
        {
          id: "genero",
          label: "Gênero",
          type: "text",
          placeholder: "GÊNERO",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 1
        },
        {
          id: "telefone",
          label: "Telefone",
          type: "text",
          placeholder: "TELEFONE",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 1
        },
        {
          id: "cep",
          label: "CEP",
          type: "text",
          placeholder: "CEP",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 2
        },
        {
          id: "rua",
          label: "Rua",
          type: "text",
          placeholder: "RUA",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 2
        },
        {
          id: "numero",
          label: "Número",
          type: "text",
          placeholder: "NÚMERO",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
            particionado: 2
        },
        {
          id: "complemento",
          label: "Complemento",
          type: "text",
          placeholder: "COMPLEMENTO",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
          particionado: 2
        },
        {
          id: "pontoReferencia",
          label: "Ponto de referência",
          type: "text",
          placeholder: "PONTO DE REFERÊNCIA",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
          particionado: 3
        },
        {
          id: "bairro",
          label: "Bairro",
          type: "text",
          placeholder: "BAIRRO",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
          particionado: 3
        },
        {
          id: "cidade",
          label: "Cidade",
          type: "text",
          placeholder: "CIDADE",
          defaultValue: "",
          classe:
            "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center", 
          particionado: 3
        }
      ],
      botao: {
        texto: "Cadastrar",
        classe:
          "bg-pink-500 text-white p-4 rounded-full transition-colors duration-300 hover:bg-pink-600",
      },
    }
  ];
};