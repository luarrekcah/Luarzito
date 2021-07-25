const Discord = require("discord.js");

module.exports.run = async (bot, argumentos, message) => {
  const escolha = argumentos[0];

  if (escolha == "channel") {
    console.log(message.channel);
  }
  if (escolha == "guild") {
    console.log(message.guild);
  }
  if (escolha == "message") {
    console.log(message);
  }
};
