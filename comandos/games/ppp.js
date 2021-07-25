const Discord = require('discord.js');

module.exports.run = async (bot, message, argumentos) => {
  return message.channel.send("Desativado pelo desenvolvedor.")
  const nomes = [
    'Faustão, Neymar, Jabami yumeko',
    'Naruto, Sasuke, sakura',
    'Rock lee, Justy bb, Pikachu',
    'Mydoria, Bakugou, Sangwoo',
    'Orochi, Cebolinha, Monica',
    'Magali, Lula, Bolsonaro',
    'Dilma, Dora, Goku',
    'Polar, instinct, Kroz (Do servidor)'
  ];
  message.channel.send(nomes[Math.floor(Math.random () * nomes.length)]);
}