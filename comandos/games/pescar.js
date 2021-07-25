const Discord = require("discord.js");
exports.run = async (bot, message, argumentos) => {
  const quantidade = Math.floor(Math.random() * 20) + 1;
  if (quantidade === 10) {
    message.channel.send("Tu achou um skate perdido do chorão, deve valer uma boa grana :skateboard:");
  } else {
    const fishes = [
      "pegou um :fish:",
      "pegou um :tropical_fish:",
      "pegou um :blowfish:",
      "pegou uma :boot:",
      "um jacaré comeu tua isca :crocodile:",
      "pegou uma :lobster:",
      "pegou um :crab:"
    ];
    const fish = fishes[Math.floor(Math.random() * fishes.length)];
    message.channel.send(`:fishing_pole_and_fish: Você foi pescar e ${fish}`);
  }
};
