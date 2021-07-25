const Discord = require("discord.js");
const firebase = require("firebase");
const talkedRecently = new Set();

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  const firebase = require("firebase");
  const database = firebase.database();

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "Ajuda - carta",
      "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
    )

    .setThumbnail(
      "https://media2.giphy.com/media/55gPcfOEQBkAfvtoE0/source.gif"
    )
    .setColor("#15005c")
    .setDescription(
      "Use esse comando com moderação, peça desculpas para alguém, uma última palavra depois daquele block... Tenha um bom uso!"
    )
    .addField("Uso", `${bot.prefixo}carta <ID> <texto>`);

  const user =
    bot.users.cache.get(argumentos[0]) || message.mentions.users.first();

  if (!user && argumentos[0])
    return message.channel
      .send("Não conheço nenhum usuário com o id `" + argumentos[0] + "`.")
      .then(message.channel.send(embed));

  if (!user) return message.channel.send(embed);

  if (user === message.author)
    return message.channel
      .send("Você não pode mandar carta à sí mesmo.")
      .then(message.delete())
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      });

  const autores = [];
  const razoes = [];
  if (talkedRecently.has(message.author.id))
    return message.channel.send("Espere 20 segundos para enviar outra carta.");
  let bref = database.ref(`Perfis/${user.id}/Carta`);
  let brefA = database.ref(`Perfis/${message.author.id}/Carta`);
  let dbsA = database.ref(`Perfis/${message.author}`);
  let dbsAm = database.ref(`Perfis/${user.id}`);
  dbsA.once("value").then(async function(dbsa) {
    if (dbsa.val() === null) {
      dbsA.set({
        Reps: 0,
        Reps_autores: autores,
        Reps_razoes: razoes,
        Reais: 0,
        fundo_perfil:
          "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
        casadocom_tempo: 0,
        casadocom: 0,
        sobremim: ""
      });
    }
  });
  dbsAm.once("value").then(async function(dbsam) {
    if (dbsam.val() === null) {
      dbsAm.set({
        Reps: 0,
        Reps_autores: autores,
        Reps_razoes: razoes,
        Reais: 0,
        fundo_perfil:
          "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
        casadocom_tempo: 0,
        casadocom: 0,
        sobremim: ""
      });
    }
  });
  bref.once("value").then(async function(db) {
    if (db.val() == null) {
      database.ref(`Perfis/${user.id}/Carta`);
      bref.set({
        carta: "sim"
      });
      //ENVIAR CARTA
      /*
        if (talkedRecently.has(message.author.id)) {
          message.reply(
            `Você já enviou uma carta, aguarde um tempo até enviar outra!`
          );
          message.channel.send(talkedRecently);
        } else {
        */
      const carta = argumentos.slice(1).join(" ");
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          "Ajuda - carta",
          "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
        )
        .setThumbnail(
          "https://media2.giphy.com/media/55gPcfOEQBkAfvtoE0/source.gif"
        )
        .setColor("RANDOM")
        .setDescription(
          "Use esse comando com moderação, peça desculpas para alguém, uma última palavra depois daquele block... Tenha um bom uso!"
        )
        .addField("Uso", `${bot.prefixo}carta <ID> <texto>`);

      if (!user)
        return message.channel.send(
          "<@" + message.author + ">" + " você se esqueceu do usuário (ID)!",
          embed
        );

      if (!carta)
        return message.channel.send(
          "<@" + message.author + ">" + " você se esqueceu do texto!",
          embed
        );

      try {
        /*
          "\n\nCaso você não queira mais receber cartas, digite `" +
          bot.prefixo +
          "cartaconfig off`"*/
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor(
            "Sua carta foi enviada com sucesso para " + user.username + "!",
            "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
          );
        user
          .send(
            "Mensagem de <@" +
              message.author.id +
              "> - " +
              message.author.username +
              " (`" +
              message.author.id +
              "`):\n\n" +
              carta
          )
          .then(message.channel.send(embed));
        user
          .send(
            "Caso você não queira mais receber cartas, digite `" +
              bot.prefixo +
              "cartaconfig off`"
          )
          .catch(async err => {
            console.log(err);
            message.reply("Não posso mandar mensagem na DM deste usuário.");
          });
        message.delete({ timeout: 5000 });
      } catch (e) {
        console
          .log("erro: " + e)
          .then(
            message.channel.send("Ocorreu um erro ao enviar a carta: " + e)
          );
      }
    }

    //    }

    if (db.val().carta === "nao") {
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          `${user.username} optou por não receber cartas!`,
          "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
        )
        .setColor("RED");
      message.channel.send(embed);
    } else {
      //ENVIAR CARTA
      /*
          if (talkedRecently.has(message.author.id)) {
            message.reply(
              `Você já enviou uma carta, aguarde um tempo até enviar outra!`
            );
            message.channel.send(talkedRecently);
          } else {
          */
      const carta = argumentos.slice(1).join(" ");
      const embed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(
          "Ajuda - carta",
          "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
        )
        .setThumbnail(
          "https://media2.giphy.com/media/55gPcfOEQBkAfvtoE0/source.gif"
        )
        .setColor("RANDOM")
        .setDescription(
          "Use esse comando com moderação, peça desculpas para alguém, uma última palavra depois daquele block... Tenha um bom uso!"
        )
        .addField("Uso", `${bot.prefixo}carta <ID> <texto>`);
      if (!argumentos[0]) return message.channel.send(embed);

      if (!carta)
        return message.channel.send(
          "<@" + message.author + ">" + " você se esqueceu do texto!",
          embed
        );

      try {
        const embed = new Discord.MessageEmbed().setAuthor(
          "Sua carta foi enviada com sucesso para " + user.username + "!",
          "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
        );
        user
          .send(
            "Mensagem de <@" +
              message.author.id +
              "> - " +
              message.author.username +
              " (`" +
              message.author.id +
              "`):\n\n" +
              carta
          )
          .then(message.channel.send(embed));
        user.send(
          "Caso você não queira mais receber cartas, digite `" +
            bot.prefixo +
            "cartaconfig off`"
        );
        message.delete({ timeout: 5000 });
      } catch (e) {
        console
          .log("erro: " + e)
          .then(
            message.channel.send("Ocorreu um erro ao enviar a carta: " + e)
          );
      }
    }

    // }
  });

  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 20000);
};
