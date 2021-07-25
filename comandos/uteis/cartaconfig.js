const Discord = require("discord.js");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
 
  const firebase = require("firebase");
  const database = firebase.database();

  const escolha = argumentos[0];

  const ajuda = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setAuthor(
      "Ajuda - Configurações da carta",
      "https://cdn.discordapp.com/attachments/742068003583295623/770313459170017280/kisspng-computer-icons-email-letter-viral-mailer-5ae8622d6b6e05.6016154215251789254401.png"
    )
    .setThumbnail(
      "https://media2.giphy.com/media/55gPcfOEQBkAfvtoE0/source.gif"
    )
    .addField(
      "Uso:",
      "`" +
        bot.prefixo +
        "cartaconfig on` - Para ativar o recebimento de cartas \n`" +
        bot.prefixo +
        "cartaconfig off` - Para desativar o recebimento de cartas"
    );

  if (!escolha) return message.channel.send(ajuda);

  if (escolha == "on") {
    let bref = database.ref(`Perfis/${message.author.id}/Carta`);
    database
      .ref(`Perfis/${message.author.id}/Carta`)
      .once("value")
      .then(async function(db) {
        if (db.val() == null) {
          database.ref(`Perfis/${message.author.id}/Carta`);
          bref
            .set({
              carta: "sim"
            })
            .then(message.channel.send("Agora você pode receber cartas!"));
        } else {
          if (db.val().carta === "nao") {
            database.ref(`Perfis/${message.author.id}/Carta`);
            bref
              .update({
                carta: "sim"
              })
              .then(message.channel.send("> Agora você pode receber cartas!"))
              .catch(console.log);
          } else {
            message.channel.send("> Seu receber cartas **já** está ativado!");
          }
        }
      });
  } else if (escolha == "off") {
    let bref = database.ref(`Perfis/${message.author.id}/Carta`);
    database
      .ref(`Perfis/${message.author.id}/Carta`)
      .once("value")
      .then(async function(db) {
        if (db.val() == null) {
          database.ref(`Perfis/${message.author.id}/Carta`);
          bref
            .set({
              carta: "nao"
            })
            .then(message.channel.send("Agora você não pode receber cartas!"));
        } else {
          if (db.val().carta === "sim") {
            database.ref(`Perfis/${message.author.id}/Carta`);
            bref
              .update({
                carta: "nao"
              })
              .then(
                message.channel.send("> Agora você não pode receber cartas!")
              )
              .catch(console.log);
          } else {
            message.channel.send(
              "> Seu receber cartas **já** está desativado!"
            );
          }
        }
      });
  }
};
