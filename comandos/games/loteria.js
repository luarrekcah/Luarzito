const Discord = require("discord.js");
const firebase = require("firebase");
const database = firebase.database();

exports.run = (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const lottery = Math.floor(Math.random() * 100) + 1;
  const escolha = argumentos[0];
  const dbref = database.ref(`Perfis/${message.author.id}`);
  dbref.once("value").then(async function(db) {
    if (db.val() == null) {
      dbref.update({
        Reais: 0
      });
    } else {
      database.ref(`Perfis/${message.author.id}`);

      if (db.val().Reais < 100) {
       message.reply(
          "Você precisa de L$100 para jogar a loteria. Lembre-se, concorrendo a R$10.000"
        );
      } else {
        if (!escolha) {
          message.channel.send(
            `Incorreto, tente: \n lzloteria 10 \n Coloque o número da sorte logo após e veja se você ganha!`
          );
        } else {
          dbref.update({
            Reais: db.val().Reais - 100
          });
          if (lottery == escolha) {
            const embed = new Discord.MessageEmbed()
              .setColor("GRENN")
              .setTitle("Wow, você ganhou!!!")
              .setDescription(
                `${message.author}, L$10K foram depositados em sua conta bancária`
              )
              .setImage(
                "https://media1.tenor.com/images/ee75605928a79b677a3c54bd1a26a95a/tenor.gif?itemid=4933655"
              );
            dbref.once("value").then(async function(db) {
              if (db.val() == null) {
                dbref.update({
                  Reais: 0 + 10000
                });
                message.channel.send(embed);
              } else {
                database.ref(`Perfis/${message.author.id}`);
                dbref.update({
                  Reais: db.val().Reais + 10000
                });
              }
            });
            message.reply(embed);
          } else {
            const embed = new Discord.MessageEmbed()
              .setColor("RED")
              .setTitle("Nope, foi mal, você perdeu o resultado foi:")
              .setDescription(lottery)
              .setFooter("Mais sorte da próxima ;-;");
            message.reply(embed);
          }
        }
      }
    }
  });
};
