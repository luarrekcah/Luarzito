const Discord = require("discord.js");
const { letterTrans } = require("custom-translate");
exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const tipo = argumentos[0];

  if (!tipo) {
    const embed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Nickname generator")
      .addFields(
        {
          name: "Fontes:",
          value: `lznickgen flip <nick> : ɐqɔpǝ \n lznickgen q <nick> : ᴀʙᴄᴅᴇ`
        },
        {
          name: "Decorações:",
          value: `lznickgen w <nick> : ꧁nick꧂ \n \n lznickgen g <nick> : 𒅒nick𒅒 \n \n lznickgen t <nick> : ✠ nick ✠ \n \n  `
        },
        {
          name: "Decorações completas:",
          value: `lznickgen 1 <nick> : ꧁ঔৣ☬✞nick✞☬ঔৣ꧂ \n \n lznickgen 2 <nick> : ꧁༺nick༻꧂\n \n lznickgen 3 <nick> : ꧁ඇెৡึ☫♆nick♆☫ৡึెඇ꧂\n \n lznickgen 4 <nick> : ★彡[nick]彡★ \n \n lznickgen 5 <nick> : ꧁࿇🔥nick☄️࿇꧂ \n \n lznickgen 6 <nick> : ✞ঔৣ۝nick۝ঔৣ✞\n \n lznickgen 7 <nick> : ꧁࿇nick࿇꧂ \n \n`
        }
      );
    message.channel.send(embed);
  }

  if (tipo === "flip") {
    var dictionary = {
      a: "ɐ",
      b: "q",
      c: "ɔ",
      d: "p",
      e: "ǝ",
      f: "ɟ",
      g: "ƃ",
      h: "ɥ",
      i: "ᴉ",
      j: "ɾ",
      k: "ʞ",
      m: "ɯ",
      n: "u",
      p: "d",
      q: "b",
      r: "ɹ",
      t: "ʇ",
      u: "n",
      v: "ʌ",
      w: "ʍ",
      y: "ʎ",
      A: "∀",
      C: "Ɔ",
      E: "Ǝ",
      F: "Ⅎ",
      G: "פ",
      J: "ſ",
      L: "˥",
      M: "W",
      P: "Ԁ",
      T: "┴",
      U: "∩",
      V: "Λ",
      W: "M",
      Y: "⅄",
      "1": "Ɩ",
      "2": "ᄅ",
      "3": "Ɛ",
      "4": "ㄣ",
      "5": "ϛ",
      "6": "9",
      "7": "ㄥ",
      "9": "6",
      ",": "'",
      ".": "˙",
      "'": ",",
      '"': ",,",
      _: "‾",
      "&": "⅋",
      "!": "¡",
      "?": "¿",
      "`": ","
    };
    let text = argumentos.slice(1).join(" ");
    const converted = letterTrans(text, dictionary);
    message.channel.send(converted);
  }

  if (tipo === "q") {
    var dictionary = {
      a: "ᴀ",
      b: "ʙ",
      c: "ᴄ",
      d: "ᴅ",
      l: "ʟ",
      L: "ʟ",
      e: "ᴇ",
      s: "ꜱ",
      S: "ꜱ",
      o: "ᴏ",
      O: "ᴏ",
      f: "ꜰ",
      g: "ɢ",
      h: "ʜ",
      i: "ɪ",
      j: "ᴊ",
      k: "ᴋ",
      m: "ᴍ",
      n: "ɴ",
      p: "ᴘ",
      q: "Q",
      r: "ʀ",
      t: "ᴛ",
      u: "ᴜ",
      v: "ᴠ",
      w: "ᴡ",
      y: "ʏ",
      x: "x",
      X: "x",
      A: "∀",
      Z: "ᴢ",
      z: "ᴢ"
    };
    let text = argumentos.slice(1).join(" ");
    const converted = letterTrans(text, dictionary);
    message.channel.send(converted);
  }

  //decoracoes

  if (tipo === "w") {
    let nick = argumentos.slice(1).join(" ");

    message.channel.send("꧁" + nick + "꧂");
  }

  if (tipo === "g") {
    let nick = argumentos.slice(1).join(" ");

    message.channel.send("𒅒" + nick + "𒅒");
  }
  
  if (tipo === "t") {
    let nick = argumentos.slice(1).join(" ")
    
    message.channel.send("✠" + nick + "✠")
  }
  
  
  
  //decoracoes completas
  
  if (tipo === "1") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("꧁ঔৣ☬✞" + nick + "✞☬ঔৣ꧂")
  }
  if (tipo === "2") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("꧁༺" + nick + "༻꧂")
  }
  if (tipo === "3") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("꧁ඇెৡึ☫♆" + nick + "♆☫ৡึెඇ꧂")
  }
  if (tipo === "4") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("★彡[" + nick + "]彡★")
  }
  if (tipo === "5") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("꧁࿇🔥" + nick + "☄️࿇꧂")
  }
  if (tipo === "6") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("✞ঔৣ۝" + nick + "۝ঔৣ✞")
  }
  if (tipo === "7") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("꧁࿇" + nick + "࿇꧂")
  }
  if (tipo === "8") {
    const nick = argumentos.slice(1).join(" ");
    
    message.channel.send("" + nick + "")
  }
  
  
  
  
  
  message.delete();
};
