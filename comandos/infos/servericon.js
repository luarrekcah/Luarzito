const Discord = require(`discord.js`);
exports.run = (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  let guild = bot.guilds.cache.get(argumentos[0]) || message.guild;
  let icon = guild.iconURL({
    dynamic: true,
    format: "png",
    size: 1024
  });
    let embed = new Discord.MessageEmbed()
    .setTitle(`Ícone de ${guild.name}`)
    .setImage(icon)
    .setColor("RANDOM");
message.channel.send(message.author, embed).then(message.delete({timeout:1000}))
return message.react("👌");
};