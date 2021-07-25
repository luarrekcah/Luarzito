const Discord = require('discord.js')

module.exports.run = async (bot, message) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setTitle(`bip bup`)
  .setDescription(`Atualmente estou em ${bot.guilds.cache.size} **servidores** :grin: \nDisponível em ${bot.channels.cache.size} **canais**! 🥵 \nAtendendo a ${bot.users.cache.size} **usuários**! 😎`)
  .setFooter('Hospedado na Glitch', 'https://symbols.getvecta.com/stencil_81/63_glitch-icon.dd141fcc26.png');
  message.channel.send(embed)
}
