const Discord = require("discord.js");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  const snekfetch = require("snekfetch");
  if (!argumentos.slice(0).join(" "))
    return message.channel.send("> Diga algo para eu anotar!");
  snekfetch
    .post("https://hastebin.com/documents")
    .send(argumentos.slice(0).join(" "))
    .then(body => {
      const HastebinEmbed = new Discord.MessageEmbed()
        .setTitle("Anotação concluida com Sucesso!")
        .setColor("RANDOM")
        .setAuthor(
          "Hastebin",
          "https://pbs.twimg.com/profile_images/1664989409/twitter_400x400.png"
        )
        .setDescription("\nURL: https://hastebin.com/" + body.body.key);
      message.channel.send(HastebinEmbed);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["nota"],
  permLevel: 0,
  manu: false
};

exports.help = {
  name: "Nota",
  category: "💈 Utilitários",
  description: "Adiona um texto ao site Hastebin e lhe gera um link",
  usage: "*nota [texto]"
};
