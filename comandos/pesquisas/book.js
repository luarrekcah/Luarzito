const Discord = require("discord.js");
const snekfetch = require("snekfetch");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  try {
    const query = argumentos.join(" ");
    if (query < 1)
      return message.channel.send(
        "Não forneceu um título de livro a ser pesquisado."
      );
    const { body } = await snekfetch
      .get("https://www.googleapis.com/books/v1/volumes")
      .query({
        maxResults: 1,
        q: query,
        //maxAllowedMaturityRating: "NOT_MATURE",
        key: process.env.GOOGLE_KEY
      });
    const description = body.items[0].volumeInfo.description;
    const descriptionfix = description.substr(0, 600);
    const embed = new Discord.MessageEmbed()
      .setColor(0x00a2e8)
      .setTitle(body.items[0].volumeInfo.title)
      .addField("Autor(a) ", body.items[0].volumeInfo.authors)
      .addField("Publicador ", body.items[0].volumeInfo.publisher)
      .addField("Número de páginas ", body.items[0].volumeInfo.pageCount)
      .addField(
        "Gêneros",
        body.items[0].volumeInfo.categories.length
          ? body.items[0].volumeInfo.categories.join(", ")
          : "???"
      )
      .addField(
        "Descrição",
        body.items[0].volumeInfo.description
          ? descriptionfix
          : "Sem descrição disponível."
      )
      .addField("Link de compra:", body.items[0].volumeInfo.canonicalVolumeLink)
      .setThumbnail(body.items[0].volumeInfo.imageLinks.thumbnail);
    message.channel.send(embed);
  } catch (err) {
    console.log(err);
  }
};
