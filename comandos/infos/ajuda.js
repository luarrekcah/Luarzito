const Discord = require("discord.js");
exports.run = async (bot, message, argumentos, arg_texto, chat) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const dev = bot.users.cache.get("701953428510736396");
  const ano = new Date();
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    //.setTitle("Olá meu prefíxo é `" + bot.prefixo + "`")
    .setAuthor(
      "Ajuda - Resumo",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1024px-Infobox_info_icon.svg.png"
    )
    .setImage(
      "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2FLuarzito-help.jpg?v=1618502639787"
    )
    .setDescription(
      `Um bot para moderação, RP valorizado, economia e diversão geral. Legal, né?! Se quiser ver tudo que posso fazer, entre no meu site! :)`
    )
    .addFields(
      /* {
        name: `<:info:760851369346203699> | Sobre:`,
        value: `<:bot:758336362989486120> Simples bot open-source para o discord! \n Caso deseje os arquivos entre no meu servidor ou digite **${bot.prefixo}source**!`
      },*/
      {
        name: "<a:love:758339794492981258> | Eu nasci no dia:",
        value: "09/08/2020 :partying_face:!"
      },
      {
        name: `:globe_with_meridians: | Site & Servidor:`,
        value: `[site](https://luarzito.glitch.me/) | [servidor](https://discord.gg/RDaxUrv/)`
      },
      {
        name: `<a:coroa:758337559247454288> | Quer me adicionar no seu servidor?!`,
        value: `Só clicar [aqui](https://discord.com/oauth2/authorize?client_id=743841329334845530&scope=bot&permissions=8/) para me chamar!`
      },
      {
        name: `⬆️ | Gostou do bot, que tal votar nele?`,
        value: `[top.gg](https://top.gg/bot/743841329334845530/vote/)`
      }
    )
    .addField("🔀 | Sinônimos:","`help`, `comandos`, `ajuda`")
    .setFooter(`${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `);
  message.channel.send(message.author, embed);
};
