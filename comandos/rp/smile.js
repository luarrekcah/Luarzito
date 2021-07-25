const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  var list = [
    "https://31.media.tumblr.com/tumblr_m8wm9nCUGf1rrftqho1_500.gif",
    "https://media.tenor.com/images/ef34332bec620cc4e5fc14fe3d3c4fb6/tenor.gif"
  ];

  var rand = list[Math.floor(Math.random() * list.length)];
  let user = message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
  if (!user) {
    return message.reply(
      "lembre-se de mencionar um usuário válido para sorrir!"
    );
  }

  let avatar = message.author.displayAvatarURL({ format: "png" });
  const embed = new Discord.MessageEmbed()
    .setTitle(":grin:")
    .setColor("#000000")
    .setDescription()
    .setImage(rand)
    .setTimestamp()
    .setThumbnail()
    .setAuthor(message.author.tag, avatar);
  await message.channel.send(`${message.author} Sorriu para ${user}`,embed);
};
