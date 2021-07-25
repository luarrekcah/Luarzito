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
      "lembre-se de mencionar um usuário válido para bater!"
    );
  }
  
    if (usuario === message.author)
    return message.channel
      .send("Por que quer agredir a sí mesmo? :/")
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
    "https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943%22",
    "https://i.pinimg.com/originals/6d/4c/be/6d4cbe4a871d8bd4a89eb60169e450cd.gif",
    "https://2.bp.blogspot.com/-PYN238rYnEU/WHEAGVNx2YI/AAAAAAAABDA/XBc0yUNgq5sCr1BpwsTHFgNeOOykijHBQCEw/s640/giphygeubvgyubvehjvsebdash.gif",
    "https://24.media.tumblr.com/tumblr_m0itlhg6Gy1r50au6o1_500.gif",
    "https://pa1.narvii.com/6576/e6312551cf18cdd21a2ae9bce59dd58fa7589aca_hq.gif?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiKjovL3BhMS5uYXJ2aWkuY29tLzY1NzYvZSoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE1NzA3NDE3ODN9fX1dfQ__&Signature=VGsIB-I4nodDUmgR1CxTrCOi3ShKKXyS-TLXjinfCRXknF4rKunEoBz0yF66saHffZ3pjAlWoWoZ8mwRHpe5~PxfdYx9CDMqhFfFM4Umux3LfvzkKTh0TyS47WPgX0WX5NWVYdgGcy2EitIGdc2VeH38UgEV4nWBqZTDgwCAOcE_&Key-Pair-Id=APKAICUDKLX2XOCDJKNA",
    "https://thumbs.gfycat.com/SevereEnormousAzurewingedmagpie-size_restricted.gif",
    "https://thumbs.gfycat.com/ShadowyFoolhardyEyas-max-1mb.gif"
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

        const embedTreta = await message.channel.send(
          `${message.author} acaba de bater em ${usuario}`,
          new Discord.MessageEmbed()
            .setColor("RED")
            // .setAuthor(`😱Tretaaa😱`)
            .setImage(rand)
            .setTimestamp()
            .setThumbnail()
            .setFooter(`Pontos de amizade: ${0 + pontos}`)
        );

        await embedTreta.react("👊");

        const filter = (reaction, userM) => {
          return ["👊"].includes(reaction.emoji.name) && userM.id === usuarioID;
        };

        embedTreta
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "👊") {
              var randR = lista[Math.floor(Math.random() * lista.length)];
              const embed = new Discord.MessageEmbed()
                .setTitle("HOHO, temos uma briga!")
                .setColor("GREEN")
                .setDescription(`${usuario} revidou em ${message.author}`)
                .setImage(randR)
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

        const embedTreta = await message.channel.send(
          `${message.author} acaba de bater em ${usuario}`,
          new Discord.MessageEmbed()
            .setColor("RED")
            // .setAuthor(`😱Tretaaa😱`)
            .setImage(rand)
            .setTimestamp()
            .setThumbnail()
            .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`)
        );

        await embedTreta.react("👊");

        const filter = (reaction, user) => {
          return ["👊"].includes(reaction.emoji.name) && user.id === usuarioID;
        };

        embedTreta
          .awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ["time"]
          })
          .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === "👊") {
              var randR = lista[Math.floor(Math.random() * lista.length)];
              const embed = new Discord.MessageEmbed()
                .setTitle("HOHO, temos uma briga!")
                .setColor("GREEN")
                .setDescription(`${usuario} revidou em ${message.author}`)
                .setImage(randR)
                .setTimestamp()
                .setThumbnail();
              //   .setFooter("Pau quebrando alek 👀")
              //     .setAuthor(message.author.tag);
              message.channel.send(embed);
            }
          });

        //RP - FIM RP
      }
    });
};
