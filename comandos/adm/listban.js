const Discord = require("discord.js");

exports.run = async (bot, message) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send("Você precisa ser administrador.");
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!message.guild.me.permissions.has("ADD_REACTIONS")) {
        const missAdd = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `ADD_REACTIONS`");
        return message.channel.send(message.author, missAdd);
      }
  try {
    let output = "";
    let i = 0;

    message.channel
      .send(
        `Você quer receber a lista de bans? Reaja com ✅ para confirmar o envio.`
      )
      .then(async msg => {
        await msg.react("✅");
        await msg.react("⏹");
        const filtro = (reaction, user) =>
          ["✅", "⏹"].includes(reaction.emoji.name) &&
          user.id === message.author.id;
        const coletor = msg.createReactionCollector(filtro);

        coletor.on("collect", r => {
          switch (r.emoji.name) {
            case "✅":
              msg.reactions.removeAll;
              message.guild.fetchBans().then(async bans => {
                message.channel.send(
                  "Enviei a lista de bans no seu privado! \n(Caso não receba nenhuma mensagem no privado significa que não tem ninguem banido!)"
                );
                bans.forEach(async ban => {
                  i++;
                  const bot = {
                    true: " sim",
                    false: " não"
                  };
                  let banList = [];
                  await banList.push(
                    i +
                      ".**Nome:**" +
                      ban.user.username +
                      " | **ID:** " +
                      ban.user.id +
                      " | **bot:**" +
                      bot[ban.user.bot] +
                      ""
                  );
                  await message.author
                    .send(banList === null ? "Sem bans" : banList)
                    .then(msg.delete({ timeout: 1000 }));
                });
              });
              break;
            case "⏹":
              msg.reactions.removeAll;
              msg.delete().then(message.channel.send(`O envio foi cancelado.`));
              break;
          }
        });
      });
  } catch (err) {
    message.channel.send("Um erro aconteceu! \n" + err).catch();
  }
};
