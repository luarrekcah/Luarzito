const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  var list = [
    "https://media.tenor.com/images/ddb5eeb1c2e400e75d0a45b28e9f090f/tenor.gif",
    "https://cdn.discordapp.com/attachments/701954406261719060/753275526705184821/20200909_122707.gif",
    "https://cdn.discordapp.com/attachments/603365056578715698/753278571509710898/20200909_123953.gif",
    "https://cdn.discordapp.com/attachments/603365056578715698/753279400400650360/20200909_124257.gif",
    "https://cdn.discordapp.com/attachments/603365056578715698/753279685516853338/tenor_5.gif",
    "https://cdn.discordapp.com/attachments/603365056578715698/753282017021394944/20200909_125257.gif"
  ];

  const rand = list[Math.floor(Math.random() * list.length)];
  let user =
    message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
  if (!user) {
    const ajuda = new Discord.MessageEmbed()
      .setTitle("Ajuda - F to pay respect")
      .setColor("RED")
      .addField("Uso:", "`lzf <menção>`");
    message.channel.send(ajuda);
  } else {
    let avatar = message.author.displayAvatarURL({ format: "png" });
    const embed = new Discord.MessageEmbed()
      .setTitle("F")
      .setColor("RANDOM")
      .setDescription(`${message.author} Prestou respeito a ${user}`)
      .setImage(rand)
      .setTimestamp()
      .setThumbnail()
      .setAuthor(message.author.tag, avatar);
    await message.channel.send(embed);
  }
};
