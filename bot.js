//Constantes
const express = require("express");
const app = express();
const http = require("http");
const moment = require("moment");
const Discord = require("discord.js");
const bot = new Discord.Client();
const { Util } = require("discord.js");
const fs = require("fs");
const firebase = require("firebase");
const interactions = require("discord-slash-commands-client");

app.get("/", (request, response) => {
  response.sendStatus(200);
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(
    `Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`
  );
});
app.listen(process.env.PORT);

bot.Discord = Discord;
bot.util = Util;
bot.fs = fs;
bot.color = "#00b0f0";

bot.github = "https://github.com/luarrekcah/";
bot.webpage = "https://luarzito.glith.me/";
bot.inviteLink =
  "https://discordapp.com/oauth2/authorize?client_id=743841329334845530&scope=bot&permissions=2080697599";
bot.devs = ["701953428510736396", "666382842338607134"];
bot.prefixo = "lz.";

bot.emojis = {
  alerta: "<a:alerta:758339902386733098>"
};

bot.interactions = new interactions.Client(
  process.env.TOKEN,
  "743841329334845530"
);

bot.interactions
  .getCommands()
  .then(console.log)
  .catch(console.error);


var config = {
  firebaseConfig: {
    apiKey: process.env.FB_apiKey,
    authDomain: process.env.FB_authDomain,
    databaseURL: process.env.FB_databaseURL,
    projectId: process.env.FB_projectID,
    storageBucket: process.env.FB_storageBucket,
    messagingSenderId: process.env.FB_messagingSenderId,
    appId: process.env.FB_appId
  },
  checkSystem: {
    time: 60000
  }
};

firebase.initializeApp(config.firebaseConfig);

const database = firebase.database();

bot.pastas = {};
bot.listas_comandos = {};
var logcrr = "Carreguei módulos: ";
var diretórios = ["comandos"];
var pasta, subpasta;
while (diretórios.length) {
  pasta = diretórios.shift();
  try {
    let nomes_arquivos = bot.fs.readdirSync("./" + pasta + "/");
    for (let nomea of nomes_arquivos) {
      if (!nomea.endsWith(".js")) {
        diretórios.unshift(pasta + "/" + nomea);
        continue;
      }
      try {
        let código = require("./" + pasta + "/" + nomea);
        nomea = nomea.split(".")[0];
        if (bot[nomea]) console.log("Existe 2 .js de mesmo nome: " + nomea);

        bot[nomea] = código.run;
        bot.pastas[nomea] = pasta;
        logcrr += nomea + ", ";

        if (pasta.includes("comandos/")) {
          subpasta = pasta.slice(9);
          if (!bot.listas_comandos[subpasta])
            bot.listas_comandos[subpasta] = [];

          bot.listas_comandos[subpasta].push(bot.prefixo + nomea + "\n");
        }
      } catch (erro) {
        console.log(
          "##Erro ao carregar " +
            nomea +
            ": " +
            erro.message +
            " - " +
            erro.name
        );
      }
    }
  } catch (erro) {
    console.log(
      "##Erro ao ler " + pasta + ": " + erro.message,
      " - ",
      erro.name
    );
  }
}
console.log(logcrr + "carregados.");

bot.nome_eventos = [];
var logcrr = "Carreguei eventos: ";
try {
  let arquivos_eventos = bot.fs.readdirSync("./eventos/");
  for (let nomee of arquivos_eventos) {
    if (!nomee.endsWith(".js")) continue;
    try {
      let código = require("./eventos/" + nomee);
      nomee = nomee.split(".")[0]; //remove .js
      bot.on(nomee, código.bind(null, bot));
      logcrr += nomee + ", ";
      bot.nome_eventos.push(nomee);
    } catch (erro) {
      console.log(
        "##Erro ao carregar o evento " +
          nomee +
          ": " +
          erro.message +
          " - " +
          erro.name
      );
    }
  }
} catch (erro) {
  console.log("##Erro ao ler eventos! " + erro.message + " - " + erro.name);
}
console.log(logcrr + "carregados.");

console.log(logcrr.length + " comandos carregados.");

function checkSystem() {
  const cpu = Number((process.cpuUsage().system / 1024 / 1024).toFixed(2));
  if (cpu >= 90.0) {
    console.log("CPU com uso muito alto, reiniciando sistema...");
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  } else {
    console.log("Uso da CPU: " + cpu);
  }
}

setInterval(() => {
  checkSystem();
}, config.checkSystem.time);

try {
  console.log("Tentando logar na api do dc");
  bot.login(process.env.TOKEN);
} catch (e) {
  console.log("Erro ao logar na api do dc: ", e);
}
