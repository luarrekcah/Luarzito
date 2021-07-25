const Discord = require("discord.js");
//faz um invite de um server pelo id do canal
module.exports.run = async (bot, message, argumentos) => {
  if (message.author.id == "701953428510736396") {
    const channel = bot.channels.cache.get(argumentos[0]) || message.channel;
    let invite = await channel
      .createInvite({ unique: true })
      .then(invite => {
        message.channel.send("https://discord.gg/" + invite.code);
      })
      .catch(console.log);
  } else {
    return;
  }
};