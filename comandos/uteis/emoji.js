const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (argumentos[0].includes(":")) {
    let emoji = argumentos[0];
    message.channel.send(emoji).then(message.delete());
  } else {
    if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
    /*  setTimeout(() => {
    message.delete().catch(O_o => {});
  }, 1000);*/
    const dev = bot.users.cache.get(process.env.DEV_ID);
    const ano = new Date();
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - emoji",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(`\`${bot.prefixo}emoji\` - Faça-me usar um emoji.`)
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "emoji :emoji:`")
      .addField("🔀 | Sinônimos:", "`emoji`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    if (!argumentos[0])
      return message.channel.send(message.author, ajuda).then(message.delete());
    let emoji = message.guild.emojis.cache.find(
      emoji => emoji.name === argumentos[0]
    );
    if (!emoji) {
      message.channel
        .send("`" + argumentos[0] + "` **não é um emoji deste servidor.**")
        .then(message.delete());
    } else if (emoji.animated === true) {
      message.channel
        .send(`<a:${argumentos[0]}:${emoji.id}>`)
        .then(message.delete());
    } else {
      message.channel
        .send(`<:${argumentos[0]}:${emoji.id}>`)
        .then(message.delete());
    } /*else {
    message.channel.send(emoji).then(message.channel.send(`Pedido de <@` + message.author + `>`)).then(message.delete());
  }*/
  }
};
