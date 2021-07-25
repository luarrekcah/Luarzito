//medidor de amizade
const Canvas = require("canvas");
const Discord = require("discord.js");
const canvas = Canvas.createCanvas(384, 128);
const ctx = canvas.getContext("2d");
const { createCanvas, loadImage } = require("canvas");
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

  const autor = message.author;
  const autorV = autor + 1 - 1;
  const usuario = bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  if (!autor)
    return message.reply(
      "lembre-se de mencionar um usuário válido para ver seus laços!"
    );

  const usuarioID = usuario.id;
  const usuarioV = usuarioID + 1 - 1;
  const amizadeID = autorV + usuarioV;
  let bref = database.ref(`Usuários/${amizadeID}`);
  database
    .ref(`Usuários/${amizadeID}`)
    .once("value")
    .then(async function(db) {
      if (db.val() == null) {
        const canvas = Canvas.createCanvas(260, 128); //384, 128
        const ctx = canvas.getContext("2d");

        const foto1 = await Canvas.loadImage(
          autor.displayAvatarURL({ format: "png" })
          // autor.avatarURL({ dynamic: true, format: "png", size: 1024 })
        );

        const foto2 = await Canvas.loadImage(
          usuario.displayAvatarURL({ format: "png" })
          //usuario.avatarURL({ dynamic: true, format: "png", size: 1024 })
        );

        ctx.drawImage(foto1, 3, 0, 128, 128); // -10, 0, 128, 128 //5 fica muito bom, mas notavel pra direita
        ctx.drawImage(foto2, 130, 0, 128, 128); //260, 0, 128, 128

        const couple = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "couple.png"
        );

        let desc = ":unamused: Mal se falam :unamused:";

        const amizade = new Discord.MessageEmbed()
          .setColor("RED")
          .attachFiles([couple])
          .setImage("attachment://couple.png")
          .setFooter(`Pontos de amizade: 0`);
        message.channel.send(desc, amizade);
        database.ref(`Usuários/${amizadeID}`);
        bref.set({
          amizadeNivel: 0
        });

        //ENVIAR O MEDIDOR

        //ENVIAR O MEDIDO FIM
      } else {
        //ENVIAR O MEDIDOR

        const canvas = Canvas.createCanvas(260, 128); //384, 128
        const ctx = canvas.getContext("2d");

        const foto1 = await Canvas.loadImage(
          autor.displayAvatarURL({ format: "png" })
          // autor.avatarURL({ dynamic: true, format: "png", size: 1024 })
        );

        const foto2 = await Canvas.loadImage(
          usuario.displayAvatarURL({ format: "png" })
          //usuario.avatarURL({ dynamic: true, format: "png", size: 1024 })
        );

        ctx.drawImage(foto1, 3, 0, 128, 128); // -10, 0, 128, 128 //5 fica muito bom, mas notavel pra direita
        ctx.drawImage(foto2, 130, 0, 128, 128); //260, 0, 128, 128

        const couple = new Discord.MessageAttachment(
          canvas.toBuffer(),
          "couple.png"
        );

        let desc;
        if (db.val().amizadeNivel >= 251) {
          desc = ":two_hearts: Amizade colorida :two_hearts:";
        } else if (db.val().amizadeNivel >= 101) {
          desc = ":grin: Amizade da boa :grin:";
        } else if (db.val().amizadeNivel >= 51) {
          desc = ":upside_down: Só bagunçando :upside_down:";
        } else if (db.val().amizadeNivel >= 21) {
          desc =
            ":face_with_monocle: Vem ai uma nova amizade? :face_with_monocle:";
        } else {
          desc = ":confused: Apenas estão se conhecendo :confused:";
        }

        const amizade = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .attachFiles([couple])
          .setImage("attachment://couple.png")
          .setFooter(`Pontos de amizade: ${db.val().amizadeNivel}`);
        message.channel.send(desc, amizade).then(message.delete());
        //ENVIAR O MEDIDOR FIM
      }
    });
};
