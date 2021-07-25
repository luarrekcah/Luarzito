//copiado do lz.ch
const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  const prefixo = bot.prefixo;
  const escolha = argumentos[0];

  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
   
  if (!message.member.hasPermission("MANAGE_CHANNELS")) {
    const ajuda = new Discord.MessageEmbed()
      .setAuthor(
        "Ajuda - sv",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription("`" + bot.prefixo + "sv` - gerenciador do server")
      .setColor("GREEN")
      .addField(
        ":black_nib: | Uso:",
        "`" +
          prefixo +
          "sv setservericon <URL>` - Defina um icone para o servidor\n" +
          "`" +
          prefixo +
          "sv setservername <nomenovo>` - Defina um nome ao servidor \n" +
          "`" +
          prefixo +
          "sv setsplash <URL>` - Para definir um novo tópico! \n"
      )
      .addField("⚠️ | Permissão:", "`MANAGE_CHANNELS`")
      .addField("🔀 | Sinônimos:", "`sv`, `server`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send("<@" + message.author + ">, Sem permissão.", ajuda);
  } else {
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `MANAGE_CHANNELS` para continuar");
    if (!message.guild.me.permissions.has("MANAGE_GUILD")) 
        return message.channel.send(":warning: Eu estou sem permissão de `MANAGE_GUILD` para continuar");
     if (!message.guild.me.permissions.has("EMBED_LINKS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
    
    if (!escolha) {
      const ajuda = new Discord.MessageEmbed()
        .setAuthor(
          "Ajuda - sv",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription("`" + bot.prefixo + "sv` - gerenciador do server")
        .setColor("GREEN")
        .addField(
          ":black_nib: | Uso:",
          "`" +
            prefixo +
            "sv setservericon <URL>` - Defina um icone para o servidor\n" +
            "`" +
            prefixo +
            "sv setservername <nomenovo>` - Defina um nome ao servidor \n" +
            "`" +
            prefixo +
            "sv setsplash <URL>` - Para definir um novo tópico! \n"
        )
        .addField("⚠️ | Permissão:", "`MANAGE_SERVER`")
        .addField("🔀 | Sinônimos:", "`sv`, `server`")
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
      message.channel.send(message.author, ajuda);
    }

    if (!escolha.includes("setservericon" || "setservername" || "setsplash"))
      return message.channel.send(
        "O comando não foi reconhecido, verifique se não escreveu errado..."
      );

    if (escolha === "setservericon") {
      try {
        if (!argumentos.slice(1).join(" "))
          return message.channel.send("Coloque uma URL após o comando.");
        message.guild
          .setIcon(argumentos.slice(1).join(" "))
          .then(updated =>
            message.channel.send(
              "<:yes:758340222244093992> | Icone do servidor atualizado!"
            )
          )
          .catch(console.error);
      } catch (e) {
        console.log(e);
      }
    }
    if (escolha === "setservername") {
      try {
        if (!argumentos.slice(1).join(" "))
          return message.channel.send(
            "Digite algo após o comando para que eu coloque um nome novo."
          );
        message.guild
          .setName(argumentos.slice(1).join(" "))
          .then(updated =>
            message.channel.send(
              "<:yes:758340222244093992> | Nome do servidor atualizado!"
            )
          )
          .catch(console.error);
      } catch (e) {
        console.log(e);
      }
    }
    if (escolha === "setsplash") {
      try {
        if (!argumentos.slice(1).join(" "))
          return message.channel.send("Coloque uma URL após o comando.");
        message.guild
          .setSplash(argumentos.slice(1).join(" "))
          .then(updated =>
            message.channel.send(
              "<:yes:758340222244093992> | Splash do servidor atualizado!"
            )
          )
          .catch(console.error);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
