const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  const firebase = require("firebase");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase);
  }
  const database = firebase.database();
  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    let ex = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - kick",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        "`" + db.val().prefixo + "kick` - Expulse um membro indesejado!"
      )
      .addField(
        ":black_nib: | Uso:",
        "`" + db.val().prefixo + "kick <usuário> <motivo>`"
      )
      .addField("⚠️ | Permissão:", "`KICK_MEMBERS`")
      .addField(
        "🔀 | Sinônimos:",
        "`kick`, `chute`, `chutar`, `expulse`, `expulsar`"
      )
      /*.addField(
      "Exemplo:",
      `${bot.prefixo}ban @Luar Rekcah por algo bem doido :)`
    )*/
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );

    if (message.member.permissions.has("KICK_MEMBERS")) {
      const missKick = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `KICK_MEMBERS`");
      if (!message.guild.me.permissions.has("KICK_MEMBERS"))
        return message.channel.send(message.author, missKick).then(m => {
          m.delete({timeout:5000})
        })
      if (!message.guild.me.permissions.has("ADD_REACTIONS")) {
        const missAdd = new Discord.MessageEmbed()
          .setTitle("Oh... Está me faltando uma permissão")
          .setColor("RED")
          .setDescription(":warning: `ADD_REACTIONS`");
        return message.channel.send(message.author, missAdd);
      }
       if (!message.guild.me.permissions.has("EMBED_LINKS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
      let member = message.mentions.members.first();
      if (!member) return message.channel.send(message.author, ex);
      if (member.id === message.author.id)
        return message.channel.send(
          "<a:alerta:758339902386733098> | Você não pode banir a si mesmo!"
        );

      if (
        member.permissions.has(
          "ADMINISTRATOR" ||
            "BAN_MEMBERS" ||
            "KICK_MEMBERS" ||
            "MANAGE_SERVER" ||
            "MANAGE_CHANNELS"
        )
      )
        return message.channel.send(
          "<a:alerta:758339902386733098> | Eu não consigo expulsar este usuário, pois ele é um staff!"
        );
      if (!member.bannable)
        return message.channel.send(
          "<a:alerta:758339902386733098> | Eu não consigo expulsar este usuário!"
        );

      let reason = argumentos.slice(1).join(" ");
      if (!reason) {
        reason = `Expulso por ${message.author.username}#${message.author.discriminator} sem nenhum motivo declarado.`;
        var res = reason;
      } else {
        var res = reason;
      }
      //reaction ban

      const p = await message.channel
        .send(
          new Discord.MessageEmbed()
            .setTitle("Confirme o chute")
            .setColor("ffff00")
            .setDescription(
              `${message.author}, você tem certeza que deseja chutar ${member}` +
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
              .kick({ reason: reason })
              .then(
                p
                  .edit(
                    "<:yes:758340222244093992> | O Usuário <@" +
                      member.id +
                      "> foi expulso!"
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
            p.edit(":x: | Kick cancelado")
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
      return message.channel.send(
        "<a:alerta:758339902386733098> | Você não tem permissões para fazer isso!"
      );
    }
  });
};
