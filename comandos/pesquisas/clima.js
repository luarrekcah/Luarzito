const weather = require("weather-js");
const Discord = require("discord.js");

exports.run = (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!argumentos[0]) {
    const dev = bot.users.cache.get(process.env.DEV_ID);
    const ano = new Date();

    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - clima",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(`\`${bot.prefixo}clima\` - Veja o clima de uma cidade.`)
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "clima <cidade>`")
      .addField("🔀 | Sinônimos:", "`clima`, `weather`, `tempo`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(message.author, ajuda);
  }
  weather.find(
    {
      search: argumentos,
      degreeType: "C"
    },
    function(err, result) {
      if (err) console.log(err);
      //console.log(JSON.stringify(result, null, 2));
      if (!result[0]) return message.channel.send(`Essa cidade não existe.`);
      const embed = new Discord.MessageEmbed()
        .setTitle(`**⛅️ Tempo em ${result[0].location.name}**`)
        .addField(
          `**🌡 | Temperatura:**`,
          `${result[0].current.temperature}°C`,
          true
        )
        .addField(
          `**🔥 | Sensação Térmica:**`,
          `${result[0].current.feelslike}°C`
        )
        .addField(`**💦 | Umidade:**`, `${result[0].current.humidity}%`)
        .addField(`**🌬 | Vento:**`, `${result[0].current.windspeed}`)
        .setColor("RANDOM")
        .setThumbnail(result[0].current.imageUrl)
        .setTimestamp();
      message.channel.send(embed);
    }
  );
};
