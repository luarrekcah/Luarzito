const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();
const Canvas = require("canvas");
if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `ATTACH_FILES` para continuar"
      );
  const usuario =
    message.mentions.users.first() ||
    bot.users.cache.get(argumentos[0]) ||
    message.author;
  const avatar = usuario.avatarURL({
    dynamic: true,
    format: "png",
    size: 1024
  });
  if (usuario.bot) return message.channel.send("Mencione um usuário.");
  let icons = [];
  /*
   if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send("Eu não tenho permissão de `ATTACH_FILES` para prosseguir.");
*/
  const bref = database.ref(`Perfis/${usuario.id}/`);
  bref.once("value").then(async function(db) {
    let autores;
    let razoes;
    if (db.val() === null) {
      autores = [];
      razoes = [];
      //nul perfil ini

      const aguarde = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Carregando o perfil")
          .setDescription(`Coletando informações de ${usuario}...`)
        .setFooter("Salvando no banco de dados...")
      );

      const canvas = Canvas.createCanvas(800, 600);
      const ctx = canvas.getContext("2d");

      const background_wall = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png"
      );
      ctx.drawImage(background_wall, 0, 0, canvas.width, canvas.height);

      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/757308101182357518/793794719355371540/perfil_ico2.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#000000";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Slightly smaller text placed above the member's display name
      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${usuario.username}`,
        canvas.width / 3.5,
        canvas.height / 2.1
      );

      ctx.font = "40px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(`REPs:0`, canvas.width / 1.35, canvas.height / 8.7);

      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `Sem bio, use lz.bio para setar uma.`,
        canvas.width / 15.0,
        canvas.height / 1.2
      );
      //icons ini
      if (usuario.id === message.guild.owner.id) {
        icons.push(
          "https://cdn.discordapp.com/attachments/742068003583295623/793795985376673792/clipart3212846.png"
        );
      }
      if (icons == "" || icons == null || icons == undefined) {
      } else {
        if (icons[0]) {
          const icon_1 = await Canvas.loadImage(icons[0]);
          ctx.drawImage(icon_1, 260, 415, 25, 25);
        }
        if (icons[1]) {
          const icon_2 = await Canvas.loadImage(icons[1]);
          ctx.drawImage(icon_2, 260, 430, 25, 25);
        }
      }

      //icons fim

      //casal info

      const diES = 25;
      const ciBA = 200;

      ctx.beginPath();
      ctx.arc(diES + 100, ciBA + 100, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatarIcon = await Canvas.loadImage(avatar);
      ctx.drawImage(avatarIcon, diES, ciBA, 200, 200);
      //valor 1 = quanto maior vai pra direita
      //valor 2 = quanto maior vai pra baixo
      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "perfil.png"
      );

      message.channel
        .send(message.author, attachment)
        .then(aguarde.delete())
        .then(message.delete({ timeout: 500 }));

      //PERFIL CANVAS FIM
      bref.set({
        Reps: 0,
        Reps_autores: autores,
        Reps_razoes: razoes,
        Reais: 0,
        fundo_perfil:
          "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
        casadocom_tempo: 0,
        casadocom: 0,
        sobremim: ""
      });

      //perfil canvas ini
    } else {
      //PERFIL CANVAS INI
      autores = db.val().Reps_autores;
      razoes = db.val().Reps_razoes;

      const aguarde = await message.channel.send(
        new Discord.MessageEmbed()
          .setColor("GREEN")
          .setTitle("Carregando o perfil deste usuário")
          .setDescription(`Coletando informações de ${usuario}...`)
      );

      const canvas = Canvas.createCanvas(800, 600);
      const ctx = canvas.getContext("2d");

      const background_wall = await Canvas.loadImage(db.val().fundo_perfil);
      ctx.drawImage(background_wall, 0, 0, canvas.width, canvas.height);

      const background = await Canvas.loadImage(
        "https://cdn.discordapp.com/attachments/757308101182357518/793794719355371540/perfil_ico2.png"
      );
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = "#000000";
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Slightly smaller text placed above the member's display name
      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${
          usuario.username.length > 20
            ? usuario.username.slice(0, 20) + "..."
            : usuario.username
        }`,
        canvas.width / 3.5,
        canvas.height / 2.1
      );

      ctx.font = "40px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `REPs:${db.val().Reps}`,
        canvas.width / 1.35,
        canvas.height / 8.7
      );

      ctx.font = "28px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(
        `${
          db.val().sobremim.length >= 40
            ? db.val().sobremim.slice(0, 40) +
              "\n" +
              db.val().sobremim.slice(40, 80) +
              "\n" +
              db.val().sobremim.slice(80)
            : db.val().sobremim == ""
            ? "Sem bio, use lz.bio para setar uma."
            : db.val().sobremim
        }`,
        canvas.width / 15.0,
        canvas.height / 1.2
      );
      //icons ini
      if (usuario.id === message.guild.owner.id) {
        icons.push(
          "https://cdn.discordapp.com/attachments/742068003583295623/793795985376673792/clipart3212846.png"
        );
      }
      console.log(icons);

      //icons fim

      //casal info
      if (
        db.val().casadocom == null ||
        db.val().casadocom == 0 ||
        db.val().casadocom == undefined
      ) {
      } else {
        icons.push("https://www.pngrepo.com/download/229312/diamond-ring.png");
        const casadocom = bot.users.cache.get(db.val().casadocom);

        const avatarcasadocom = casadocom.avatarURL({
          dynamic: true,
          format: "png",
          size: 1024
        });

        ctx.font = "28px sans-serif";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(
          `casado com ${casadocom.username}`,
          canvas.width / 3.5,
          canvas.height / 1.8
        );

        /* const avatarIconCasado = await Canvas.loadImage(avatarcasadocom);
          ctx.drawImage(avatarIconCasado, 600, 200, 200, 200);
          */
      }

      if (icons == "" || icons == null || icons == undefined) {
        //not
      } else {
        const icon_1 = await Canvas.loadImage(icons[0]);
        ctx.drawImage(icon_1, 260, 415, 25, 25);
        // const icon_2 = await Canvas.loadImage(icons[1]);
        //ctx.drawImage(icon_2, 260, 430, 25, 25);
      }

      const diES = 25;
      const ciBA = 200;

      ctx.beginPath();
      ctx.arc(diES + 100, ciBA + 100, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      const avatarIcon = await Canvas.loadImage(avatar);
      ctx.drawImage(avatarIcon, diES, ciBA, 200, 200);
      //valor 1 = quanto maior vai pra direita
      //valor 2 = quanto maior vai pra baixo
      const attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        "perfil.png"
      );

      message.channel
        .send(message.author, attachment)
        .then(aguarde.delete())
        .then(message.delete({ timeout: 500 }));

      //PERFIL CANVAS FIM
    }
  });
};
