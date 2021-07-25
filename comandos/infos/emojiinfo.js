const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const emoji = message.guild.emojis.cache.find(
    emoji => emoji.name === argumentos[0]
  );
  console.log(emoji);
  const emoji_link = `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=2048`;
  const dev = bot.users.cache.get(process.env.DEV_ID)
  const ano = new Date();
  const ajuda = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(
      "Ajuda - emoji info",
      "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
    )
    .setDescription(`\`${bot.prefixo}emojiinfo\` - Veja as informações de um emoji.`)
    .addField(`✒️ | Uso:`, "`" + bot.prefixo + " <nome do emoji>`")
    .addField("🔀 | Sinônimos:", "`emojiinfo`, `eminfo`")
    .setFooter(
      `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
    );
  if (!emoji) return message.channel.send(ajuda);
  if (emoji.animated) {
    const eminfo = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("Emoji Info", emoji_link)
      .setThumbnail(emoji_link)
      .addField("Nome:", "`" + emoji.name + "`", true)
      .addField("ID:", "`" + emoji.id + "`", true)
      .addField("Menção:", "`<a:" + emoji.name + ":" + emoji + ">`", true)
      .addField("Link:", "`" + emoji_link + "`", true);
    message.channel.send(message.author, eminfo);
  } else {
    const eminfo = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor("Emoji Info", emoji_link)
      .setThumbnail(emoji_link)
      .addField("Nome:", "`" + emoji.name + "`", true)
      .addField("ID:", "`" + emoji.id + "`", true)
      .addField("Menção:", "`<:" + emoji.name + ":" + emoji + ">`", true)
      .addField("Link:", "`" + emoji_link + "`", true);
    message.channel.send(message.author, eminfo);
  }
};

/*

const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  setTimeout(() => {
    message.delete().catch(O_o => {});
  }, 1000);
  if (!argumentos[0])
    return message.channel.send(
      `**${message.author.username}, a sintaxe correta é:** ` +
        "`" +
        "`"+bot.prefixo+"emoji nomedoemoji`"
    ); //Troque a exclamação ! da mensagem acima pelo seu prefixo
  
  if (!emoji) {
    message.channel.send(
      "`" + argumentos[0] + "` **não é um emoji deste servidor.**"
    );
  } else if (emoji.animated === true) {
    message.channel.send(`<a:${argumentos[0]}:${emoji.id}> \n\n ${emoji.name} ${emoji.id}`);
  } else {
    message.channel.send(`<:${argumentos[0]}:${emoji.id}>`);
  }
};




**/
