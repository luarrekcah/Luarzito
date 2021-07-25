const Discord = require('discord.js');

exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );

const list = [
  'https://media.tenor.com/images/34c6fdf206882d81d4fb0d6133f7f03f/tenor.gif',
  'https://media.tenor.com/images/47ac1ed8c5d5e71e8737ad173f2f8696/tenor.gif',
  'https://media1.tenor.com/images/7175fe4b5e789b94b41a793e2fd4db3d/tenor.gif?itemid=10119996',
  'https://image.myanimelist.net/ui/_3fYL8i6Q-n-155t3dn_4hhRHm162zQlX8pA6cUDO_sPpNNVxc-m8TlTH7TOSO8R'
];
  
const rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || bot.users.cache.get(argumentos[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para colocar para dormir!');
}

let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Bons sonhos')
        .setColor('RANDOM')
       // .setDescription()
        .setImage(rand)
        .setTimestamp()
        .setThumbnail()
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(`${message.author} Colocou ${user} para dormir`,embed);
}