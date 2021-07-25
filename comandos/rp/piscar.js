const Discord = require('discord.js');

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );

var list = [
  'https://lh6.googleusercontent.com/-g61LifOxmE0/UK_Nx20PidI/AAAAAAAAFgQ/g_BR1bprhw8/s800/Piscar%2520os%2520olhos%25201.gif'
];
  
var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para piscar!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Piscadinha')
        .setColor('#000000')
        .setDescription(`${message.author} piscou para ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}