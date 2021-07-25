const Discord = require("discord.js");
const talkedRecently = new Set();

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const firebase = require("firebase");
  const database = firebase.database();

  const listip = [
    "lixeiro",
    "pedreiro",
    "lenhador",
    "moto boy",
    "entregador de pizza",
    "entregador do sedex",
    "assaltante",
    "fornecedor de drogas",
    "jardineiro",
    "desenvolvedor web",
    "hacker ético"
  ];
  var randi = listip[Math.floor(Math.random() * listip.length)];

  if (talkedRecently.has(message.author.id)) {
    message.reply(
      `Você trabalhou muito espere alguns minutos para voltar a trabalhar`
    );
    message.channel.send(talkedRecently);
  } else {
    var ganharggg = Math.floor(Math.random() * 2000) + 100;
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("**Trabalho**")
      .setDescription(
        `<@${message.author.id}> Trabalhou como ${randi} e conseguiu L$\`${ganharggg}\` 💰 `
      );

    let bref = database.ref(`Perfis/${message.author.id}`);
    database
      .ref(`Perfis/${message.author.id}`)
      .once("value")
      .then(async function(db) {
        if (db.val() == null) {
          database.ref(`Perfis/${message.author.id}`);
          bref.set({
            Reais: 0 + ganharggg,
            Reps: 0,
            casadocom:
              "Oh... Infelizmente essa pessoa não está casada ainda, caso queira, use o comando `" +
              bot.prefixo +
              "casar` para se casar!",
            sobremim: `Sem sobre mim, você sabia que pode usar o comando \`${bot.prefixo}sobremim\` para colocar textinho aqui?!`
          });
          message.channel.send(embed);
        } else {
          database.ref(`Perfis/${message.author.id}`);
          bref.update({
            Reais: db.val().Reais + ganharggg
          });
          message.channel.send(embed);
        }
      });
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 600000);
};
exports.help = {
  name: "trabalhar"
};
