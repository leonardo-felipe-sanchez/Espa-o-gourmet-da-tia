const nodemailer = require("nodemailer");

const Dados = async (req, res) => {
  try {
    const { nome, email, telefone, mensagem } = req.body;
    console.log("Dados recebidos:", { nome, email, telefone, mensagem });

    // 1. Criar conta de teste (Ethereal) - Rápido e não precisa de senha real
    let contaTeste = await nodemailer.createTestAccount();

    // 2. Configurar o transportador (CORRIGIDO: createTransport)
    const transportador = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: contaTeste.user,
        pass: contaTeste.pass,
      },
    });

    // 3. Enviar o e-mail
    const info = await transportador.sendMail({
      from: '"Espaço Gourmet" <contato@gourmetdatia.com>',
      to: email, // Enviando para o email que a pessoa digitou no form
      subject: "Recebemos sua mensagem! ✔",
      text: `Olá ${nome}, recebemos seu contato sobre: ${mensagem}`,
      html: `<b>Nome:</b> ${nome}<br><b>Mensagem:</b> ${mensagem}`,
    });

    // 4. Mostrar o link para você ver o e-mail que "chegou"
    const urlLink = nodemailer.getTestMessageUrl(info);
    console.log("URL para visualizar o e-mail enviado: %s", urlLink);

    // IMPORTANTE: Você PRECISA enviar uma resposta, senão o formulário no React
    // vai ficar "carregando" para sempre.
    res.json({ Sucesso: true, url: urlLink });

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro ao processar" });
  }
};

module.exports = { Dados };