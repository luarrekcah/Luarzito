const Discord = require("discord.js");
const superagent = require("superagent");
const snekfetch = require("snekfetch");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const query = argumentos.join(" ");
  if (!query) {
    message.channel.send("Digite algo para mim pesquisar!");
  } else {
    const { body } = await snekfetch
      .get("https://pt.wikipedia.org/w/api.php")
      .query({
        action: "query",
        prop: "extracts",
        format: "json",
        titles: query,
        exintro: "",
        explaintext: "",
        redirects: "",
        formatversion: 2
      });
    if (body.query.pages[0].missing) {
      message.channel.send("Sem resultados.");
    }
    const embed = new Discord.MessageEmbed()
      .setColor(0x00a2e8)
      .setTitle(body.query.pages[0].title)
      .setAuthor("Wikipedia", "https://i.imgur.com/a4eeEhh.png")
      .setDescription(
        body.query.pages[0].extract.substr(0, 2000).replace(/[\n]/g, "\n\n")
      );
    return message.channel.send(embed).catch(console.error);
  }
};
