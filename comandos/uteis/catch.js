const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  let data = db.get(`msgdeletada.${message.guild.id}`);
  if (!data) return message.channel.send("Sem mensagens deletadas aqui...");

  let content = data.content;
  let link = data.content;
  let user = data.user;
  let channel = data.channel;
  console.log(data);
  const usuario = bot.users.cache.get(user);
  let avatar = usuario.avatarURL({ dynamic: true, format: "png", size: 1024 });
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setAuthor(usuario.username + "#" + usuario.discriminator, avatar)
    .addField("Mensagem deletada:", "```" + content + "```")
    .setImage(link.startsWith("http") ? link : "")
    .setFooter(
      message.author.username + "#" + message.author.discriminator,
      message.author.avatarURL({ dynamic: true, format: "png", size: 1024 })
    );
  message.channel.send(embed).then(message.delete());
};
