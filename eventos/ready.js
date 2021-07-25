const firebase = require("firebase");
const DBL = require("dblapi.js");
module.exports = async bot => {

  const database = firebase.database();
  console.log(
    "Estou pronto para ser usado \nAtivo em " +
      bot.channels.cache.size +
      " canais (geral) e " +
      bot.guilds.cache.size +
      " servidores"
  );

  const dbl = new DBL(process.env.topggTOKEN, bot);

  setInterval(() => {
    dbl.postStats(
      bot.guilds.cache.size 
    );
  }, 1800000);

  const channel = await bot.channels.cache.get("792377178834337882");

  const channel_Privado = await bot.channels.cache.get("757308101182357518");

  const aviso =
    "<a:alerta:758339902386733098> | Sistema reiniciado com sucesso";

  channel.send(aviso);
  channel_Privado.send(aviso);

  const avatares = [
    /*Tema normal*/ "https://cdn.glitch.com/3e9845c4-e236-46fa-831d-a4f8e76aa207%2FLuarzito-icone.jpg?v=1618495057872"
    /*Tema natal*/ // "https://cdn.discordapp.com/attachments/742068003583295623/785218721987166228/SPOILER_luarzito_natal.png"
  ];

  const status = [
    "online"
    // "dnd",
    // "idle"
  ];

  const atividadesOri = [
    ["vocês <3", "LISTENING"],
    [bot.users.cache.size + " usuários", "LISTENING"],
    [`me mencione para ver o prefíxo`, "PLAYING"],
    [bot.channels.cache.size + " canais!", "WATCHING"],
    [bot.guilds.cache.size + " servidores!", "WATCHING"]
  ];

  const atividades = [
    [`lz. | ${bot.guilds.cache.size} servidores!`, "WATCHING"],
     [`em breve, dashboard!`, "STREAMING"]//,
  ];

  setInterval(async () => {
    // controlar o intervalo
    let i = Math.floor(Math.random() * atividades.length + 1) - 1;
    await bot.user.setActivity(atividades[i][0], { type: atividades[i][1]});
  }, 10000); // intervalo

  setInterval(async () => {
    let b = Math.floor(Math.random() * status.length + 1) - 1;
    await bot.user.setStatus(status[b]);
  }, 20000);

  setInterval(async () => {
    let c = Math.floor(Math.random() * avatares.length + 1) - 1;
    await bot.user.setAvatar(avatares[c]);
  }, 400000);

  let slashes = [];
   bot.interactions
    .createCommand({
      name: "ajuda",
      description: "Está em dúvida sobre o bot? Tente este comando!",
    })
    .then(slashes += "ajuda" + ", ")
    .catch(console.error);
  console.log("Os slashes: "+slashes + " foram carregados")
  const p1 = bot.users.cache.get("701953428510736396");
  const p2 = bot.users.cache.get("666382842338607134");
  const p3 = bot.users.cache.get("740298343783202865");

  const staffCards = database.ref(`Staff`);
  staffCards.once("value").then(async function(db) {
    if (db.val() == null) {
      staffCards.set({
        p1: {
          nome: p1.username,
          avatar: p1.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p1.discriminator
        },
        p2: {
          nome: p2.username,
          avatar: p2.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p2.discriminator
        },
        p3: {
          nome: p3.username,
          avatar: p3.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p3.discriminator
        }
      });
    } else {
      staffCards.update({
        p1: {
          nome: p1.username,
          avatar: p1.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p1.discriminator
        },
        p2: {
          nome: p2.username,
          avatar: p2.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p2.discriminator
        },
        p3: {
          nome: p3.username,
          avatar: p3.avatarURL({ dynamic: true, format: "png", size: 1024 }),
          discriminador: p3.discriminator
        }
      });
    }
  });
};
