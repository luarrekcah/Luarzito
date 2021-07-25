const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  const author = message.author.id;
  if (message.author.bot) return;
  /*if (message.author.id === "701953428510736396") {
    const sayMessage = argumentos.join(" ");
    if (!sayMessage)
      return message.channel
        .send("Digite algo para que eu fale.")
        .then(message.delete());
    if (sayMessage.length >= 174)
      return message.channel
        .send("Sua mensagem é muito grande, tente uma mensagem menor.")
        .then(message.delete({ timeout: 1000 }));
    message.channel.send(sayMessage).then(message.delete({ timeout: 1000 }));
    /*setTimeout(() => {
      message.delete().catch(O_o => {});
    }, 1000);
    
  } else */if (
    message.guild.member(message.author).hasPermission("KICK_MEMBERS")
  ) {
    const sayMessage = argumentos.join(" ");
    if (!sayMessage)
      return message.channel
        .send("Digite algo para que eu fale.")
        .then(message.delete());
    if (sayMessage.length >= 172)
      return message.channel
        .send("Sua mensagem é muito grande, tente uma mensagem menor.")
        .then(message.delete({ timeout: 1000 }));
    message.channel.send(sayMessage + "\n\n:writing_hand: - <@"+message.author.id+">").then(message.delete({ timeout: 1000 }));
    /*
    setTimeout(() => {
      message.delete().catch(O_o => {});
    }, 1000);
    */
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(
        "<a:alerta:758339902386733098> | Ih rapaiz, sem permissão."
      );
    message.channel.send(embed);
  }
};
