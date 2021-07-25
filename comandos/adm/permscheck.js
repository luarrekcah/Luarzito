//checar permissoes do bot

/*


manage messages
kick / ban members
manage channels
manage server
embed links / links
*/

const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  let per = [];

  if (message.guild.me.permissions.has("BAN_MEMBERS")) {
    per.push("```css\n✅ BAN_MEMBERS```");
  } else {
    per.push(":x: `BAN_MEMBERS` (necessário para banir usuários)");
  }
  
  if (message.guild.me.permissions.has("KICK_MEMBERS")) {
    per.push("```css\n✅ KICK_MEMBERS```");
  } else {
    per.push(":x: `KICK_MEMBERS` (necessário para chutar usuários)");
  }
  
  if (message.guild.me.permissions.has("MANAGE_CHANNELS")) {
    per.push("```css\n✅ MANAGE_CHANNELS```");
  } else {
    per.push(":x: `MANAGE_CHANNELS` (necessário para gerenciar os canais)");
  }
  
  if (message.guild.me.permissions.has("MANAGE_GUILD")) {
    per.push("```css\n✅ MANAGE_GUILD```");
  } else {
    per.push(":x: `MANAGE_GUILD` (necessário para gerenciar servidor)");
  }
  
  if (message.guild.me.permissions.has("MANAGE_MESSAGES")) {
    per.push("```css\n✅ MANAGE_MESSAGES```");
  } else {
    per.push(":x: `MANAGE_MESSAGES` (necessário para gerenciar mensagens)");
  }
  
  if (message.guild.me.permissions.has("ADD_REACTIONS")) {
    per.push("```css\n✅ ADD_REACTIONS```");
  } else {
    per.push(":x: `ADD_REACTIONS` (necessário para confirmações)");
  }
  
  if (message.guild.me.permissions.has("EMBED_LINKS")) {
    per.push("```css\n✅ EMBED_LINKS```");
  } else {
    per.push(":x: `EMBED_LINKS` (necessário para embeds gerais)");
  }
  
  if (message.guild.me.permissions.has("ATTACH_FILES")) {
    per.push("```css\n✅ ATTACH_FILES```");
  } else {
    per.push(":x: `ATTACH_FILES` (necessário para perfil, ping...)");
  }
  
  if (message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS")) {
    per.push("```css\n✅ USE_EXTERNAL_EMOJIS```");
  } else {
    per.push(":x: `USE_EXTERNAL_EMOJIS` (emojis do desenvolvedor)");
  }
  
  if (message.guild.me.permissions.has("MANAGE_EMOJIS")) {
    per.push("```css\n✅ MANAGE_EMOJIS```");
  } else {
    per.push(":x: `MANAGE_EMOJIS` (gerenciar emojis)");
  }
  
  if (message.guild.me.permissions.has("MANAGE_ROLES")) {
    per.push("```css\n✅ MANAGE_ROLES```");
  } else {
    per.push(":x: `MANAGE_ROLES` (gerenciar cargos, criação de cargo e comando mute...)");
  }
  
  const embed = new Discord.MessageEmbed()
    .setTitle("Perms check")
    .setDescription(per);
  if (message.guild.me.permissions.has("EMBED_LINKS")) {
    message.channel.send(embed);
  } else {
    message.channel.send(per);
  }
};
