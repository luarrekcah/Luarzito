const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  let user =
    message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
  if (!user) {
    message.channel.send("Escolha um usuário para esfaquear.");
  } else if (user == message.author) {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`...`)
      .setImage(
        `https://steamuserimages-a.akamaihd.net/ugc/772848199817953046/973CD96F9804089BBCEC3512546B07D4D1941A36/`
      );
    message.channel.send(`${message.author} se esfaqueou!`, embed);
  }else {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription(`Reaja! fale reagir!`)
      .setImage(
        `https://i.pinimg.com/originals/73/10/8b/73108b2ad3b5fcf1b159aa8e84f6ec56.gif`
      );
    message.channel.send(`${message.author} Deu uma facada em ${user}`, embed);

    var main = message.channel.createMessageCollector(
      a => a.author.id == message.mentions.users.first(),
      {
        time: 10000,
        max: 10
      }
    );
    var vivo;
    var col;
    main.on("collect", a => {
      if (a.content.toLowerCase() === "reagir") {
        if (col == "yah") {
          return;
        } else {
          vivo = "sim"; //teste fds.
          col = "yah";
          const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setImage(
              "https://media1.tenor.com/images/7af4dfef3e858955d4e8eca16abafe35/tenor.gif?itemid=8694760"
            );
          message.channel.send(`${user} reagiu!`, embed);
          // main.stop();
        }
      }
    });
    main.on("end", a => {
      if (vivo == "sim") {
        return;
      } else {
        const embed = new Discord.MessageEmbed()
          .setColor("RED")
          .setImage(
            "https://pa1.narvii.com/7012/cdedb7d9872eb290427826d7113d16ea35987eb7r1-480-269_hq.gif"
          );
        message.channel.send(`${user} morreu sangrando...`, embed);
      }
    });
  }
};
