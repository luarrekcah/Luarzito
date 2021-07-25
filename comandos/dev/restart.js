module.exports.run = (bot, message, argumentos) => {
  if (
    message.author.id === "701953428510736396" ||
    message.author.id === "666382842338607134"
  ) {
    message.channel.send("Reiniciando sistema...").then(m => {
      m.delete({timeout:1500});
      message.delete({timeout:500});
    })
    setTimeout(() => {
      process.exit(1);
    }, 2300);
  } else {
    return;
  }
};
