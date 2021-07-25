const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  return message.channel.send("Comando desativado ou em desenvolvimento.");
  if (message.guild.member(message.author).hasPermission("ADMINISTRATOR")) {
    let role = message.guild.roles.cache.find(r => r.name === "Fita crepe");

    if (!role) {
      message.guild.roles.create({
        data: {
          name: "Fita crepe",
          color: "RED",
          SEND_MESSAGES: false
        },
        reason: "Cargo de mute pelo Luarzito"
      });
    }

    role = message.guild.roles.cache.find(r => r.name === "Fita crepe");

    //    role.setPermissions({ SEND_MESSAGES: false, ADD_REACTIONS: true });

    //message.channel.updateOverwrite(role, { SEND_MESSAGES : false });
    /*
    const listedChannels = [];
    message.guild.channels.forEach(channel => {
      if (channel.permissionsFor(member).has("VIEW_CHANNEL"))
        listedChannels.push(channel.name);
      channel.updateOverwrite(role, { SEND_MESSAGES: false });
    });
    */
    const channelList = message.guild.channels.cache.map(ch => {
      ch.updateOverwrite(role, { SEND_MESSAGES: false });
      console.log(ch);
    });

    let member = message.mentions.members.first();
    if (!member) {
      message.channel.send(`Selecione alguém para passar a fita!`);
    } else if (member.bot) {
      message.channel.send(
        `Eu não posso passar a fita em ${member} porque ele é um bot`
      );
    } else if (member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        `Eu não posso passar a fita em ${member} porque ele é um staff`
      );
    } else {
      member.roles.add(role);
      message.channel.send(`Passei a fita crepe em ${member}`);
    }
  } else {
    message.channel.send("Sem permissão.");
  }
};
