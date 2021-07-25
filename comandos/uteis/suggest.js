const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  setTimeout(() => {
    message.delete().catch(O_o => {});
  }, 1000);
  const sayMessage = argumentos.join(" ");
  if (!sayMessage) {
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - Suggest",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${bot.prefixo}suggest\` - Envie uma sugestão para meu desenvolvedor.`
      )
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "suggest <sugestão>`")
      .addField("🔀 | Sinônimos:", "`suggest`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(ajuda);
  } else {
    const wn = new Discord.WebhookClient(
      "753301961591357510",
      "gg3TZzmke2xmt5yRdOsiJjyXSyTKpodan3ABih4cs209tiO-2P9Lm5atmxOLHqYS0-iv"
    );

    wn.send(
      message.author.tag +
        ": ```" +
        sayMessage +
        "```\n\n ID:`" +
        message.author.id +
        "`"
    );
    const con = await message.channel
      .send(
        "Sugestão enviada ao desenvolvedor, grato! Recomendo que entre no meu servidor do discord, caso desejas, digite `" +
          bot.prefixo +
          "help`!"
      )
      .then(con.delete({ timeout: 5000 }));
  }
};
