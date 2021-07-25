const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const args = argumentos;
  const player = argumentos[1];
  const selecao = argumentos[0];

  if (!selecao) {
    const embed = new Discord.MessageEmbed()
      .setTitle("Comandos de Minecraft:")
      .setColor("RANDOM")
      .setDescription(
        `lzmc head <player> \n lzmc body <player> \n lzmc fullbody <player> \n lzmc comboavatar <player> \n lzmc getskin <player> \n lzmc server <iP>`
      )
      .setFooter(`Tem tambem lzmineserver!`);
    message.channel.send(embed);
  } else {
    if (selecao === "head") {
      let embed = new Discord.MessageEmbed()

        .setTitle(`Cabeça de ${args[1]}`)
        .setImage(`https://mc-heads.net/head/${args[1]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor("RANDOM");
      message.channel.send(embed);
    }
    if (selecao === "body") {
      let embed = new Discord.MessageEmbed()

        .setTitle(`Corpo de ${args[1]}`)
        .setImage(`https://mc-heads.net/body/${args[1]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor("RANDOM");
      message.channel.send(embed);
    }
    if (selecao === "fullbody") {
      let embed = new Discord.MessageEmbed()

        .setTitle(`Corpo completo de ${args[1]}`)
        .setImage(`https://mc-heads.net/players/${args[1]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor("RANDOM");
      message.channel.send(embed);
    }
    if (selecao === "comboavatar") {
      let embed = new Discord.MessageEmbed()

        .setTitle(`Combo avatar de ${args[1]}`)
        .setImage(`https://mc-heads.net/body/${args[1]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor("RANDOM");
      message.channel.send(embed);
    }
    if (selecao === "getskin") {
      let embed = new Discord.MessageEmbed()

        .setTitle(`Skin de ${args[1]}`)
        .setDescription("Clique no link acima para baixar!")
        .setURL(`https://mc-heads.net/download/${args[1]}`)
        .setImage(`https://mc-heads.net/skin/${args[1]}`)
        .setFooter(message.author.tag, message.author.avatarURL)
        .setTimestamp(new Date())
        .setColor("RANDOM");
      message.channel.send(embed);
    }

    if (selecao === "server") {
      const fs = require("fs");
      var request = require("request");
      const send = require("quick.hook");

      const serverr = args[1];
      let url = "http://mcapi.us/server/status?ip=" + serverr;
      request(url, function(err, response, body) {
        if (!serverr)
          return message.reply("um erro aconteceu, insira um ip valido!");
        var status = "Offline";
        if (body.online) {
          status = "Online";
        }

        // PC Ping
        body = JSON.parse(body);

        let embed = new Discord.MessageEmbed()
          .setAuthor(
            `${serverr}`,
            `https://mcapi.de/api/image/favicon/${serverr}`
          )
          .setThumbnail(`https://mcapi.de/api/image/favicon/${serverr}`)
          .addField("🎲 Versão:", body.server.name, true)
          .addField("🚀 Motd:", body.motd, true)
          .addField("🥊 Status:", body.online)
          .addField(
            "🏵 Jogadores online:",
            body.players.now + "/" + body.players.max,
            true
          )
          .setFooter(message.author.username, message.author.displayAvatarURL)
          .setTimestamp();
        message.channel.send(embed);
      });
    }
  }
};
