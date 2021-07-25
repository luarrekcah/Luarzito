const Discord = require("discord.js");
const DiscordPages = require("discord-pages");
const gis = require("g-i-s");
const Filter = require("bad-words");
const customFilter = new Filter({ placeHolder: "*" });

exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
    return message.channel.send(
      ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
    );

  let escolha;

  if (message.channel.nsfw) {
    escolha = customFilter.clean(argumentos.join(" ").toLowerCase());
  } else {
    escolha = argumentos.join(" ").toLowerCase();
  }

  const dev = bot.users.cache.get(process.env.DEV_ID);
  const ano = new Date();
  let talkedRecently = new Set();
  if (!escolha) {
    const ajuda = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setAuthor(
        "Ajuda - image",
        "https://cdn.discordapp.com/attachments/742068003583295623/777676687604580352/information-removebg-preview_2.png"
      )
      .setDescription(`\`${bot.prefixo}image\` - Pesquise imagens.`)
      .addField(`✒️ | Uso:`, "`" + bot.prefixo + "image <pesquisa>`")

      .addField(
        "🔀 | Sinônimos:",
        "`image`, `search`, `pesquisar`, `img`, `im`, `i`, `s`"
      )
      .setFooter(
        `${ano.getFullYear()} © ${bot.user.username} | ${dev.username} `
      );
    message.channel.send(message.author, ajuda);
  } else {
    if (talkedRecently.has(message.author.id))
      return message.channel.send(
        "⚠️ | Espere 5 segundos para usar outro comando..."
      );
    const nSFW = [
      "cock",
      "cum",
      "pornô",
      "pika",
      "rola",
      "pênis",
      "vagina",
      "vagin",
      "porra",
      "caralho",
      "sexo",
      "blowjob",
      "ass",
      "dick",
      "fuck",
      "fodendo",
      "foda",
      "sexy",
      "tetas",
      "yaoi",
      "yuri",
      "nudes",
      "pornozão",
      "pornozao"
    ];
    if (escolha.includes("*") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("zoofilia") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("zoofily") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("mia khalifa") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("porno") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("nudism") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("porn") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("hentai") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("pussy") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("boobs") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("gore") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("nude") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("futanari") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");

    if (escolha.includes("sex") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("tits") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("urso") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("pelado") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (escolha.includes("pelada") && !message.channel.nsfw)
      return message.channel.send("Pesquisa não autorizada.");
    if (
      (nSFW.includes(argumentos.join(" ").toLowerCase()) &&
        !message.channel.nsfw) ||
      (argumentos
        .join(" ")
        .toLowerCase()
        .startsWith(nSFW) &&
        !message.channel.nsfw)
    )
      return message.channel.send("Pesquisa não autorizada");
    message.channel.startTyping();
    setTimeout(() => {
      message.channel.stopTyping();
      message.delete();
    }, 1000);
    //const aviso = await message.channel.send(`Procurando por ${escolha}...`).then(message.delete({timeout:1000}))

    gis(escolha, logResults);
    async function logResults(error, results) {
      if (error) {
        message.channel
          .send("Houve um erro ao buscar " + escolha + ".")
          .then(message.channel.stopTyping());
      } else {
        if (results.length <= 1)
          return message.channel
            .send("Sem resultados")
            .then(message.channel.stopTyping());
        //console.log(JSON.stringify(results, null, "  "));
        function randomInt(min, max) {
          return min + Math.floor((max - min) * Math.random());
        }

        const maxN = 20;

        //Página 1
        const url1i = 0; //randomInt(1, maxN);
        const url1 = results[url1i].url;
        //   const result_url1 = await kahaki.getPreview(url1);
        //
        //Página 2
        const url2i = 1; //randomInt(1, maxN);
        const url2 = results[url2i].url;
        //
        const url3i = 2; //randomInt(1, maxN);
        const url3 = results[url3i].url;
        const url4i = 3; //randomInt(1, maxN);
        const url4 = results[url4i].url;
        const url5i = 4; //randomInt(1, maxN);
        const url5 = results[url5i].url;
        const url6i = 5; //randomInt(1, maxN);
        const url6 = results[url6i].url;
        const url7i = 6; //randomInt(1, maxN);
        const url7 = results[url7i].url;
        const url8i = 7; //randomInt(1, maxN);
        const url8 = results[url8i].url;
        const url9i = 8; //randomInt(1, maxN);
        const url9 = results[url9i].url;
        const url10i = 9; //randomInt(1, maxN);
        const url10 = results[url10i].url;

        let avatar = message.author.avatarURL({
          dynamic: true,
          format: "png",
          size: 1024
        });
        let icon = message.guild.iconURL({
          dynamic: true,
          format: "png",
          size: 1024
        });

        const page1 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url1);

        const page2 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url2);

        const page3 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url3);

        const page4 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url4);

        const page5 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url5);

        const page6 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url6);

        const page7 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url7);

        const page8 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url8);

        const page9 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url9);

        const page10 = new Discord.MessageEmbed()
          .setColor("#244864")
          .setAuthor(`${message.author.username}`, avatar)
          .setTitle(`Image Search`)
          .setDescription("Resultados para: `" + escolha + "`")
          .setImage(url10);

        const pages = [
          page1,
          page2,
          page3,
          page4,
          page5,
          page6,
          page7,
          page8,
          page9,
          page10
        ];

        const embedPages = new DiscordPages({
          pages: pages,
          channel: message.channel,
          restricted: user => user.id === message.author.id
        });
        embedPages.createPages();
      }
    }
  }
};
