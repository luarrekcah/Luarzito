const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  isDev: true,
  data: new SlashCommandBuilder()
    .setName("eval")
    .setDescription("Desenvolvedor apenas")
    .addStringOption((option) =>
      option.setName("code").setDescription("Code").setRequired(true)
    ),
  execute(interaction) {
    const { client } = interaction;
    const { config } = client;
    const code = interaction.options.getString("code");
    if (interaction.user.id != config.botConfig.devId) {
      return interaction.reply({
        content: "Ei, bobinhx! Este comando é apenas para o desenvolvedor.",
        ephemeral: true,
      });
    }
    let result;
    try {
      result = eval(code);
    } catch (error) {
      return interaction.reply({
        content: `erro: ${error}`,
        ephemeral: true,
      });
    }
    return interaction.reply({
      content: `${result}`,
      ephemeral: true,
    });
  },
};
