module.exports.run = (bot, message, argumentos) => {
  if (
    message.author.id === "701953428510736396" ||
    message.author.id === "666382842338607134"
  ) {
    bot.interactions
  .deleteCommand(argumentos[0])
  .then(console.log)
  .catch(console.error);

  } else {
    return;
  }
};
