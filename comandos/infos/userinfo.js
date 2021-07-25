const Discord = require("discord.js");
const moment = require("moment");
moment.locale("en");

const status = {
  online: "🟢 Online",
  idle: "🟠 Ausente",
  dnd: "🔴 Não pertube",
  offline: "⚪️ Offline/Invisivel"
};

exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  var member;
  if (!argumentos[0]) {
    member = message.author;
  } else {
    member =
      bot.users.cache.get(argumentos[0]) || message.mentions.users.first();
  }

  if (!member)
    return message.channel.send(
      "Não conheço nenhum usuário com o id `" + argumentos[0] + "`."
    );

  const avatar = member.avatarURL({
    dynamic: true,
    format: "png",
    size: 1024
  });

  console.log(member);

  const infosGuild = [];
  const infosAdd = [];
  const flags = [];
  let permissoes = [];
  if (member.bot) {
    infosAdd.push("🤖");
  }

  if (member.deleted) {
    infosAdd.push("🗑️");
  }

  const validador = message.guild.members.cache.get(member.id);
  if (validador) {
    if (validador.user.id == message.guild.ownerID) {
      infosGuild.push("👑");
    }

    if (validador.hasPermission("ADMINISTRATOR")) {
      permissoes.push("Admin");
    }

    if (validador.hasPermission("KICK_MEMBERS")) {
      permissoes.push(" Chutar membros");
    }

    if (validador.hasPermission("BAN_MEMBERS")) {
      permissoes.push(" Ban Membros");
    }

    if (validador.hasPermission("MANAGE_MESSAGES")) {
      permissoes.push(" Gerenciar mensagens");
    }

    if (validador.hasPermission("MANAGE_CHANNELS")) {
      permissoes.push(" Gerenciar canais");
    }

    if (validador.hasPermission("MENTION_EVERYONE")) {
      permissoes.push(" Mencionar Everyone");
    }

    if (validador.hasPermission("MANAGE_NICKNAMES")) {
      permissoes.push(" Gerenciar Nicknames");
    }

    if (validador.hasPermission("MANAGE_ROLES")) {
      permissoes.push(" Gerenciar cargos");
    }

    if (validador.hasPermission("MANAGE_WEBHOOKS")) {
      permissoes.push(" Gerenciar Webhooks");
    }

    if (validador.hasPermission("MANAGE_EMOJIS")) {
      permissoes.push(" Gerenciar emojis");
    }

    if (permissoes.length == 0) {
      permissoes.push("Nenhuma permissão especial.");
    }

    //EMBEDS ----------------------------------------------------------------------

    const dataMoment = moment(member.createdAt).format();
    const dataMomentMember = moment(validador.createdAt).format();
    const comparacao = moment([dataMoment]).fromNow();
    const comparacaoMember = moment([dataMomentMember]).fromNow();
    const data = comparacao;
    const dataMember = comparacaoMember;
    const embedBasico = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(
        infosGuild +
          " " +
          infosAdd +
          " " +
          member.username +
          "#" +
          member.discriminator
      )
      .setThumbnail(avatar)
      .addField("🏷️ | ID:", "`" + member.id + "`", true)
      .addField("🖼️ | Avatar:", `[download](${avatar}/)`, true)
      .addField(
        "🗃️ | Conta criada em:",
        member.createdAt + " (`" + dataMoment + "`)"
      )
      .addField(
        "🗃️ | Entrou em:",
        validador.joinedAt + " (`" + dataMomentMember + "`)"
      );

    const statusUser = validador.user.presence.activities;
    const tipoStatus = {
      CUSTOM_STATUS: "Status customizado:"
    };
    let ultimaMsg = `Clique [aqui](https://discord.com/channels/${message.guild.id}/${validador.lastMessageChannelID}/${validador.lastMessageID})`;
    if (validador.lastMessageChannelID === null) {
      ultimaMsg = "Última mensagem não encontrada.";
    }
    const embedAvancado = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(
        infosGuild +
          " " +
          infosAdd +
          " " +
          member.username +
          "#" +
          member.discriminator +
          " | Avançado"
      )
      .setThumbnail(avatar)
      .addField("🛠️ | Permissões:", "`" + permissoes + ".`")
      .addField(
        `🛡️ | Cargos: [${
          validador.roles.cache
            .filter(r => r.id !== message.guild.id)
            .map(roles => `\`${roles.name}\``).length
        }]`,
        `${validador.roles.cache
          .filter(r => r.id !== message.guild.id)
          .map(roles => `<@&${roles.id}>`)
          .join(" **\n** ") || "`Sem cargos.`"}`
      )
      .addField(
        "🗣️ | Disponibilidade:",
        "`" + status[validador.user.presence.status] + "`",
        true
      )
      .addField("🗄️ | Última mensagem:", ultimaMsg, true);
    /*   .addField(
        "Status",
        `${validador.user.presence.activities.type}\n${statusUser.state}\nData: ${
          statusUser.createdTimestamp
        }`
      );*/
    console.log(member);
    console.log(validador);

    //---------------------------------------------------------------

    const embedUser = await message.channel.send(message.author, embedBasico);

    await embedUser.react("ℹ️");

    const filter = (reaction, userM) => {
      return (
        ["ℹ️"].includes(reaction.emoji.name) && userM.id === message.author.id
      );
    };

    embedUser
      .awaitReactions(filter, {
        max: 1,
        time: 60000,
        errors: ["time"]
      })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === "ℹ️") {
          embedUser
            .edit(message.author, embedAvancado)
            .then(embedUser.react("◀️"));

          const filter = (reaction, userM) => {
            return (
              ["◀️"].includes(reaction.emoji.name) &&
              userM.id === message.author.id
            );
          };

          embedUser
            .awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ["time"]
            })
            .then(collected => {
              const reaction = collected.first();

              if (reaction.emoji.name === "◀️") {
                embedUser.edit(message.author, embedBasico);
              }
            });
        }
      });
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle(infosAdd + " " + member.username + "#" + member.discriminator)
      .setThumbnail(avatar)
      .addField("🏷️ | ID:", "`" + member.id + "`")
      .addField("🖼️ | Avatar:", `[download](${avatar}/)`)
      .addField(
        "🗃️ | Conta criada em:",
        member.createdAt + " (`" + dataMoment + "`)"
      );

    message.channel.send(message.author, embed);
  }
};
