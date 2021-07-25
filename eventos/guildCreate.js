const Discord = require("discord.js");
module.exports = async (bot, guild, message) => {
  const firebase = require("firebase");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase);
  }
  const database = firebase.database();
  let bref = database.ref(`Servidores/${guild.id}`);
  bref.once("value").then(async function(db) {
    bref.set({
      prefixo: "lz."
    });
    //const dev = bot.users.cache.get("701953428510736396");
    const channel = await bot.channels.cache.get("792376129473478666");
    const aviso = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setAuthor(
        "Adicionado em: " + guild.name,
        guild.iconURL({ dynamic: true, format: "png", size: 1024 })
      )
      .addField("ID:", guild.id)
      .addField("Dono", "<@" + guild.owner.id + ">");
    //dev.send(aviso);
    channel.send(aviso);
  });
};
