const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  message.react("😁");
  const embed = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setDescription(
      "Clique [aqui](" + bot.inviteLink + "/) para me adicionar no seu servidor! :D"
    );

  message.channel.send(embed);
};
