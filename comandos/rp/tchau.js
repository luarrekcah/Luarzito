
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
  const usuario =
    bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  if (!usuario) {
    return message.reply(
      "lembre-se de mencionar um usuário válido para se despedir!"
    );
  }
  
  if (usuario === message.author)
    return message.channel
      .send("Você não pode se despedir de sí mesmo")
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

  const lista = [
    "https://media.tenor.com/images/4b9b18c7aae49b108354a22a0cb615fc/tenor.gif",
    "https://media.tenor.com/images/33ee3367675a99d39888a7ad273e0291/tenor.gif"
  ];

  var rand = lista[Math.floor(Math.random() * lista.length)];

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

        const embedWave = await message.channel.send(
          `${message.author} está se despedindo de ${usuario}`,
          new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setImage(rand)
            .setTimestamp()
            .setThumbnail()
            .setFooter(`Pontos de amizade: ${0 + pontos}`)
        );

        await embedWave.react("👋");

        const filter = (reaction, userM) => {
          return ["👋"].includes(reaction.emoji.name) && userM.id === usuarioID;
        };

        embedWave
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "👋") {
              var randR = lista[Math.floor(Math.random() * lista.length)];
              const embed = new Discord.MessageEmbed()
                .setTitle("Byee!")
                .setColor("GREEN")
                .setDescription(`${usuario} retribuiu ${message.author}`)
                .setImage(randR)
                .setTimestamp()
                .setThumbnail()  //  .setFooter()
                .setAuthor(message.author.tag);
              message.channel.send(embed);
            }
          });

        //RP - FIM RP
      } else {
        database.ref(`Usuários/${amizadeID}`);
        bref.update({
          amizadeNivel: db.val().amizadeNivel + pontos
        });

        //RP - ENVIAR RP

        const embedWave = await message.channel.send(
          `${message.author} está se despedindo de ${usuario}`,
          new Discord.MessageEmbed()
            .setColor("PURPLE")
            .setImage(rand)
            .setTimestamp()
            .setThumbnail()
            .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`)
        );

        await embedWave.react("👋");

        const filter = (reaction, user) => {
          return ["👋"].includes(reaction.emoji.name) && user.id === usuarioID;
        };

        embedWave
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "👋") {
              var randR = lista[Math.floor(Math.random() * lista.length)];
              const embed = new Discord.MessageEmbed()
                .setTitle("Byee!")
                .setColor("PURPLE")
                .setDescription(`${usuario} retribuiu ${message.author}`)
                .setImage(randR)
                .setTimestamp()
                .setThumbnail();
              message.channel.send(embed);
            }
          });

        //RP - FIM RP
      }
    });
};
