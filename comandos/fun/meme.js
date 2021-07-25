const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
	try {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/MemesBrasil.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Parece que estamos sem memes novos! Tente novamente mais tarde.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.MessageEmbed()
        .setColor(0x00A2E8)
        .setImage(allowed[randomnumber].data.url)
        .setFooter("Algumas imagens são grande demais e podem não carregar.")
        message.channel.send(embed)
    } catch (err) {
        return console.log(err);
    }
}