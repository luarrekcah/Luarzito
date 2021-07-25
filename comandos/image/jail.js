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
    "https://lh3.googleusercontent.com/proxy/rlaqALc49-E8roF1WMnpFr2XQzwLjwnoF1CpD7bslyB8NOvMQ1fqPVJS73FSgVxVKv1YZx87qasz5Ukoh-hAPa3P53XNAC3OhmRJRaUm9vggj94Nx4BPLBHc8l4x2c5B"
  );
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

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
