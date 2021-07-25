const Discord = require("discord.js");

const firebase = require("firebase");
if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}
//const { enaddemoji_help, enaddemoji_missingPerms } = require("./idiomas.json");

const i_en = {
  author: "Help - addemoji",
  desc:
    "``${bot.prefixo}addemoji` - Add the emoji you want to the server more easily`",
  field_1_1: "✒️ | Usage:",
  field_1_2: "``${bot.prefixo}addemoji <name> <url>``",
  field_2_1: "⚠️ | Permission:",
  field_3_1: "🔀 | Synonym:"
};

exports.run = (bot, message, argumentos, prefixo) => {
  const database = firebase.database();
  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    if (db.val() === null) {
      let erro = new Discord.MessageEmbed()

        //.setTitle(`Ajuda - addemoji`)
        .setAuthor(
          "Ajuda - addemoji",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription(
          `\`${bot.prefixo}addemoji\` - Adicione o emoji que quiser ao servidor de forma mais facil` //en.addemoji_help
        )
        // .setThumbnail("https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png")
        .addField(`**✒️ | Uso:**`, `\`${bot.prefixo}addemoji <nome> <url>\``)
        .addField(`**⚠️ | Permissão:**`, `\`MANAGE_EMOJIS\``)
        .addField("🔀 | Sinônimos:", "`criaremoji`, `createemoji`, `addem`")
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        )
        .setColor("#8c0046");
    } else {
    }
    const dev = bot.users.cache.get(process.env.DEV_ID);
    const ano = new Date();
    let erro = new Discord.MessageEmbed()

      //.setTitle(`Ajuda - addemoji`)
      .setAuthor(
        "Ajuda - addemoji",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${
          db.val().prefixo
        }addemoji\` - Adicione o emoji que quiser ao servidor de forma mais facil` //en.addemoji_help
      )
      // .setThumbnail("https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png")
      .addField(`**✒️ | Uso:**`, `\`${db.val().prefixo}addemoji <nome> <url>\``)
      .addField(`**⚠️ | Permissão:**`, `\`MANAGE_EMOJIS\``)
      .addField("🔀 | Sinônimos:", "`criaremoji`, `createemoji`, `addem`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      )
      .setColor("#8c0046");

    if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
    if (!message.guild.me.permissions.has("MANAGE_EMOJIS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `MANAGE_EMOJIS` para continuar"
      );
    if (!argumentos[0])
      return message.channel
        .send(message.author, erro)
        .then(message.delete({ timeout: 1000 }));
    if (!argumentos[1])
      return message.channel
        .send(message.author, erro)
        .then(message.delete({ timeout: 1000 }));
    if (!argumentos[1].startsWith("http"))
      return message.channel
        .send("<@" + message.author + ">, tente um link.", erro)
        .then(message.delete({ timeout: 1000 }));
    if (!message.member.hasPermission("MANAGE_EMOJIS"))
      return message.channel
        .send("<@" + message.author + ">, sem permissões suficientes...", erro)
        .then(message.delete({ timeout: 1000 }));

    try {
      message.guild.emojis.create(argumentos[1], argumentos[0]).then(emoji => {
        message.channel
          .send(`${emoji} **|** Emoji adicionado com sucesso.`)
          .then(message.delete({ timeout: 1000 }));
      });
    } catch (err) {
      message.channel.send(`\`\`\`js\n${err}\`\`\``);
    }
  });
};

exports.help = {
  name: "addemoji"
};
