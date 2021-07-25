const Discord = require("discord.js");
const firebase = require("firebase");
const superagent = require("superagent");

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
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  const autor = message.author.id;
  const autorV = autor + 1 - 1;
  const usuario =
    bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  if (!usuario) {
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Ajuda - Kiss")
      .setDescription("O uso deste comando aumentará a pontuação de amizade.")
      .setThumbnail(
        `https://images.vexels.com/media/users/3/144097/isolated/preview/3dedcd235214cdde6b4e171fdbf66c9d-heart-icon-by-vexels.png`
      )
      .addField(
        "✒️Uso",
        "`" + bot.prefixo + "kiss @luarrekcah` ou `701953428510736396`"
      )
      .addField("🔀Sinônimos:", "`beijar`, `beijo`, `kiss`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(message.author, ajuda);
  }
  if (autor == usuario)
    return message.channel.send("Você não pode se beijar :/");
  const usuarioID = usuario.id;
  const usuarioV = usuarioID + 1 - 1;
  const amizadeID = autorV + usuarioV;
  const pontos = Math.floor(Math.random() * 10) + 1;
  let body = await superagent.get("https://nekos.life/api/hug");
  const anime = body.url;
  console.log(body);
  let bref = database.ref(`Usuários/${amizadeID}`);
  database
    .ref(`Usuários/${amizadeID}`)
    .once("value")
    .then(async function(db) {
      if (db.val() == null) {
        database.ref(`Usuários/${amizadeID}`);
        bref.set({
          amizadeNivel: 0 + pontos
        });

        //RP - ENVIAR O RP

        const embed = new Discord.MessageEmbed()
          .setTitle(":sparkling_heart: Beijinhos :sparkling_heart:")
          .setColor("RANDOM")
          .setImage(anime)
          .setTimestamp()
          .setThumbnail()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);
        message.channel.send(
          `${message.author} acaba de beijar ${usuario}`,
          embed
        );

        //RP - FIM RP
      } else {
        database.ref(`Usuários/${amizadeID}`);
        bref.update({
          amizadeNivel: db.val().amizadeNivel + pontos
        });

        //RP - ENVIAR RP

        const embed = new Discord.MessageEmbed()
          .setTitle(":sparkling_heart: Beijinhos :sparkling_heart:")
          .setColor("RANDOM")
          .setImage(body.url)
          .setTimestamp()
          .setThumbnail()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);
        message.channel.send(
          `${message.author} acaba de beijar ${usuario}`,
          embed
        );

        //RP - FIM RP
      }
    });
};
