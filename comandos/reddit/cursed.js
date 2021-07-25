const Discord = require("discord.js");
const snekfetch = require("snekfetch");

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
 try {
   const espera = await message.channel.send("Um segundo...");
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/cursedimages.json?sort=top&t=week')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('Parece que estamos sem cursed novos! Tente novamente mais tarde.');
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setImage(allowed[randomnumber].data.url)
        message.channel.send(embed).then(espera.delete())
    } catch (err) {
        return console.log(err);
    }
};
