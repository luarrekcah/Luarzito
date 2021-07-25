const Discord = require("discord.js");

const frames = [
  "(-°□°)-  ┬─┬",
  "(╯°□°)╯    ]",
  "(╯°□°)╯  ︵  ┻━┻",
  "(╯°□°)╯       [",
  "(╯°□°)╯           ┬─┬"
];
exports.run = async (bot, message, argumentos) => {
  const msg = await message.channel.send("(\\\\°□°)\\\\  ┬─┬");
  for (const frame of frames) {
    setTimeout(() => {}, 4000);
    await msg.edit(frame);
  }
  return message;
};
