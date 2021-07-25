const Discord = require("discord.js");

exports.run = (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  message.delete({ timeout: 1000 });
  const server = bot.guilds.cache.get(argumentos[0]) || message.guild;
  function checkBots(guild) {
    let botCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.bot) botCount++;
    });
    return botCount;
  }

  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.cache.forEach(member => {
      if (!member.user.bot) memberCount++;
    });
    return memberCount;
  }

  function checkOnlineUsers(guild) {
    let onlineCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.presence.status === "online") onlineCount++;
    });
    return onlineCount;
  }

  function checkDndUsers(guild) {
    let dndCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.presence.status === "dnd") dndCount++;
    });
    return dndCount;
  }

  function checkIdleUsers(guild) {
    let idleCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.presence.status === "idle") idleCount++;
    });
    return idleCount;
  }

  function checkInvisibleUsers(guild) {
    let invisibleCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.presence.status === "invisible") invisibleCount++;
    });
    return invisibleCount;
  }
  let sicon = server.iconURL({
    dynamic: true,
    format: "png",
    size: 1024
  });

  const regiao = {
    brazil: ":flag_br: Brasil",
    europe: "Europa",
    hong_kong: "Hong Kong",
    india: "India",
    japan: "Japão"
  };
  const verificationLevel = {
    NONE: "Sem verificação",
    LOW: "Baixo",
    MEDIUM: "Médio",
    HIGH: "Alto",
    VERY_HIGH: "Ultra verificado pelo FBI :flushed:"
  };
  const nitro = {
    0: "https://www.nicepng.com/png/full/327-3278798_faq-logo-discord.png",
    1: "https://ponyvilleplaza.com/files/img/boost.png",
    2: "https://ponyvilleplaza.com/files/img/boost.png", //Colocar uma img de boost melhor
    3: "https://pbs.twimg.com/media/EWdeUeHXkAQgJh7.png"
  };
  const splash = `https://cdn.discordapp.com/splashes/${message.guild.id}/${message.guild.splash}.png?size=2048`;
  
  console.log(message.guild.splash);
  console.log(message.guild);
  let serverembed = new Discord.MessageEmbed()
    .setAuthor(`${server.name} - Informações`, nitro[server.premiumTier])
    .setColor("#15f153")
    .addField(
      "👑Dono do servidor: ",
      "<@" + server.owner + "> (`" + server.owner.id + "`)",
      true
    )
    .addField("🌎Região do servidor: ", regiao[server.region], true)
    .setThumbnail(sicon, true)
    .setImage(splash)
    .addField("💢Nome do servidor: ", server.name, true)
    .addField(
      "📛Nível de verificação: ",
      verificationLevel[server.verificationLevel],
      true
    )
    .addField("🗂Quantidade de canais: ", server.channels.cache.size, true)
    .addField("👪Total de membros: ", server.memberCount, true)
    .addField("😜Humanos: ", checkMembers(server), true)
    .addField("🤖Bots: ", checkBots(server), true)
    .addField("🟢Online", checkOnlineUsers(server), true)
    .addField("🔴Dnd", checkDndUsers(server), true)
    .addField("🟠Ausente", checkIdleUsers(server), true)
    .addField(
      "Total ON:",
      checkIdleUsers(server) + checkDndUsers(server) + checkOnlineUsers(server),
      true
    )
    .setFooter("🗓️Servidor criado em:")
    .setTimestamp(server.createdAt);

  return message.channel.send(serverembed);
};
