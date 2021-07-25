const Discord = require("discord.js");

exports.run = async (bot, message, argumentos) => {
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  const firebase = require("firebase");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase);
  }
  const database = firebase.database();
  let bref = database.ref(`Servidores/${message.guild.id}`);
  bref.once("value").then(async function(db) {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
      return message.reply(
        "<a:alerta:758339902386733098> | Sem permissão de `Gerenciar Mensagens` para usar esse comando"
      );
    if (!message.guild.me.permissions.has("MANAGE_MESSAGES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `MANAGE_MESSAGES` para continuar"
      );
    if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
    const deleteCount = parseInt(argumentos[0], 10);
    if (argumentos[0] == "200") {
      const fetched = await message.channel.messages.fetch({
        limit: 99 + 1
      });
      const fetchedb = await message.channel.messages.fetch({
        limit: 99 + 1
      });
      message.channel.bulkDelete(fetched);
      message.channel.bulkDelete(fetchedb);
      message.channel
        .send(
          `<:yes:758340222244093992> | **${
            argumentos[0]
          } mensagens limpas nesse chat!**`
        )
        .then(msg => msg.delete({ timeout: 5000 }))
        .catch(error =>
          console.log(`Não foi possível deletar mensagens devido a: ${error}`)
        );
    } else if (!deleteCount || deleteCount < 1 || deleteCount > 99) {
      const ajuda = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(
          "Ajuda - clear",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription(
          `\`${db.val().prefixo}clear\` - Limpe as mensagens de um chat.`
        )
        .addField(`✒️ | Uso:`, "`" + db.val().prefixo + "clear 1 à 99 ou 200`")
        .addField(`⚠️ | Permissão:`, "`MANAGE_MESSAGES`")
        .addField("🔀 | Sinônimos:", "`clear`, `cls`, `clean`")
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        );
      message.channel.send(message.author, ajuda);
    } else {
      if (
        argumentos[0].includes(".") ||
        argumentos[0].includes(",") ||
        argumentos[0].includes(":") ||
        argumentos[0].includes("/") ||
        argumentos[0].includes("*") ||
        argumentos[0].includes("+") ||
        argumentos[0].includes("-")
      ) {
        message.channel.send(
          "Valor inválido... tente de **1** a **99** ou **200**"
        );
      } else {
        const fetched = await message.channel.messages.fetch({
          limit: deleteCount + 1
        });
        try {
          // if(!fetched.deletable) return message.channel.send("Não é possível deletar essas mensagens");
          message.channel.bulkDelete(fetched);
        } catch (e) {
          console.log(e);
          message.channel.send("blu " + e);
        }
        message.channel
          .send(
            `<:yes:758340222244093992> | **${
              argumentos[0]
            } mensagens limpas nesse chat!**`
          )
          .then(msg => msg.delete({ timeout: 5000 }))
          .catch(error =>
            console.log(`Não foi possível deletar mensagens devido a: ${error}`)
          );
      }
    }
  });
};
