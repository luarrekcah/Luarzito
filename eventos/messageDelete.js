const db = require("quick.db"); 
const Discord = require("discord.js");

module.exports = async (bot, message) => {
  if (message.partial) await message.fetch();
  
  if (!message.guild || message.channel.type === "dm") return;
  
  if (message.author.bot || message.author === bot.user) return;
  
  
  db.set(`msgdeletada.${message.guild.id}.content`, message.content);
  
  db.set(`msgdeletada.${message.guild.id}.user`, message.author.id);
  
  db.set(`msgdeletada.${message.guild.id}.channel`, message.channel.id);
  
  setTimeout(() => {
    db.delete(`msgdeletada.${message.guild.id}`);
  }, 60000) 
}