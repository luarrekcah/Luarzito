const Discord = require("discord.js");
const firebase = require("firebase");

if (!firebase.apps.length) {
  firebase.initializeApp(firebase);
}

module.exports.run = async (bot, message, argumentos) => {
  const firebase = require("firebase");
  const database = firebase.database();
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();

  //if(message.author.id !== bot.dev) return message.channel.send("Comando desativado pelo desenvolvedor para manutenção.");

  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    const prefixo = argumentos.join(" ");

    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - Prefix",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${db.val().prefixo}setprefix\` - Escolha um novo prefíxo para mim.`
      )
      .addField(`✒️ | Uso:`, "`" + db.val().prefixo + "setprefix <prefixo>`")
      .addField(`⚠️ | Permissão:`, "`ADMINISTRATOR`")
      .addField(
        "🔀 | Sinônimos:",
        "`setp`, `setarprefixo`, `newprefix`, `prefix`"
      )
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );

    if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        "<@" + message.author.id + ">, sem permissão.",
        ajuda
      );
// if (!message.guild.me.permissions.has("EMBED_LINKS")) 
     //   return message.channel.send(":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar");
    
    if (!prefixo) return message.channel.send(message.author, ajuda);

    let bref = database.ref(`Servidores/${message.guild.id}`);
    bref.once("value").then(async function(db) {
      if (db.val() == null) {
        bref.set({
          prefixo: prefixo
        });
        message.channel
          .send("Agora o novo prefíxo é `" + prefixo + "`")
          .then(message.delete({ timeout: 500 }));
      } else {
        bref.update({
          prefixo: prefixo
        });
        message.channel
          .send("Prefíxo atualizado para `" + prefixo + "`")
          .then(message.delete({ timeout: 500 }));
      }
    });
  });
};
