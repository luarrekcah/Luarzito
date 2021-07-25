const Discord = require("discord.js");
const superagent = require("superagent");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const { body } = await superagent.get("https://nekos.life/api/neko");
  const embed = new Discord.MessageEmbed()
    .setColor(0x00a2e8)
    .setImage(body.neko);
  message.channel.send(embed);
};
