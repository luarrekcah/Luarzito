const Discord = require('discord.js');

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const embed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setAuthor('Carbanak Cursos', 'https://cdn.discordapp.com/avatars/683330659305259122/64d4f076d4539ee2c177e38f53877fe2.png?size=1024')
  .setTitle('Mais cursos')
  .setURL('https://discord.gg/9dveh2')
  .setDescription("Pentest Solyd v18 by carbanak666#9136")
  .addFields(
  {
    name: "Parte 1",
    value: "https://drive.google.com/drive/folders/1yM2YylhkkGLU8W9LSeM32C6ftgicXmqj?usp=sharing"
  },
    {
    name: "Parte 2",
    value: "https://drive.google.com/drive/folders/1A9JKmvOqwi2MMMEdJSg0KmdzEHqWY7z4?usp=sharing"
  }
  )
  .setFooter(`Para mais cursos, aperte em "Mais cursos".`)
  message.channel.send(embed)
}