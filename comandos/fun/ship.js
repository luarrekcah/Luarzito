const Canvas = require("canvas");
const Discord = require("discord.js");
const canvas = Canvas.createCanvas(384, 128);
const ctx = canvas.getContext("2d");
const { createCanvas, loadImage } = require("canvas");

module.exports.run = async (bot, message, args) => {
  
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `ATTACH_FILES` para continuar"
      );
  
  //exportando o comando como ship
  let membro1 = message.mentions.members.first();
  let membro2 = message.mentions.members.last();

  if (!membro1 || !membro2) {
    const ajuda = new Discord.MessageEmbed()
      .setTitle("Ajuda - ship")
      .setColor("RED")
      .addField(
        "Uso:",
        "`lzship <menção> <menção>`"
      );
    message.channel.send(ajuda);
  }
  if (membro1 === membro2)
    return message.channel.send("Mencione duas pessoas diferentes");

  const amor = Math.floor(Math.random() * 100);
  const loveIndex = Math.floor(amor / 10);
  const loveLevel = "🟥".repeat(loveIndex) + "⬜️".repeat(10 - loveIndex);

  let nomeFim1 = membro1.user.username.length;
  let nomeFim2 = membro2.user.username.length;

  let calc1 = nomeFim1 - 3;
  let calc2 = nomeFim2 - 3;

  let nomeship;
  if (amor > 60) {
    nomeship =
      membro1.user.username.slice(0, 3) + membro2.user.username.slice(0, 3);
  } else if (amor >= 40) {
    nomeship =
      membro1.user.username.slice(0, calc1) +
      membro2.user.username.slice(0, calc2);
  } else {
    nomeship =
      membro1.user.username.slice(calc1, nomeFim1) +
      membro2.user.username.slice(calc2, nomeFim2);
  }

  let emoticon;
  if (amor > 60) {
    emoticon =
      "https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429"; //imagem de coração
  } else if (amor >= 40) {
    emoticon =
      "https://images.emojiterra.com/twitter/512px/1f937-1f3fd-2642.png"; //imagem de sei lá
  } else {
    emoticon =
      "https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900"; //imagem chorando
  }

  let desc;
  if (amor > 90) {
    desc =
      ":sparkling_heart: HMMM, vamos ver... :sparkling_heart:\n`" +
      membro1.user.username +
      " & " +
      membro2.user.username +
      "`\n:heart: " +
      " Casal mais perfeito! :heart:";
  } else if (amor >= 70) {
    desc =
      ":sparkling_heart: HMMM, vamos ver... :sparkling_heart:\n``" +
      membro1.user.username +
      " & " +
      membro2.user.username +
      "``\n:neutral_face: " +
      " Certeza eles estão nos amassos e ninguém sabe :neutral_face:";
  } else if (amor >= 45) {
    desc =
      ":sparkling_heart: HMMM, vamos ver... :sparkling_heart:\n``" +
      membro1.user.username +
      " & " +
      membro2.user.username +
      "``\n:no_mouth: " +
      " Talvez só precisa que " +
      membro2.user.username +
      " queira algo... :no_mouth:";
  } else {
    desc =
      ":sparkling_heart: HMMM, vamos ver... :sparkling_heart:\n``" +
      membro1.user.username +
      " & " +
      membro2.user.username +
      "``\n:cry: " +
      "bem difícil dar certo... :cry: ";
  }

  const canvas = Canvas.createCanvas(384, 128);
  const ctx = canvas.getContext("2d");

  const emote = await Canvas.loadImage(emoticon);
  const foto1 = await Canvas.loadImage(
    membro1.user.displayAvatarURL({ format: "png" })
  );
  const foto2 = await Canvas.loadImage(
    membro2.user.displayAvatarURL({ format: "png" })
  );

  ctx.drawImage(emote, 125, 0, 128, 128);
  ctx.drawImage(foto1, -10, 0, 128, 128);
  ctx.drawImage(foto2, 260, 0, 128, 128);

  const amorat = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "chances-image.png"
  );

  let amorEmbed = new Discord.MessageEmbed()
    .setColor("#ff3399")
    .setDescription("**" + amor + "%** [`" + loveLevel + "`]")
    .attachFiles([amorat])
    .setImage("attachment://chances-image.png");

  message.channel.send("<@" + message.author.id + "> \n" + desc, amorEmbed);
};
