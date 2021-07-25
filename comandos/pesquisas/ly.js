const Discord = require("discord.js");
const solenolyrics = require("solenolyrics");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );
  const escolha = argumentos.join(" ");

  if (!escolha)
    return message.channel.send(
      `Você não me forneceu uma música! \nTente: ${bot.prefixo}ly <música>.`
    );
   message.channel.startTyping();
  let lyTamanho = await solenolyrics.requestLyricsFor(escolha);
  let lyrics = await solenolyrics.requestLyricsFor(escolha);
  lyrics = lyrics.slice(0, 2040) + "...";
  let ly2 = await solenolyrics.requestLyricsFor(escolha);
  ly2 = ly2.slice(2040, 3060) + "...";
  let ly3 = await solenolyrics.requestLyricsFor(escolha);
  ly3 = ly3.slice(3060, 4080) + "...";
  let ly4 = await solenolyrics.requestLyricsFor(escolha);
  ly4 = ly4.slice(4080, 5100) + "...";
  const sing = await message.channel.send(`Procurando por ${escolha}`);

  if (lyrics === null || !lyrics || lyrics == undefined || lyrics.length < 10)
    return message.channel
      .send(
        `Oh... Não identifiquei ${escolha}, tente o nome de uma música válida.`
      )
      .then(sing.delete()).then( message.channel.stopTyping())
  try {
    
    if (lyTamanho.length >= 10 && lyTamanho.length <= 2040) {
       message.channel.stopTyping();
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Letra de ${escolha}`)
        .setDescription(lyrics)
        .setFooter(`Tamanho: ${lyrics.length}`);
      message.channel
        .send(
          "Provido por solenolyrics | Aqui está, " +
            "<@" +
            message.author +
            ">",
          embed
        )
        .then(sing.delete());
      //message.channel.send("As letras desta música é muito grande... Discord não me permite enviar :( \n\nLetras na música desejada: " + lyrics.length +" \nArquivo de texto:",
      //  { files: [{ attachment: Buffer.from(lyrics), name: escolha+".txt" }] });
    } else if (lyTamanho.length >= 2040 && lyTamanho.length <= 3060) {
      message.channel.stopTyping();
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Letra de ${escolha}`)
        .setDescription(lyrics)
        .addField("Continuando:", ly2)
        .setFooter(`Tamanho: ${lyTamanho.length}`);
      message.channel
        .send(
          "Provido por solenolyrics | Aqui está, " +
            "<@" +
            message.author +
            ">",
          embed
        )
        .then(sing.delete());
    } else if (lyTamanho.length >= 3060 && lyTamanho.length <= 4080) {
      message.channel.stopTyping();
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Letra de ${escolha}`)
        .setDescription(lyrics)
        .addField("Continuando:", ly2)
        .addField("Continuando:", ly3)
        .setFooter(`Tamanho: ${lyTamanho.length}`);
      message.channel
        .send(
          "Provido por solenolyrics | Aqui está, " +
            "<@" +
            message.author +
            ">",
          embed
        )
        .then(sing.delete());
    } else if (lyTamanho.length >= 4080 && lyTamanho.length <= 5100) {
      message.channel.stopTyping();
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`Letra de ${escolha}`)
        .setDescription(lyrics)
        .addField("Continuando:", ly2)
        .addField("Continuando:", ly3)
        .addField("Continuando:", ly4)
        .setFooter(`Tamanho: ${lyTamanho.length}`);
      message.channel
        .send(
          "Provido por solenolyrics | Aqui está, " +
            "<@" +
            message.author +
            ">",
          embed
        )
        .then(sing.delete());
    }
  } catch (err) {
    console.log(`Ocorreu um erro ` + err).then(sing.delete());
  }
};
