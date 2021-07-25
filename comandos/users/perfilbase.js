const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const usuario =
    message.mentions.users.first() ||
    bot.users.cache.get(argumentos[0]) ||
    message.author;
  const avatar = usuario.avatarURL; //({ dynamic: true, format: "png", size: 1024 });
  const aguarde = await message.channel.send(
    `Aguarde enquanto coleto os dados de <@${usuario.id}>`
  );
  const bref = database.ref(`Perfis/${usuario.id}/`);
  bref.once("value").then(async function(db) {
    if (db.val() == null) {
      const perfil = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `Perfil de ${usuario.username}`,
          "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-2/512/account_card_user_profile-512.png"
        )
        //.setThumbnail(avatar)
        .addField("REPs:", "0")
        .addField("Banco:", "R$0")
        .addField(
          "Casado(a) com:",
          "Oh... Infelizmente essa pessoa não está casada ainda, caso queira, use o comando `" +
            bot.prefixo +
            "casar` para se casar!"
        )
        .addField(
          "Sobre mim:",
          `Sem sobre mim, você sabia que pode usar o comando \`${bot.prefixo}sobremim\` para colocar textinho aqui?!`
        )
        .setFooter("Logo uma imagem de perfil será desenvolvida... Aguarde :D");
      message.channel
        .send(perfil)
        .then(aguarde.delete())
        .then(message.delete());
      bref.set({
        Reps: 0,
        Reps_autores: [],
        Reps_razoes: [],
        Reais: 0,
        fundo_perfil: "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
        casadocom_tempo: 0,
        casadocom:
          "Oh... Infelizmente essa pessoa não está casada ainda, caso queira, use o comando `" +
          bot.prefixo +
          "casar` para se casar!",
        sobremim: `Sem sobre mim, você sabia que pode usar o comando \`${bot.prefixo}sobremim\` para colocar textinho aqui?!`
      });
    } else {
      const perfil = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          `Perfil de ${usuario.username}`,
          "https://cdn2.iconfinder.com/data/icons/flat-style-svg-icons-part-2/512/account_card_user_profile-512.png"
        )
        .setThumbnail(avatar)
        .addField("REPs:", db.val().Reps)
        .addField("Banco:", `R$${db.val().Reais}`)
        .addField("Casado(a) com:", db.val().casadocom)
        .addField("Sobre mim:", db.val().sobremim)
        .setFooter("Logo uma imagem de perfil será desenvolvida... Aguarde :D");
      message.channel
        .send(perfil)
        .then(aguarde.delete())
        .then(message.delete());
    }
  });
};
