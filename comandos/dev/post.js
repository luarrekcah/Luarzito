const DBL = require("dblapi.js");
const Discord = require("discord.js");
//faz um invite de um server pelo id do canal
module.exports.run = async (bot, message, argumentos) => {
  if (message.author.id == "701953428510736396") {
    const dbl = new DBL(process.env.topggTOKEN, bot);
    setTimeout(() => {
      message.channel.send("Top.gg status atualizado.");
      dbl.postStats(
        bot.guilds.cache.size //, bot.shards.Id, bot.shards.total
      );
    }, 1000);
  } else {
    return;
  }
};
