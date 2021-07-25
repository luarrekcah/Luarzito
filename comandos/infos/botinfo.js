const Discord = require("discord.js");
const moment = require("moment");

moment.locale("pt-br");

module.exports.run = async function(bot, message, argumentos) {
  if (!message.guild.me.permissions.has("EMBED_LINKS"))
      return message.channel.send(
        ":warning: Eu estou sem permissão de `EMBED_LINKS` para continuar"
      );
  const inline = true;
  const botAvatar = bot.user.displayAvatarURL();
  const date = bot.user.createdAt;
  const userName = bot.user.username;
  const servsize = bot.guilds.cache.size;
  const usersize = bot.users.cache.size;
  const dev = bot.users.cache.get('701953428510736396');
  let totalSeconds = bot.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  let uptime = ` <:calendario:770011791869870140>${days.toFixed()} dias\n <:calendario:770011791869870140>${hours.toFixed()} horas\n <:calendario:770011791869870140>${minutes.toFixed()} minutos\n <:calendario:770011791869870140>${seconds.toFixed()} segundos`;

  const status = {
    online: "```🟢 Online```",
    offline: "`⚫` Offline"
  };
  
  const comandosQuantia = require("./comandos");
  
  console.log(comandosQuantia.length);

  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(botAvatar)
    .setAuthor("Minhas informações")
    .addField("**Meu nick:**", `<:bot:758336362989486120>`+userName)
    .addField("**Meu ID:**", bot.user.id)
    .addField("**Servidores:**", `🛡 ${servsize}`, true)
    .addField("**Usuários:**", `<:membros:761200841184772096>${usersize}`, inline)
    .addField("**Estou online a:**", uptime)
    .addField("**Criado em**", formatDate("DD/MM/YYYY, às HH:mm:ss", date))
  .addField("**Desenvolvedor:**", `${dev.username}\nID: ${dev.id}`) //<:DesenvolvedorVerificado:745484731495350343>
    .setFooter(`2020 © ${bot.user.username} | ${dev.username} `)
    .setTimestamp();

  if (bot.user.presence.status) {
    embed.addField(
      "**Status**",
      `${status[bot.user.presence.status]}`,
      inline,
      true
    );
  }

  message.channel.send(embed);
};

function formatDate(template, date) {
  var specs = "YYYY:MM:DD:HH:mm:ss".split(":");
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4);
  return date
    .toISOString()
    .split(/[-:.TZ]/)
    .reduce(function(template, item, i) {
      return template.split(specs[i]).join(item);
    }, template);
}
