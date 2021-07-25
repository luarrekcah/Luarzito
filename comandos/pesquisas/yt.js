const Discord = require("discord.js");
const snekfetch = require("snekfetch");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  try { 
  const query = argumentos.join(" ");
    if(!query) return message.channel.send("Digite algo para que eu pesquise!")
  const { body } = await snekfetch
    .get("https://www.googleapis.com/youtube/v3/search")
    .query({
      part: "snippet",
      type: "video",
      maxResults: 1,
      q: query,
      key: process.env.GOOGLE_KEY
    });
  if (!body.items.length)
    return message.channel.send("Sem resultados para " + query + ".");
  const thumb = body.items[0].snippet.thumbnails.default.url
  const embed = new Discord.MessageEmbed()
    .setColor(0x00a2e8)
    .setTitle(body.items[0].snippet.title)
    .setDescription(body.items[0].snippet.description)
    .setAuthor(
      `YouTube - ${body.items[0].snippet.channelTitle}`,
      "https://i.imgur.com/hkUafwu.png"
    )
    .setURL(`https://www.youtube.com/watch?v=${body.items[0].id.videoId}`)
    .setThumbnail(thumb);
  return message.channel.send(message.author, embed).catch(console.error);
  } catch (e) {
    console.log(e);
  }
  
};
