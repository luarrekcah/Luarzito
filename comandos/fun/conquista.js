//Atualizado 28/11/2020 - 13:10 / aguardando envio.

const Discord = require("discord.js");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `ATTACH_FILES` para continuar"
      );
  message.delete({ timeout: 1000 });
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  try {
    const text = argumentos.join(" ");
    if (!text) {
      const ajuda = new Discord.MessageEmbed()
        .setAuthor(
          "Ajuda - conquista",
          "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
        )
        .setDescription(
          `\`${bot.prefixo}conquista\` - Conquista do Minecraft personalizável!`
        )
        .addField(`**✒️ | Uso:**`, `\`${bot.prefixo}conquista <frase>\``)
        //.addField(`**⚠️ | Permissão:**`, `\`MANAGE_EMOJIS\``)
        .addField(
          "🔀 | Sinônimos:",
          "`conquista`, `achievement`, `achi`"
        )
        .setFooter(
          `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
        )
        .setColor("#8c0046");
      message.channel.send(ajuda).then(message.delete({ timeout: 2000 }));
    }
    if (text.length > 25)
      return message
        .reply("Texto precisa ter menos de 25 carácteres")
        .then(message.delete({ timeout: 2000 }));
    const superagent = require("superagent");
    const { body } = await superagent
      .get("https://www.minecraftskinstealer.com/achievement/a.php")
      .query({
        i: 1,
        h: "Conquista desbloqueada!",
        t: text,
      });
    message.channel
      .send({
        files: [{ attachment: body, name: "conquista.png" }],
      })
      .then(message.delete({ timeout: 2000 }));
  } catch (err) {
    console.log(err);
  }
};
