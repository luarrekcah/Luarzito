const Discord = require("discord.js")

exports.run = (bot, message, argumentos) => {
    if (message.author.id !== "701953428510736396")
      return message.channel.send(
        `<a:alerta:758339902386733098> | **»** ${message.author}, Id nao reconhecida...`
      );
    let id = argumentos[0];
    if (!id) id = message.guild.id;
  
    message.react("👍").then(() => message.react("👎"));
  
    const filter = (reaction, user) => {
      return (
        ["👍", "👎"].includes(reaction.emoji.name) &&
        user.id === message.author.id
      );
    };
  
    message
      .awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] })
      .then(collected => {
        const reaction = collected.first();
  
        if (reaction.emoji.name === "👍") {
          bot.guilds.cache
            .get(id)
            .leave()
            .then(g => console.log(`Sai de ${g}`));
        }
      });
  };
  