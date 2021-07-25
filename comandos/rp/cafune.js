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

  const autor = message.author.id;
  const autorV = autor + 1 - 1;
  const usuario = bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  if (!usuario) {
    return message.reply(
      "lembre-se de mencionar um usuário válido para fazer cafuné!"
    );
  }
  if (usuario === message.author)
    return message.channel
      .send("Cafuné em sí mesmo? 😳")
      .then(message.delete())
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      }); 
  const usuarioID = usuario.id;
  const usuarioV = usuarioID + 1 - 1;
  const amizadeID = autorV + usuarioV;
  const pontos = Math.floor(Math.random() * 5) + 1;

  var list = [
    "https://media.tenor.com/images/c7192cc8ffa738690156fbb9334a8937/tenor.gif",
    "https://media.tenor.com/images/c5acf899741117647a56c80ad6f459ca/tenor.gif"
  ];

  var rand = list[Math.floor(Math.random() * list.length)];

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
          .setTitle(":sparkling_heart: Owwwn cafunézinho :sparkling_heart:")
          .setColor("RANDOM")
          .setImage(rand)
          .setTimestamp()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);

        await message.channel.send(
          `${message.author} Fez cafuné em ${usuario}`,
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
          .setTitle(":sparkling_heart: Owwwn cafunézinho :sparkling_heart:")
          .setColor("RANDOM")
          .setImage(rand)
          .setTimestamp()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);

        await message.channel.send(
          `${message.author} Fez cafuné em ${usuario}`,
          embed
        );
        //RP - FIM RP
      }
    });
};
