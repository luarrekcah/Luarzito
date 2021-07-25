const Discord = require("discord.js");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

const database = firebase.database();
module.exports.run = async (bot, message, argumentos) => {
  let modulosAtivos = [];
  let modulosDesativados = [];
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );

  //marcar muitas pessoas
  //censurador
  //anti-ban massivo
  //msgs spam
  //anti-link

  let svs = database.ref(`Servidores/${message.guild.id}/modulos`);
  svs.once("value").then(async function(db) {
    let p = database.ref(`Servidores/${message.guild.id}`);
    p.once("value").then(async function(dbp) {
      if (db.val() == null) {
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            "Módulos - módulos de proteção ao servidor",
            "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
          )

          .addField(`Módulos ativos:`, "Nenhum módulo ativo")

          .addField(
            "Módulos inativos",
            "`antiMentions` - evitar mensagens acima de 10 marcações.\n`censored` - censurar palavras vulgares ( maior precisão para inglês ).\n`antiNuke` - Proteção contra bans massivos.\n`antiInvite` - Bloquear convites de outros servidores."
          )
          .addField(
            "Como ativar? Exemplo:",
            "`" +
              dbp.val().prefixo +
              "modulos <nome-modulo>`, para desativar utilize o mesmo comando."
          )
          .setFooter(`${new Date().getFullYear()} © ${bot.user.username}`);

        message.channel.send(message.author, embed);

        svs.set({
          antiMentions: false,
          censored: false,
          antiNuke: false,
          antiInvite: false,
          antiSpam: false
        });
      } else {
        if (db.val().antiMentions) {
          modulosAtivos.push("`mentions`\n");
        } else {
          modulosDesativados.push(
            "`antiMentions` - evitar mensagens acima de 10 marcações.\n"
          );
        }
        if (db.val().censored) {
          modulosAtivos.push("`censored`\n");
        } else {
          modulosDesativados.push(
            "`censored` - censurar palavras vulgares ( maior precisão para inglês ).\n"
          );
        }
        if (db.val().antiNuke) {
          modulosAtivos.push("`antiNuke`\n");
        } else {
          modulosDesativados.push(
            "`antiNuke` - Proteção contra bans massivos.\n"
          );
        }
        if (db.val().antiSpam) {
          modulosAtivos.push("`antiSpam`\n");
        } else {
          modulosDesativados.push(
            "`antiSpam` - Bloquear o canal para evitar spam.\n"
          );
        }
        if (db.val().antiInvite) {
          modulosAtivos.push("`antiInvite`\n");
        } else {
          modulosDesativados.push(
            "`antiInvite` - Bloquear convites de outros servidores."
          );
        }

        if (modulosAtivos.length < 1) {
       
          modulosAtivos.push("Nenhum módulo ativo.");
        }
        if (modulosAtivos.length < 1) {
       
          modulosDesativados.push("Nenhum módulo inativo.");
        }
        console.log(modulosAtivos);
        console.log(modulosDesativados);
        const embed = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(
            "Módulos - módulos de proteção ao servidor",
            "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
          )

          .addField(`Módulos ativos:`, modulosAtivos.join(""))

          .addField("Módulos inativos", modulosDesativados.join(""))
          .addField(
            "Como ativar? Exemplo:",
            "`" +
              dbp.val().prefixo +
              "modulos <nome-modulo>`, para desativar utilize o mesmo comando."
          )
          .setFooter(`${new Date().getFullYear()} © ${bot.user.username}`);

        if (!argumentos[0]) return message.channel.send(message.author, embed);
        if (argumentos[0] && !message.member.permissions.has("ADMINISTRATOR"))
          return message.channel.send(
            message.author +
              ", apenas administradores podem gerenciar os módulos.",
            embed
          );

        const escolha = argumentos[0].toLowerCase();

       

        if (escolha == "antinuke") {
          if (db.val().antiNuke == true) {
            svs
              .update({
                antiNuke: false
              })
              .then(
                message.channel.send(
                  "Módulo `antiNuke` desativado. Seu servidor irá correr grandes riscos sem ele!"
                )
              );
          } else {
            svs
              .update({
                antiNuke: true
              })
              .then(message.channel.send("Módulo `antiNuke` ativado."));
          }
        } else
        if (escolha == "antiinvite") {
          if (db.val().antiInvite == true) {
            svs
              .update({
                antiInvite: false
              })
              .then(
                message.channel.send(
                  "Módulo `antiInvite` desativado. Seu servidor está sujeito a receber convites indesejados."
                )
              );
          } else {
            svs
              .update({
                antiInvite: true
              })
              .then(message.channel.send("Módulo `antiinvite` ativado."));
          }
        }
      }
    });
  });
};
