const Discord = require("discord.js");
const firebase = require("firebase");

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

  let user = message.mentions.users.first()|| bot.users.cache.get(argumentos[0]) || message.author;
  let bref = database.ref(`Perfis/${user.id}`);
  database
    .ref(`Perfis/${user.id}`)
    .once("value")
    .then(async function(db) {
      if (db.val() == null) {
        database.ref(`Perfis/${user.id}`);
        bref.set({
          Reais: 0
        });
        const embed2 = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`Saldo bancário de ${user.username}:`)
          //.setTitle("**Banco**")
          .addField(`**Lennes:**`, `L$ 0`)
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/757308101182357518/759625647441182741/pngwing.com_2.png"
          );
        message.channel.send(embed2);
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("GREEN")
          .setAuthor(`Saldo bancário de ${user.username}:`)
          .addField(`**Lennes:**`, `L$ ${db.val().Reais}`)
          .setThumbnail(
            "https://cdn.discordapp.com/attachments/757308101182357518/759625647441182741/pngwing.com_2.png"
          );
        message.channel.send(embed);
      }
    });
};
