const Discord = require("discord.js");

const firebase = require("firebase");
if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}
module.exports.run = async (bot, message, argumentos) => {
  const database = firebase.database();
  let bref = database.ref(`Servidores/${message.guild.id}`);

  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  bref.once("value").then(async function(db) {
    if (db.val() === null) {
      var ex = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          "Ajuda - ban",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription("`" + bot.prefixo + "ban` - Bana um membro indesejado!")
        .addField(
          ":black_nib: | Uso:",
          "`" + bot.prefixo + "ban <usuário> <motivo>`"
        )
        .addField("⚠️ | Permissão:", "`BAN_MEMBERS`")
        .addField("🔀 | Sinônimos:", "`banir`, `ban`, `bana`, `bane`")
        /*.addField(
      "Exemplo:",
      `${bot.prefixo}ban @Luar Rekcah por algo bem doido :)`
    )*/
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
    } else {
      ex = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          "Ajuda - ban",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription(
          "`" + db.val().prefixo + "ban` - Bana um membro indesejado!"
        )
        .addField(
          ":black_nib: | Uso:",
          "`" + db.val().prefixo + "ban <usuário> <motivo>`"
        )
        .addField("⚠️ | Permissão:", "`BAN_MEMBERS`")
        .addField("🔀 | Sinônimos:", "`banir`, `ban`, `bana`, `bane`")
        /*.addField(
      "Exemplo:",
      `${bot.prefixo}ban @Luar Rekcah por algo bem doido :)`
    )*/
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
    }
     if (!message.guild.me.permissions.has("EMBED_LINKS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
    const miss = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `BAN_MEMBERS`");
    if (message.member.permissions.has("BAN_MEMBERS")) {
      if (!message.guild.me.permissions.has("BAN_MEMBERS"))
        return message.channel.send(message.author, miss).then(m => {
          m.delete({ timeout: 5000 });
          message.delete();
        });
      if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
        const missAdd = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `MANAGE_MESSAGES`");
        return message.channel.send(message.author, missAdd);
      }
      if (!message.guild.me.permissions.has("ADD_REACTIONS")) {
        const missAdd = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `ADD_REACTIONS`");
        return message.channel.send(message.author, missAdd);
      }
        
      let member =
        bot.users.cache.get(argumentos[0]) || message.mentions.members.first();
      if (!member) return message.channel.send(message.author, ex);
      if (member.id === message.author.id)
        return message.channel
          .send(
            "<a:alerta:758339902386733098> | Você não pode banir a si mesmo!"
          )
          .then(m => {
            m.delete({ timeout: 5000 });
            message.delete();
          });

      if (
        member.permissions.has(
          "ADMINISTRATOR" ||
            "BAN_MEMBERS" ||
            "KICK_MEMBERS" ||
            "MANAGE_SERVER" ||
            "MANAGE_CHANNELS"
        )
      )
        return message.channel
          .send(
            "<a:alerta:758339902386733098> | Eu não consigo banir este usuário, pois ele é um staff!"
          )
          .then(m => {
            m.delete({ timeout: 5000 });
            message.delete();
          });
      if (!member.bannable)
        return message.channel
          .send(
            "<a:alerta:758339902386733098> | Eu não consigo banir este usuário!"
          )
          .then(m => {
            m.delete({ timeout: 5000 });
            message.delete();
          });

      let reason = argumentos.slice(1).join(" ");
      if (!reason) {
        reason = `Autor: ${message.author.username}#${message.author.discriminator}, nenhum motivo declarado.`;
        var res = reason;
      } else {
        var res = reason;
      }
      //reaction ban
     
      const p = await message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Confirme o banimento")
            .setColor("ffff00")
            .setDescription(
              `${message.author}, você tem certeza que deseja banir ${member}` +
                " - (`" +
                member.id +
                "`)? "
            )
            .addField("Razão:", res)
            .setTimestamp()
            .setFooter("Caso queira apenas avisar o usuário reaja com ⚠️")
        )
        .then(message.delete());

      await p
        .react("✅")
        .then(p.react("❎"))
        .then(p.react("⚠️"));
      /*
       await p.react("✅").then(() => {
         p.react("❎")
         p.react("⚠️")
       });*/

      const filter = (reaction, user) => {
        return (
          ["✅", "❎", "⚠️"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      p.awaitReactions(filter, { max: 1, time: 60000, errors: ["time"] }).then(
        collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "✅") {
            member
              .ban({ reason: reason })
              .then(
                p
                  .edit(
                    "<:yes:758340222244093992> | O Usuário <@" +
                      member.id +
                      "> foi banido!"
                  )
                  .then(p.reactions.removeAll())
                  .then(p.delete({ timeout: 10000 }))
              )
              .catch(error =>
                message.channel.send(
                  `<a:alerta:758339902386733098> | Desculpe eu não consegui por causa de: ${error}`
                )
              );
          } else if (reaction.emoji.name === "❎") {
            p.edit(":x: | Ban cancelado")
              .then(p.reactions.removeAll())
              .then(p.delete({ timeout: 5000 }));
          } else {
            let icon = message.guild.iconURL({
              dynamic: true,
              format: "png",
              size: 1024
            });
            const aviso = new Discord.MessageEmbed()
              .setTitle("Aviso")
              .setColor("RED")
              .setAuthor(message.guild.name, icon)
              .setThumbnail(
                "https://assets.stickpng.com/images/5a81af7d9123fa7bcc9b0793.png"
              )
              .addField(
                "Autor:",
                "<@" +
                  message.author +
                  "> - " +
                  message.author.username +
                  "#" +
                  message.author.discriminator +
                  " - (`" +
                  message.author.id +
                  "`)"
              )
              .addField("Motivo", reason)
              .addField(
                "No canal:",
                message.channel.name + " - (`" + message.channel.id + "`)"
              )
              .setFooter("Esperamos que não retorne à cometer tal erro.")
              .setTimestamp();

            member.send(message.author, aviso).then(
              p
                .edit(
                  new Discord.MessageEmbed().setDescription(
                    ":warning: Usuário avisado."
                  )
                )
                .then(p.reactions.removeAll())
                .then(p.delete({ timeout: 5000 }))
            );
          }
        }
      );

      /*
            let staff = new Discord.MessageEmbed()
              .setColor("#00FFFF")
              .setTitle(":warning: | Ban")
              .setDescription(
                "O usuário: <@" +
                  member.id +
                  "> foi banido por <@" +
                  message.author.id +
                  "> Motivo\n``" +
                  res +
                  "``"
              )
              .setAuthor(
                `${message.author.tag}`,
                message.author.displayAvatarURL({ Size: 32 })
              )
              .setTimestamp()
              .setFooter("ID do usuário: " + message.author.id);*/

      message.delete({ timeout: 1000 });
      p.delete({ timeout: 60000 });
    } else {
      const missU = new Discord.MessageEmbed()
        .setTitle("Oh... Você não tem permissão.")
        .setColor("RED")
        .setDescription(":warning: `BAN_MEMBERS`");
      return message.channel.send(
        message.author,
        missU
        // "<a:alerta:758339902386733098> | Você não tem permissões para fazer isso!"
      );
    }
  });
};
