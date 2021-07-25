const Discord = require("discord.js");
module.exports = async (bot, oldMember, newMember) => {
  /*if (oldMember.user.bot) return;
      let modlog = oldMember.guild.channels.find(channel => channel.name == row.logschannel);
       if (!modlog) return;
       
      if (oldMember.roles.size !== newMember.roles.size) {
          if (oldMember.roles.size > newMember.roles.size) {
              //Taken
              let dif = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first()
              const embed = new Discord.RichEmbed()
              .setColor(0x00A2E8)
              .setThumbnail(newMember.user.avatarURL)
              .addField("User", `${newMember.user.tag} (ID: ${newMember.user.id})`)
              .addField("Role Taken:", `${dif.name}`)
              .setTimestamp()
              client.channels.get(modlog.id).send(embed);
          } else if (oldMember.roles.size < newMember.roles.size) {
              //Given
              let dif = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first()
              const embed2 = new Discord.RichEmbed()
              .setColor(0x00A2E8)
              .setThumbnail(newMember.user.avatarURL)
              .addField("User ", `${newMember.user.tag} (ID: ${newMember.user.id})`)
              .addField("Role Given:", `${dif.name}`)
              .setTimestamp()
              client.channels.get(modlog.id).send(embed2);
          } else if (oldMember.nickname !== newMember.nickname) {
              const embed3 = new Discord.RichEmbed()
              .setColor(0x00A2E8)
              .setThumbnail(newMember.user.avatarURL)
              .addField("User ", `${newMember.user.tag} (ID: ${newMember.user.id})`)
              .addField("New Nickname:", `${newMember.nickname}`)
              .setTimestamp()
              client.channels.get(modlog.id).send(embed3);
            
            
          }
      }*/
};
