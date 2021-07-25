const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (!bot.devs.includes(message.author.id)) return;

  const embed = new Discord.MessageEmbed()
    .setAuthor(
      "Ajuda - devsend" //,
      //"https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
    )

    /* .setThumbnail(
      "https://media2.giphy.com/media/55gPcfOEQBkAfvtoE0/source.gif"
    )*/
    .setColor("#15005c")
    .setDescription("Entrar em contato com users de forma direta.")
    .addField("Uso", `${bot.prefixo}devsend <ID> <texto>`);

  let user =
    bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  if (!user) return message.channel.send(embed);
  if (user === message.author)
    return message.channel
      .send("Você não pode mandar uma mensagem de desenvolvedor à sí mesmo.")
      .then(message.delete())
      .then(m => {
        setTimeout(() => {
          m.delete();
        }, 5000);
      });
  if (!bot.users.cache.get(argumentos[0]) === bot.user)
    return message.channel.send(
      "Esse usuário não compartilha um servidor comigo."
    );
  if (!user === bot.users)
    return message.channel.send(
      "Esse usuário não compartilha um servidor comigo."
    );

  const carta = argumentos.slice(1).join(" ");

  if (!user)
    return message.channel.send(
      "<@" + message.author + ">" + " você se esqueceu do usuário (ID)!",
      embed
    );

  if (!carta)
    return message.channel.send(
      "<@" + message.author + ">" + " você se esqueceu do texto!",
      embed
    );

  try {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        "Enviado com sucesso para " + user.username + "!",
        "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
      );
    user.send(
      "Mensagem do desenvolvedor(a) <@" +
        message.author.id +
        "> - " +
        message.author.username +
        " (`" +
        message.author.id +
        "`):\n\n" +
        carta
    );
    message.delete({ timeout: 5000 });
  } catch (e) {
    console
      .log("erro: " + e)
      .then(message.channel.send("Ocorreu um erro ao enviar a carta: " + e));
  }
};
