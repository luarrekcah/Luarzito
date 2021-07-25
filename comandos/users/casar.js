const Discord = require("discord.js");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  const firebase = require("firebase");
  const database = firebase.database();

  const autor = message.author.id;
  const user2 = message.mentions.users.first();
  const autorI = autor + 1 - 1; // sim isso é uma gambiarra
  const user2I = user2 + 1 - 1;
  const amizadeID = autorI + user2I;

  if (!user2)
    return message.channel.send(
      "Mencione alguém para se casar com essa pessoa."
    );
  if (message.author === user2)
    return message.channel.send(`Você não pode se casar com você mesmo.`);
  if (user2.bot)
    return message.channel.send(`Você não pode se casar com um bot.`);
  // refs ao dbs
  let dbsAmizade = database.ref(`Usuários/${amizadeID}`);
  let bref = database.ref(`Perfis/${autor}`);
  let dbsUser = database.ref(`Perfis/${user2.id}`);
  //refs fim
  bref.once("value").then(async function(db) {
    dbsAmizade.once("value").then(async function(dbAmizade) {
      dbsUser.once("value").then(async function(dbUser) {
        if (db.val() == null) {
          bref.set({
            Reps: 0,
            Reps_autores: [],
            Reps_razoes: [],
            Reais: 0,
            fundo_perfil:
              "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
            casadocom_tempo: 0,
            casadocom: 0,
            sobremim: ""
          });
          return message.channel.send(
            "Vocês ainda não podem se casar :/, façam RP e coletem Lennes"
          );
          if (dbAmizade.val() == null) {
            dbsAmizade.set({
              amizadeNivel: 0
            });
            return message.channel.send(
              "Vocês ainda não podem se casar :/, façam RP e coletem Lennes"
            );
          }
          if (dbUser.val() == null) {
            dbUser.set({
              Reps: 0,
              Reps_autores: [0],
              Reps_razoes: [""],
              Reais: 0,
              fundo_perfil:
                "https://cdn.discordapp.com/attachments/742068003583295623/792531715863609354/Bgnzinho_Img027.png",
              casadocom_tempo: 0,
              casadocom: 0,
              sobremim: ""
            });
            return message.channel.send(
              "Vocês ainda não podem se casar :/, façam RP e coletem Lennes"
            );
          }
        }

        if (db.val().Reais <= 20000)
          return message.channel.send("Você precisa de 20 mil para se casar.");

        if (
          dbAmizade.val().amizadeNivel <= 200 ||
          dbAmizade.val().amizadeNivel === null
        )
          return message.channel.send(
            "Seu nível de amizade com essa pessoa é muito baixo, faça rp para aumentar."
          );

        if (db.val().casadocom == user2.id && dbUser.val().casadocom == autor)
          return message.channel.send("Vocês já estão casados.");

        if (dbUser.val().Reais <= 20000)
          return message.channel.send("Ambos precisam ter 20 mil");

        if (
          db.val().casadocom == 0
        ) {
          //casar ini
          var main = message.channel.createMessageCollector(
            a => a.author.id == message.mentions.users.first(),
            {
              time: 60000,
              max: 10
            }
          );

          message.channel.send(
            `<@${user2.id}>, você aceita se casar com <@${autor}>?\nDigite "sim" para aceitar.`
          );
          var col;
          main.on("collect", a => {
            if (a.content.toLowerCase() == "sim") {
              bref
                .update({
                  casadocom: user2.id,
                  Reais: db.val().Reais - 20000
                })
                .then(
                  dbsUser
                    .update({
                      casadocom: autor,
                      Reais: dbUser.val().Reais - 20000
                    })
                    .then(
                      message.channel.send(
                        "Agora vocês estão casados, felicidades!"
                      )
                    )
                );
              col = "yah";
              main.stop();
            } else if (a.content.toLowerCase() == "não") {
              message.channel.send(
                "Casamento cancelado... Espero que vocês se resolvam."
              );
              col = "yah";
              main.stop();
            }
          });
          main.on("end", a => {
            if (col == "yah") {
              return;
            } else {
              return;
              message.channel.send(
                "Esperei bastante, a pessoa que recebeu a proposta não respondeu, estou cancelando..."
              );
            }
          });
          //casar fim
        } else {
          return message.channel.send(
            "Para se casarem, não podem estar casados com outros usuários."
          );
        }
      });
    });
  });
};
