const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  /*setTimeout(() => {
    message.delete().catch(O_o => {});
  }, 100);*/
  if (message.author.bot) return;

  const sayMessage = argumentos.join(" ");
  if (sayMessage.length >= 174)
      return message.channel
        .send("Sua mensagem é muito grande, tente uma mensagem menor.")
        .then(message.delete({ timeout: 1000 }));
  if (!sayMessage) {
    message.reply(`Digite algo após ${bot.prefixo}embed!`);
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(sayMessage + "\n\nMensagem enviada por: <@" + message.author.id+">");
    message.channel.send(embed).then(message.delete({timeout: 1000}));
  }
};
