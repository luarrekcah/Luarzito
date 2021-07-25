const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  const usuario = message.author;
  const bref = database.ref(`Perfis/${usuario.id}/`);
  const sobremimE = argumentos.join(" ");
  if (!sobremimE)
    return message.channel.send(
      `Ahn... ${usuario} digite sua nova bio após o comando.`
    );
  if(sobremimE.length >= 120) return message.channel.send("Sua bio é muito grande, faça uma menor e mais resumida.");
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
          casadocom:
            "Oh... Infelizmente essa pessoa não está casada ainda, caso queira, use o comando `" +
            bot.prefixo +
            "casar` para se casar!",
          sobremim: sobremimE
        })
        .then(
          message.channel.send(
            `${message.author} - Sua nova bio foi setada para: \`${sobremimE}\`!`
          )
        )
        .then(message.delete());
    } else {
      bref
        .update({
          sobremim: sobremimE
        })
        .then(
          message.channel.send(
            `${message.author} - Sua nova bio foi atualizada para: \`${sobremimE}\`!`
          )
        )
        .then(message.delete());
    }
  });
};
