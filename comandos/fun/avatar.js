const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  let user =
    message.mentions.users.first() ||
    bot.users.cache.get(argumentos[0]) ||
    message.author;

  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });

  let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setDescription(`🖼️ | [download](${avatar}/)`)
    .setImage(avatar)
    .setFooter(
      `Pedido de: ${message.author.tag}`,
      message.author.displayAvatarURL({ format: "png" })
    );
  await message.channel.send("Avatar de <@" + user.id + `> 😎👌🏻 \n`, embed);
};
