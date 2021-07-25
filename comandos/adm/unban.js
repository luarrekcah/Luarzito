const Discord = require("discord.js");

exports.run = async (bot, message, args, arg_txt, chat) => {
  let member = message.mentions.members.first();
  var user = message.mentions.users.first();

  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();

  const ajuda = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(
      "Ajuda - unban",
      "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
    )
    .setDescription(`\`${bot.prefixo}unban\` - Desbana um usuário pelo ID.`)
    .addField(`✒️ | Uso:`, "`" + bot.prefixo + "unban <id>`")
    .addField(`⚠️ | Permissão:`, "`BAN_MEMBERS`")
    .addField("🔀 | Sinônimos:", "`unban`")
    .setFooter(
      `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
    );

  if (message.member.permissions.has("BAN_MEMBERS")) {
     if (!message.guild.me.permissions.has("BAN_MEMBERS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `BAN_MEMBERS` para continuar");
 if (!message.guild.me.permissions.has("EMBED_LINKS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
    if (!args[0])
      return message.channel.send(
        "<@" + message.author + ">, você se esqueceu do ID!",
        ajuda
      );

    if (args[0].length < 16)
      return message.channel.send("** Este ID não é o id de um usuário!**");

    message.guild.fetchBans().then(bans => {
      var Found = bans.find(m => m.user.id === args[0]);
      console.log(bans);
      if (!Found)
        return message.channel.send(
          `**Eu não encontrei <@${args[0]}> na ban list**`
        );
      message.guild.members.unban(args[0]);
      let staff = new bot.Discord.MessageEmbed()
        .setColor("#00FFFF")
        .setTitle("✅ | Unban")
        .setDescription(
          "O usuário: <@" +
            args[0] +
            "> foi desbanido por <@" +
            message.author.id +
            ">"
        )
        .setAuthor(
          `${message.author.tag}`,
          message.author.displayAvatarURL({ Size: 32 })
        )
        .setTimestamp()
        .setFooter("ID do usuário: " + args[0]);
      //podem usar o embed acima ou mandar a mensagem direto

      const aviso = message.channel
        .send(
          "O Usuário <@" +
            args[0] +
            "> foi desbanido! Como o " +
            message.author.username +
            " deu uma segunda chance, espero que ele não volte a cometer erros..."
        )
        .then(message.delete({ timeout: 1000 }));
      aviso.delete({ timeout: 10000 });
    });
  } else {
    return message.channel.send("**Você não tem permissão para desbanir**");
  }
};
