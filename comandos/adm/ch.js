const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  const prefixo = bot.prefixo;
  const escolha = argumentos[0];

  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  const firebase = require("firebase");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase);
  }
  const database = firebase.database();
  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      const miss = new Discord.MessageEmbed()
        .setTitle("Oh... Você não tem permissão")
        .setColor("RED")
        .setDescription(":warning: `MANAGE_CHANNELS`");
      return message.channel.send(message.author, miss);
    }
 if (!message.guild.me.permissions.has("EMBED_LINKS")) 
        return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
    const missI = new Discord.MessageEmbed()
      .setTitle("Oh... Está me faltando uma permissão")
      .setColor("RED")
      .setDescription(":warning: `MANAGE_CHANNELS`");

    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(message.author, missI);

    if (!escolha) {
      const ajuda = new Discord.MessageEmbed()
        .setAuthor(
          "Ajuda - ch",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription("`" + db.val().prefixo + "ch` - gerenciador de canais")
        .setColor("GREEN")
        .addField(
          ":black_nib: | Uso:",
          "`" +
            db.val().prefixo +
            "ch private` - Para privar um canal\n" +
            
          "`" +
            db.val().prefixo +
            "ch lock` - Para bloquear um canal\n" +
            "`" +
            db.val().prefixo +
            "ch unlock` - Para desbloquear/desprivar um canal \n" +
            "`" +
            db.val().prefixo +
            "ch topic <tópico>` - Para definir um novo tópico! \n" +
            "`" +
            db.val().prefixo +
            "ch slowmode <tempo>` - Coloque limite de tempo!\n" +
            "`" +
            db.val().prefixo +
            "ch createchannel <nome>` - Crie um canal!"
        )
        .addField("⚠️ | Permissão:", "`MANAGE_CHANNELS`")
        .addField("🔀 | Sinônimos:", "`canal`, `ch`, `channel`")
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
      message.channel.send(message.author, ajuda);
    }

    if (escolha === "lock") {
      try {
        message.channel.overwritePermissions([
          {
            id: message.guild.id,
            deny: ["SEND_MESSAGES"]
          }
        ]);
        const bloqueado = new Discord.MessageEmbed()
          .setTitle("Bloqueio de canal")
          .setColor("GREEN")
          .setDescription("<:yes:758340222244093992> | Chat bloqueado!")
          .addField("Staff que realizou o bloqueio:", message.author);
        message.channel.send(bloqueado).then(message.delete());
      } catch (e) {
        message.channel.send(
          `<a:alerta:758339902386733098> | Não consegui bloquear o canal por causa de ${e}`
        );
      }
    }
    if (escolha === "private") {
       try {
        message.channel.overwritePermissions([
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL"]
          }
        ]);
        const bloqueado = new Discord.MessageEmbed()
          .setTitle("Privatização de canal")
          .setColor("GREEN")
          .setDescription("<:yes:758340222244093992> | Chat privado!")
          .addField("Staff que realizou o privatização:", message.author);
        message.channel.send(bloqueado).then(message.delete());
      } catch (e) {
        message.channel.send(
          `<a:alerta:758339902386733098> | Não consegui privar o canal por causa de ${e}`
        );
      }
    }
    if (escolha === "unlock") {
      try {
        message.channel.overwritePermissions([
          {
            id: message.guild.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
          }
        ]);
        return message.channel
          .send("<:yes:758340222244093992> | Chat desbloqueado!")
          .then(message.delete());
      } catch (e) {
        message.channel.send(
          `<a:alerta:758339902386733098> | Não consegui bloquear o canal por causa de ${e}`
        );
      }
    }
    if (escolha === "topic") {
      try {
        message.channel
          .setTopic(argumentos.slice(1).join(" "))
          .then(updated =>
            message.channel
              .send(
                `<:yes:758340222244093992> | O tópico do canal foi setado para ${updated.topic}`
              )
              .then(message.delete())
          );
      } catch (e) {
        message.channel.send(
          `Não foi possível mudar o tópico do canal, erro: ${e}`
        );
      }
    }
    if (escolha === "slowmode") {
      if (!argumentos[1]) {
        const ajudaSM = new Discord.MessageEmbed()
          .setTitle("Ajuda slowmode")
          .addField("Uso:", "`" + prefixo + " slowmode 10` - Para 10 segundos");
        message.channel.send(ajudaSM);
      }
      if (argumentos[1] === "off") {
        try {
          message.channel.setRateLimitPerUser(0);
          const setSM = new Discord.MessageEmbed()
            .setTitle("Slow Mode desligado")
            .setColor("GREEN")
            .setDescription(
              "<:yes:758340222244093992> | Chat com limite desligado"
            )
            .addField("Staff que retirou o slowmode:", message.author);
          message.channel.send(setSM).then(message.delete());
        } catch (e) {
          message.channel.send(`Não consegui retirar o limite, erro: ${e}`);
        }
      } else {
        try {
          message.channel.setRateLimitPerUser(argumentos[1]);
          const setSM = new Discord.MessageEmbed()
            .setTitle("Slow Mode")
            .setColor("GREEN")
            .setDescription(
              "<:yes:758340222244093992> | Chat em slowmode de " +
                argumentos[1] +
                " segundos!"
            )
            .addField("Staff que realizou o slowmode:", message.author);
          message.channel.send(setSM).then(message.delete());
        } catch (e) {
          message.channel.send(`Não consegui colocar um limite, erro: ${e}`);
        }
      }
    }
    if (escolha === "createchannel") {
      const nome = argumentos.slice(1).join(" ");
      let guild = bot.guilds.cache.get(message.guild.id);
      if (!nome) {
        message.channel.send("Digite o nome do canal!");
      } else {
        guild.channels
          .create(nome, { reason: `Criado por ${message.author}` })
          .then(console.log)
          .catch(console.error);
      }
    }

    if (escolha === "del") {
      /*const fetchedChannel = message.channel.id;
          fetchedChannel.delete();
          */
      // bot.guilds.get(message.guild.id).channels.get(message.channel.id).fetchMessage('messageID').then(message => message.delete());
      const p = await message.channel.send(
        "Deseja mesmo apagar o canal atual? (`" +
          message.channel.name +
          " | " +
          message.channel.id +
          "`)"
      );
      await p.react("👍").then(() => p.react("👎"));

      const filter = (reaction, user) => {
        return (
          ["👍", "👎"].includes(reaction.emoji.name) &&
          user.id === message.author.id
        );
      };

      p.awaitReactions(filter, { max: 10, time: 60000, errors: ["time"] }).then(
        collected => {
          const reaction = collected.first();

          if (reaction.emoji.name === "👍") {
            const fetchedChannel = message.channel.id;
            fetchedChannel.delete();
          } else {
            p.edit(":x: | Cancelado");
          }
        }
      );
    }
  });
};
