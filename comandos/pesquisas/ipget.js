const Discord = require("discord.js");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();

  const ip = argumentos[0];
  if (ip === NaN) return;
  if (!ip) {
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - Pegar dados de endereço IP",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${bot.prefixo}ipget\` - Veja os dados de um IP pelo Discord!`
      )
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "ipget <ip>`")
      .addField("🔀 | Sinônimos:", "`ipget`, `ip`, `getip`")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/757308101182357518/778636318490099752/logo-ol.png"
      )
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(message.author, ajuda);
  } else {
    const { body } = await snekfetch.get(
      `https://ipfind.co/?ip=${ip}&auth=${process.env.ipAPI_key}`
    );

    const dic = {
      null: "Não encontrado"
    };

    try {
      console.log(body);
      const ipF = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          "Info de " + ip,
          "https://cdn2.iconfinder.com/data/icons/web-hosting-4-1/32/Dedicated_IP-512.png"
        )
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/757308101182357518/778636318490099752/logo-ol.png"
        )
        .addField("País:", body.country, true)
        .addField("Sigla:", body.country_code, true)
        .addField("Continente:", body.continent_code, true)
        .addField("Cidade:", body.city, true)
        .addField("Município:", body.county, true)
        .addField("Região:", body.region, true)
        .addField("Cód. Região:", body.region_code, true)
        .addField("Cód. Postal:", body.postal_code, true)
        .addField("Fuso Horário:", body.timezone, true)
        .addField("Dono:", body.owner, true)
        .addField(
          "Log & Lat:",
          "Log: " + body.longitude + " | Lat: " + body.latitude,
          true
        )
        .addField("Moeda:", body.currency, true)
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
      message.channel.send(message.author, ipF);
    } catch (e) {
      console.log(e);
      if(e == 400) {
        message.channel.send("Erro ao buscar dados do IP desejado...")
      }
    }
  }
  //------
};
