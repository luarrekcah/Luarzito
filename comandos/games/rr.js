const Discord = require("discord.js");

module.exports.run = async (bot, message) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  message.channel.startTyping();
  setTimeout(() => {
    message.channel.stopTyping();
  }, 8000);
  const m = await message.channel.send(
    new Discord.MessageEmbed()
      .setColor("YELLOW")
      .setTitle("<a:carregando:758341112934694943> Roleta Russa")
      .setImage(
        "https://i.pinimg.com/originals/f5/56/98/f55698b9290507b2ba41c91d9d752903.gif"
      )
      .setFooter("Este comando trabalha com tempo, seja paciente!")
  );
  const roulette = [
    ":gun: Pow! Você foi morto",
    ":gun: Felizmente para você, ***você sobreviveu***! Você gostaria de testar sua sorte novamente?",
    ":gun: Oh, droga, não atirou! Ou isso é uma coisa boa? (Tente novamente)"
  ];
  setTimeout(() => {
    m.edit(
      new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(
          "<a:carregando:758341112934694943> | Quase próximo a decisão final..."
        )
        .setDescription(`${message.author} aponta a arma para sua cabeça...`)
    );
  }, 3000);
  setTimeout(() => {
    m.edit(
      new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setDescription(roulette[Math.floor(Math.random() * roulette.length)])
    );
  }, 8000);
};
