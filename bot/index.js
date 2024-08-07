const fs = require("node:fs");
const path = require("node:path");

const { Client, Collection, GatewayIntentBits } = require("discord.js");

const config = require("../shared/config.json");
const projectConfig = require("../website/config");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.commands = new Collection();
client.cooldowns = new Collection();
client.config = config;

let commandCount = 0,
  eventCount = 0;
fs.readdirSync(path.join(__dirname, "commands")).forEach((dir) => {
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "commands", dir))
    .filter((files) => files.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${dir}/${file}`);
    client.commands.set(command.data.name, command);
  }
  commandCount++;
});

console.log(`${commandCount} Comandos Carregados.`);

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
  eventCount++;
}
console.log(`${eventCount} Eventos Carregados.`);

client.login(projectConfig.bot.token);

module.exports = client;
