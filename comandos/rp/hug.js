const Discord = require("discord.js");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => { if (!message.guild.me.permissions.has("EMBED_LINKS"))
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
      "lembre-se de mencionar um usuário válido para abraçar!"
    );
  }
  const usuarioID = usuario.id;
  const usuarioV = usuarioID + 1 - 1;
  const amizadeID = autorV + usuarioV;
  const pontos = Math.floor(Math.random() * 5) + 1;

  const list = [
    "https://i.imgur.com/niD8tPb.gif",
    "https://data.whicdn.com/images/118956057/original.gif",
    "https://i.pinimg.com/originals/6e/6e/53/6e6e53fb69d7b74286c9d2817e1fc3ca.gif",
    "https://pa1.narvii.com/6471/68702f51590c932bf0dbebaef9804c31c664ebd9_hq.gif",
    "https://acegif.com/wp-content/uploads/anime-hug.gif",
    "https://i.pinimg.com/originals/02/7e/0a/027e0ab608f8b84a25b2d2b1d223edec.gif",
    "https://media4.giphy.com/media/l2QDM9Jnim1YVILXa/giphy.gif",
    "https://i.pinimg.com/originals/6d/b5/4c/6db54c4d6dad5f1f2863d878cfb2d8df.gif",
    "https://i.pinimg.com/originals/b6/2f/04/b62f047f8ed11b832cb6c0d8ec30687b.gif",
    "https://steamuserimages-a.akamaihd.net/ugc/784103565766330825/3D42253804E4AC3D92DC416B306CEA572EF860A0/",
    "https://i.imgur.com/wOmoeF8.gif",
    "https://i.imgur.com/nrdYNtL.gif",
    "https://i.imgur.com/v47M1S4.gif",
    "https://i.imgur.com/82xVqUg.gif",
    "https://i.imgur.com/4oLIrwj.gif",
    "https://i.imgur.com/6qYOUQF.gif",
    "https://i.imgur.com/UMm95sV.gif"
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
        const embed = new Discord.MessageEmbed()
          .setTitle("Owwwn :two_hearts:")
          .setColor("RANDOM")
          .setImage(rand)
          .setTimestamp()
          .setThumbnail()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);
        await message.channel.send(
          `${message.author} acaba de abraçar ${usuario}`,
          embed
        );
        
        //RP - FIM RP
        
      } else {
        database.ref(`Usuários/${amizadeID}`);
        bref.update({
          amizadeNivel: db.val().amizadeNivel + pontos
        });
        
        //RP - ENVIAR RP
        
        let avatar = message.author.displayAvatarURL({ format: "png" });
        const embed = new Discord.MessageEmbed()
          .setTitle("Owwwn :two_hearts:")
          .setColor("RANDOM")
          .setImage(rand)
          .setTimestamp()
          .setThumbnail()
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel + pontos}`);
        await message.channel.send(
          `${message.author} acaba de abraçar ${usuario}`,
          embed
        );
        
        //RP - FIM RP
        
      }
    });
};
