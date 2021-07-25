const Discord = require("discord.js")

exports.run = async (bot, message, argumentos) => {
  var array1 = ["cara", "coroa"];

  var rand = Math.floor(Math.random() * array1.length);

  const escolha = argumentos[0];
  
  if (!escolha || (escolha.toLowerCase() !== "cara" && escolha.toLowerCase() !== "coroa")) {
    message.reply("insira **cara** ou **coroa** na frente do comando.");
  } 
else if (escolha.toLowerCase() == array1[rand]) {
    message.channel.send("Deu **" + array1[rand] + "**, você ganhou dessa vez!");
  } 
else if (escolha.toLowerCase() != array1[rand]) {
    message.channel.send("Deu **" + array1[rand] + "**, você perdeu dessa vez!"
    );
  }
};