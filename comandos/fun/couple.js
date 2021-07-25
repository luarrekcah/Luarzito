const Canvas = require("canvas");
const Discord = require("discord.js");
const canvas = Canvas.createCanvas(384, 128);
const ctx = canvas.getContext("2d");
const { createCanvas, loadImage } = require("canvas");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  if (!message.guild.me.permissions.has("ATTACH_FILES"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `ATTACH_FILES` para continuar"
      );
  message.delete({ timeout: 1000 });
  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  let membro1 =
    bot.users.cache.get(argumentos[0]) || message.mentions.members.first();
  let membro2 =
    bot.users.cache.get(argumentos[1]) || message.mentions.members.last();

  if (!membro1 || !membro2) {
    const ajuda = new Discord.MessageEmbed()
      .setAuthor(
        "Ajuda - couple",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(
        `\`${bot.prefixo}couple\` - Veja a foto de duas pessoas lado à lado.`
      )
      .addField(
        `**✒️ | Uso:**`,
        `\`${bot.prefixo}couple <menção/ID> <menção/ID>\``
      )
      // .addField(`**⚠️ | Permissão:**`, `\`MANAGE_EMOJIS\``)
      .addField("🔀 | Sinônimos:", "`couple`, `metadinha`")
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      )
      .setColor("#8c0046");
    message.channel.send(ajuda);
  }

  const canvas = Canvas.createCanvas(260, 128); //384, 128
  const ctx = canvas.getContext("2d");

  const foto1 = await Canvas.loadImage(
    membro1.user.displayAvatarURL({ format: "png" })
  );
  const foto2 = await Canvas.loadImage(
    membro2.user.displayAvatarURL({ format: "png" })
  );

  ctx.drawImage(foto1, 3, 0, 128, 128); // -10, 0, 128, 128 //5 fica muito bom, mas notavel pra direita
  ctx.drawImage(foto2, 130, 0, 128, 128); //260, 0, 128, 128

  const couple = new Discord.MessageAttachment(canvas.toBuffer(), "couple.png");

  const coupleEmbed = new Discord.MessageEmbed()
    .setColor("GREEN")
    .attachFiles([couple])
    .setImage("attachment://couple.png");

  message.channel.send("<@" + message.author.id + "> \n", coupleEmbed);
};
