const Discord = require('discord.js');

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );

var list = [
  'https://i.pinimg.com/originals/b4/95/fb/b495fb19f4b9a1b04f48297b676c497b.gif',
  'https://media2.giphy.com/media/pWd3gD577gOqs/200.gif'
];
  
var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para cutucar!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Hihi')
        .setColor('#000000')
        .setDescription(`${message.author} cutucou ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}