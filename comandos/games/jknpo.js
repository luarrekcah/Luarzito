const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  var jokenpo = ["pedra", "papel", "tesoura"];

  const jogadabot = jokenpo[Math.floor(Math.random() * jokenpo.length)];

  const jogadapl = argumentos[0].toLowerCase();

  if (!jogadapl) {
    message.reply("Escolha algo, exemplo: pedra, papel, tesoura!");
  }

  if (jogadabot === jogadapl) {
    const embed = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setTitle("Empate!")
    .setDescription('Eu joguei ' + jogadabot + ' e você ' + jogadapl)
    .setFooter('Vamos denovo?!')
    message.reply(embed);
  }
  if (jogadabot === "pedra" && jogadapl === "papel") {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Perdi!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Oh, me embrulhou");
    return message.reply(embed);
  }
  
  if (jogadabot === "pedra" && jogadapl === "tesoura") {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Ganhei!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Te quebrei hehe");
    return message.reply(embed);
  }
  
  if (jogadabot === "papel" && jogadapl === "pedra") {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Ganhei!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Te embrulhei hehe");
    return message.reply(embed);
  }
  
  if (jogadabot === "papel" && jogadapl === "tesoura") {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Perdi!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Oh, me cortou!");
    return message.reply(embed);
  }
  
  if (jogadabot === "tesoura" && jogadapl === "pedra") {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("Perdi!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Oh, me quebrou!");
    return message.reply(embed);
  }
  
  if (jogadabot === "tesoura" && jogadapl === "papel") {
    const embed = new Discord.MessageEmbed()
      .setColor("RED")
      .setTitle("Ganhei!")
      .setDescription("Eu joguei " + jogadabot)
      .setFooter("Te cortei hehe!");
    return message.reply(embed);
  }
  
};