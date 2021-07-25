const Discord = require("discord.js");
const ping = require("minecraft-server-util");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const selecao = argumentos.join(" ");

  if (!selecao) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(
        "Catálogo",
        "https://static.planetminecraft.com/files/resource_media/screenshot/1433/grass7987048.jpg"
      )
      .setFooter("Digite lzmineserver <nome>")
      .setColor("PURPLE")
      .addFields({
        name: "Servidores:",
        value: `hypixel`
      });
    message.channel.send(embed);
  }

  if (selecao === "hypixel") {
    ping("play.hypixel.net", 25565, (error, response) => {
      if (error) return message.channel.send("Algo está errado!");

      const host = response.host;
      const port = response.port;
      const version = response.version;
      const protocolVersion = response.protocolVersion;
      const onlinePlayers = response.onlinePlayers;
      const maxPlayers = response.maxPlayers;
      const description = response.descriptionText;
      const favicon = response.favicon;
      const modList = response.modList;

      const embed = new Discord.MessageEmbed()
        .setTitle(`Infos:`)
        .setColor("GREEN")
        .setAuthor(
          host,
          "https://texture.namemc.com/ad/bf/adbf2b8031965b50.png"
        )
        .addFields(
          {
            name: "Porta:",
            value: port
          },
          {
            name: "Versão:",
            value: version
          },
          {
            name: "Players Online:",
            value: onlinePlayers
          },
          {
            name: "Max players:",
            value: maxPlayers
          },
          {
            name: "Descrição:",
            value: description
          },
          {
            name: "Versão do protocolo:",
            value: protocolVersion
          }
        );
      message.channel.send(embed);
      console.log(response);
    });
    if (selecao === "rede sky") {
      ping("redesky.com", 25565, (error, response) => {
        if (error) return message.channel.send("Algo está errado!");

        const host = response.host;
        const port = response.port;
        const version = response.version;
        const protocolVersion = response.protocolVersion;
        const onlinePlayers = response.onlinePlayers;
        const maxPlayers = response.maxPlayers;
        const description = response.descriptionText;
        const favicon = response.favicon;
        const modList = response.modList;

        const embed = new Discord.MessageEmbed()
          .setTitle(`Infos:`)
          .setColor("GREEN")
          .setAuthor(
            host,
            "https://static.planetminecraft.com/files/resource_media/screenshot/1433/grass7987048.jpg"
          )
          .addFields(
            {
              name: "Porta:",
              value: port
            },
            {
              name: "Versão:",
              value: version
            },
            {
              name: "Players Online:",
              value: onlinePlayers
            },
            {
              name: "Max players:",
              value: maxPlayers
            },
            {
              name: "Descrição:",
              value: description
            },
            {
              name: "Versão do protocolo:",
              value: protocolVersion
            }
          );
        message.channel.send(embed);
        console.log(response);
      });
    }
  }
};
