export const Formulario = {
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
        classe: "m-1 p-3 hover:border-2 border border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
      },
      {
        id: "telefone",
        label: "Telefone",
        type: "tel",
        placeholder: "TELEFONE",
        defaultValue: "",
        classe: "m-1 p-3 border hover:border-2 border-pink-500 w-full max-w-[320px] rounded-[1vw] text-center",
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
  };