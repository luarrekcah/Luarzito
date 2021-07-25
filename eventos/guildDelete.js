const Discord = require("discord.js");
module.exports = async (bot, guild, message) => {
  const firebase = require("firebase");
  if (!firebase.apps.length) {
    firebase.initializeApp(firebase);
  }
 if(guild.name === undefined) return;
  /*bref.once("value").then(async function(db) {
    bref.delete();
  });*/
  //const dev = bot.users.cache.get("701953428510736396");
  const channel = await bot.channels.cache.get("792376129473478666");
  const aviso = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(
      "Removido de: " + guild.name,
      guild.iconURL({ dynamic: true, format: "png", size: 1024 })
    )
    .addField("ID:", guild.id);
  //dev.send(aviso);
  channel.send(aviso);
   const database = firebase.database();
  let bref = database.ref(`Servidores/${guild.id}`);
  bref.delete();
};
