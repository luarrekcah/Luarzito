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
      "lembre-se de mencionar um usuário válido para acordar!"
    );
  }
  
    if (usuario === message.author)
    return message.channel
      .send("Oxi! Você já está acordado 🧐")
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
    "https://i.pinimg.com/originals/58/ba/11/58ba11ccc95470174a0bdbc24bd181e2.gif",
    "https://i.gifer.com/49vy.gif",
    "https://gifimage.net/wp-content/uploads/2017/09/anime-wake-up-gif-4.gif"
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

        let avatar = message.author.displayAvatarURL({ format: "png" });

        const embedTreta = await message.channel.send(
          `${message.author} está tentando acordar ${usuario}`,
          new Discord.MessageEmbed()
            .setTitle("Acorda baiano!")
          .setColor("#000000")
          .setImage(rand)
          .setTimestamp()
          .setThumbnail()
          .setAuthor(message.author.tag, avatar)
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`)
        );

        await embedTreta.react("😴");

        const filter = (reaction, userM) => {
          return ["😴"].includes(reaction.emoji.name) && userM.id === usuarioID;
        };

        embedTreta
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "😴") {
           
              const embed = new Discord.MessageEmbed()
                .setTitle("Uh, a bela adormecida apareceu!")
                .setColor("GREEN")
                .setDescription(`${usuario} apareceu graças à ${message.author}`)
                .setImage(rand)
                .setTimestamp()
                .setThumbnail()
                //  .setFooter()
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

       let avatar = message.author.displayAvatarURL({ format: "png" });

        const embedTreta = await message.channel.send(
          `${message.author} está tentando acordar ${usuario}`,
          new Discord.MessageEmbed()
            .setTitle("Acorda baiano!")
          .setColor("RED")
          .setImage(rand)
          .setTimestamp()
          .setThumbnail()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`)
        );

        await embedTreta.react("😴");

        const filter = (reaction, userM) => {
          return ["😴"].includes(reaction.emoji.name) && userM.id === usuarioID;
        };

        embedTreta
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "😴") {
           
              const embed = new Discord.MessageEmbed()
                .setTitle("Uh, bela a adormecida apareceu")
                .setColor("GREEN")
                .setDescription(`${usuario} apareceu graças à ${message.author}`)
                .setImage(rand)
                .setTimestamp()
                .setThumbnail()
                //  .setFooter()
                .setAuthor(message.author.tag);
              message.channel.send(embed);
            }
          });
        //RP - FIM RP
      }
    });
};
