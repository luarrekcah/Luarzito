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
  const usuario = message.mentions.users.first();
  if (!usuario) {
    return message.reply(
      "lembre-se de mencionar um usuário válido para tocar as mãos!"
    );
  }
  
  const usuarioID = usuario.id;
  const usuarioV = usuarioID + 1 - 1;
  const amizadeID = autorV + usuarioV;
  const pontos = Math.floor(Math.random() * 5) + 1;

  const list = [
    "https://pa1.narvii.com/6330/75522b05ed1d49e6dec416833beb914c43df51bb_hq.gif",
    "https://media1.tenor.com/images/314a2f7c3647ec0b9ba4100f8e35dc2e/tenor.gif?itemid=12270042",
    "https://media1.tenor.com/images/cb206c88292948ac48b78616002bbf51/tenor.gif?itemid=16477984",
    "https://media1.tenor.com/images/14226cfc51aeaf72be5ec5ac71b1155b/tenor.gif?itemid=16227553",
    "https://media1.tenor.com/images/1ae1e09ccbd360d3a243c315a324ae10/tenor.gif?itemid=14828422",
    "https://media1.tenor.com/images/e5e75c422411de4899050d1e7a7a0822/tenor.gif?itemid=14180916",
    "https://media1.tenor.com/images/ab9aff21ab4d16fbf5922e4dd7dc5673/tenor.gif?itemid=14828411",
    "https://media1.tenor.com/images/94bd49734f3e0f19890510ae60696f06/tenor.gif?itemid=16301324",
    "https://i.pinimg.com/originals/8d/e7/eb/8de7eb544c799cec7f3856092d5fd91b.gif"
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
        var main = message.channel.createMessageCollector(
          a => a.author.id == message.mentions.users.first(),
          {
            time: 60000,
            max: 10
          }
        );

        message.channel.send(
          `${usuario}, ${message.author} quer apertar sua mão \n Digite "apertar" para aceitar!`
        );
var col;
        main.on("collect", a => {
          if (a.content.toLowerCase() == "apertar") {
            if (col == "yah") return;
            const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setImage(rand)
              .setTimestamp()
              .setThumbnail()
              .setFooter(
                `Pontos de amizade: ${db.val().amizadeNivel +
                  pontos} | Olha o corona (-_-  )`
              );

            message.channel.send(
              `${message.author} acaba de apertar a mão de ${usuario}`,
              embed
            );
            col = "yah";
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
        var main = message.channel.createMessageCollector(
          a => a.author.id == message.mentions.users.first(),
          {
            time: 60000,
            max: 10
          }
        );

        message.channel.send(
          `${usuario}, ${message.author} quer apertar sua mão \n Digite "apertar" para aceitar!`
        );
var col;
        main.on("collect", a => {
          if (a.content.toLowerCase() === "apertar") {
            if (col == "yah") return;
            const embed = new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setImage(rand)
              .setTimestamp()
              .setThumbnail()
              .setFooter(
                `Pontos de amizade: ${db.val().amizadeNivel +
                  pontos} | Olha o corona (-_-  )`
              );

            message.channel.send(
              `${message.author} acaba de apertar a mão de ${usuario}`,
              embed
            );
            col = "yah";
          }
        });

        //RP - FIM RP
        /*main.on("end", a => {
  message.channel.send(`${message.author} ficou no vacuo...`);
});
*/
      }
    });
};
