const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  const usuario = message.author;
  const bref = database.ref(`Perfis/${usuario.id}/`);
  const link = argumentos.join(" ");
  if (!link)
    return message.channel.send(
      `Ahn... ${usuario} digite o link da sua imagem de fundo.`
    );
  bref.once("value").then(async function(db) {
    if (db.val() == null) {
      bref
        .set({
          Reps: 0,
          Reps_autores: [0],
          Reps_razoes: [""],
          Reais: 0,
          fundo_perfil:
            "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
          casadocom_tempo: 0,
          casadocom: 0,
          sobremim: ""
        })
        .then(
          message.channel.send(
            `${message.author} - Seu novo wall do perfil foi setado!`
          )
        )
        .then(message.delete());
    } else {
      bref
        .update({
          fundo_perfil: link
        })
        .then(
          message.channel.send(
            `${message.author} - Seu novo wall do perfil foi atualizado!`
          )
        )
        .then(message.delete());
    }
  });
};
