const Discord = require("discord.js");

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

exports.run = async (bot, message, argumentos) => {
  // eslint-disable-line no-unused-vars
  if (!bot.devs.includes(message.author.id)) return;

  try {
    const code = argumentos.join(" ");
    let evaled = eval(code);
    if (!code) return message.reply("sem script.");
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    const embed = new Discord.MessageEmbed()
      .setTitle("Resultado:")
      .setColor("RANDOM")
      .addField(`i:`, "```" + code + "```")
      .addField(`o:`, "```" + clean(evaled) + "```");
    message.channel.send({ embed });
  } catch (err) {
    var code = argumentos.join(" ");
    const embed = new Discord.MessageEmbed()
      .setTitle(":negative_squared_cross_mark: Erro:")
      .setColor("#ff0000")
      .addField(`i:`, "```" + code + "```")
      .addField(`o:`, "```" + clean(err) + "```");
    message.channel.send({ embed });
  }
};
