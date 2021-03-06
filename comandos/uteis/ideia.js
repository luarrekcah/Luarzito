const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const content = argumentos.join(" ");
  //if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
  if (!argumentos[0]) {
    return message.channel.send(
      `${message.author.username}, escreva a sugestão após o comando`
    );
  } else if (content.length > 1000) {
    return message.channel.send(
      `${message.author.username}, forneça uma sugestão de no máximo 1000 caracteres.`
    );
  } else {
    var canal = message.guild.channels.cache.find(
      ch => ch.id === `${message.channel.id}`
    );
    
    const msg = await canal.send(
      new Discord.MessageEmbed()
        .setColor("#FFFFF1")
        .addField("Autor:", message.author)
        .addField("Conteúdo", content)
        .setFooter("ID do Autor: " + message.author.id)
        .setTimestamp()
    ).then(message.delete());

    const emojis = ["✅", "❌"];

    for (const i in emojis) {
      await msg.react(emojis[i]);
    }
  }
};
