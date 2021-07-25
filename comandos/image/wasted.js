const Discord = require("discord.js");
const Canvas = require("canvas");

module.exports.run = async (bot, message, argumentos) => {
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
  //if (usuario.bot) return message.channel.send("Mencione um usuário.");
  const canvas = Canvas.createCanvas(600, 600);
  const ctx = canvas.getContext("2d");
  const backgroundA = await Canvas.loadImage(avatar);
  ctx.drawImage(backgroundA, 0, 0, canvas.width, canvas.height);

  const background = await Canvas.loadImage(
    "https://assets.stickpng.com/thumbs/58ee7c023545163ec1942ca9.png"
  );
  ctx.drawImage(background, 150, 150, 300, 300);

  ctx.strokeStyle = "#000000";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "jail.png"
  );

  message.channel
    .send(message.author, attachment)
    .then(message.delete({ timeout: 500 }));
};
