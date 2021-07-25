const Discord = require("discord.js");

module.exports.run = async (bot, message, argumentos) => {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const embed = new Discord.MessageEmbed()
    .setTitle("Patentes do no-fap")
    .setColor("PURPLE")
    .addFields(
      {
        name: "Monge :infinity:",
        value: "30 Dias"
      },
      {
        name: "Rei :crown: ",
        value: "29 Dias"
      },
      {
        name: "General de Exército :star: :star: :star:",
        value: "28 Dias"
      },
      {
        name: "Coronel :star:",
        value: "27 Dias"
      },
      {
        name: "Major :military_medal: :military_medal: :military_medal:",
        value: "26 Dias"
      },
      {
        name: "Capitão  :military_medal: :military_medal:",
        value: "25 Dias"
      },
      {
        name: "Primeiro Tenente :military_medal: ",
        value: "24 Dias"
      },
      {
        name: "Segundo Tenente :medal: ",
        value: "21-23 Dias"
      },
      {
        name: "Aspirante a Oficial :fleur_de_lis: :fleur_de_lis: ",
        value: "16-20 Dias"
      },
      {
        name: "Subtenente :fleur_de_lis: ",
        value: "14-15 Dias"
      },
      {
        name: "Primeiro Sargento :first_place: ",
        value: "11-13 Dias"
      },
      {
        name: "Segundo Sargento :second_place: ",
        value: "6-10 Dias"
      },
      {
        name: "Terceiro Sargento :third_place: ",
        value: "3-5 Dias"
      },
      {
        name: "Cabo :reminder_ribbon: ",
        value: "2 Dias"
      },
      {
        name: "Soldado :running_shirt_with_sash:",
        value: "1 Dia"
      }
    );
  message.channel.send(embed);
};
