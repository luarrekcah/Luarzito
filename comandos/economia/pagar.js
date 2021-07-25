const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();

exports.run = (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const user = message.mentions.users.first();
  const valor = argumentos[1];
  if (valor === NaN) return;
  const erro = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setThumbnail(
      "https://cdn.discordapp.com/attachments/757308101182357518/759625647441182741/pngwing.com_2.png"
    )
    .setTitle("Ajuda - transferência de dinheiro")
    .addField(
      "Uso:",
      "`" + bot.prefixo + "pagar <menção> <valor>`\nUse números inteiros!"
    );

  const valorT = valor - 1 + 1;
  if (!user)
    return message.channel.send(erro);
  if (!valor)
    return message.channel.send(erro);
  if (valor.includes("-" || "+" || "." || ","))
    return message.channel.send(erro);
  if (message.author === user)
    return message.channel.send(`Você não pode pagar para sí mesmo.`);
  const dbref = database.ref(`Perfis/${user.id}`);
  const autorB = database.ref(`Perfis/${message.author.id}`);
  dbref.once("value").then(async function(db) {
    if (db.val() == null) {
      dbref.update({
        Reais: 0 + valorT,
        Reps: 0,
        casadocom: "Oh... Infelizmente essa pessoa não está casada ainda, caso queira, use o comando `" +bot.prefixo+ "casar` para se casar!",
        sobremim: `Sem sobre mim, você sabia que pode usar o comando \`${bot.prefixo}sobremim\` para colocar textinho aqui?!`
      
      });
    }
    autorB.once("value").then(async function(dbB) {
      if (dbB.val().Reais < valor) {
        message.channel.send(`${message.author} Você não tem essa quantia.`);
      } else {
        const valorAtual = db.val().Reais;
        dbref.update({
          Reais: db.val().Reais + valorT
        });
        autorB.once("value").then(async function(dbB) {
          const embed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Pagamento realizado com sucesso")
            .setThumbnail(
              "https://cdn.discordapp.com/attachments/757308101182357518/759625647441182741/pngwing.com_2.png"
            )
            .addField(
              `Saldo atual de ${message.author.username}:`,
              dbB.val().Reais - valor
            )
            .addField(
              `Saldo atual de ${user.username}:`,
              db.val().Reais + valorT
            );
          message.channel.send(embed);
          autorB.update({
            Reais: dbB.val().Reais - valor
          });
        });
      }
    });
  });
};
