const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const talkedRecently = new Set();

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (talkedRecently.has(message.author.id))
    return message.channel.send("Espere 1 hora para usar o comando novamente.");
  const usuario =
    message.mentions.users.first() || bot.users.cache.get(argumentos[0]);

  if (!usuario) return message.channel.send("Mencione alguém!");
  if (usuario === message.author)
    return message.channel.send("Você não pode dar reps em sí mesmo.");
  const bref = database.ref(`Perfis/${usuario.id}/`);
  let razao = argumentos.slice(1).join(" ");
  if (!razao) {
    razao = "Boa pessoa!";
  }
  if (usuario.bot)
    return message.channel.send("Mencione um usuário, não um bot.");
  bref.once("value").then(async function(db) {
    let autores;
    let razoes;

    if (db.val() == null) {
      razoes = [];
      autores = [];
      bref.set({
        Reps: 1,
        Reps_autores: [message.author.id],
        Reps_razoes: [razao],
        Reais: 0,
        fundo_perfil:
          "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
        casadocom_tempo: 0,
        casadocom: 0,
        sobremim: ""
      });
      message.channel
        .send(`${message.author} - Você deu rep!`)
        .then(message.delete());
      const embedR = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL({ format: "png", size: 1024 })
        )
        .setDescription(`<@${message.author.id}> te deu pontos de reputação!`)
        .addField("Razão:", "`" + razao + "`")
        .addField(
          "Razão contra minhas regras? Denuncie!",
          `Id do usuário: ${message.author.id}\n\nCanal: ${message.channel.name} (${message.channel.id})\n\nServidor: ${message.guild.name} (${message.guild.id})\n\nId da mensagem: ${message.id}`
        )
        .setTimestamp();
      usuario.send(embedR);
      talkedRecently.add(message.author.id);
      setTimeout(() => {
        talkedRecently.delete(message.author.id);
      }, 1000 * 60 * 60);
    } else {
      autores = db.val().Reps_autores + ".";
      razoes = db.val().Reps_razoes;
      if (autores.includes(message.author.id))
        return message.channel.send("Você já deu Rep para esse usuário.");
      bref.update({
        Reps_autores: [db.val().Reps_autores + "," + message.author.id],
        Reps_razoes: [db.val().Reps_razoes + "," + razao],
        Reps: db.val().Reps + 1
      });
      message.channel
        .send(`${message.author} - Você deu rep!`)
        .then(message.delete());
      const embedR = new Discord.MessageEmbed()
        .setAuthor(
          message.author.username + "#" + message.author.discriminator,
          message.author.avatarURL({ format: "png", size: 1024 })
        )
        .setDescription(`<@${message.author.id}> te deu pontos de reputação!`)
        .addField("Razão:", "`" + razao + "`")
        .addField(
          "Razão contra minhas regras? Denuncie!",
          `Id do usuário: ${message.author.id}\n\nCanal: ${message.channel.name} (${message.channel.id})\n\nServidor: ${message.guild.name} (${message.guild.id})\n\nId da mensagem: ${message.id}`
        )
        .setTimestamp();
      usuario.send(embedR);
    }
    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 1000 * 60 * 60);
  });
};
