const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
   if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const user = message.mentions.users.first() || message.author;
  if (message.guild.me.permissions.has("MANAGE_SERVER")) {
    message.guild.fetchInvites().then(invites => {
      var userInvites = invites.array().filter(o => o.inviter.id === user.id);
      var userInviteCount = 0;
      for (var i = 0; i < userInvites.length; i++) {
        var invite = userInvites[i];
        userInviteCount += invite["uses"];
      }
      const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`O usuário ${user.tag} tem ${userInviteCount} invites!`);
      message.channel.send(embed);
    });
  } else {
    message.channel.send(
      "<a:alerta:758339902386733098> | Não tenho perms suficiente, preciso de `ADMINISTRATOR`!"
    );
  }
};
