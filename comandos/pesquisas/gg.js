const Discord = require("discord.js");
const reverseImageSearch = require("node-reverse-image-search");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  const escolha = argumentos[0];
  if (!escolha || !escolha.startsWith("http")) {
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - Pesquisa de Imagens Reversa",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${bot.prefixo}gg\` - Pesquise o conteúdo de imagens por link.`
      )
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "gg <link>`")

      .addField("🔀 | Sinônimos:", "`gg`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(message.author, ajuda);
  }

  reverseImageSearch(escolha, results => {
    console.log(results);
    const embed = new Discord.MessageEmbed()
      .setTitle("Pesquisa de imagens reversa")
      .addField("Resultados para seu link:", "1- " +results[1].title + "\n2- " + results[2].title + "\n3- " + results[3].title)
      .addField("Link do resultado:", "[link 1](" + results[1].url + ")\n[link 2](" + results[2].url + ")\n[link 3](" + results[3].url + ")");
    message.channel.send(message.author, embed);
  });
};
