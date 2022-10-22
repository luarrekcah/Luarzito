const { SlashCommandBuilder } = require("@discordjs/builders"),
  gis = require("g-i-s"),
  Discord = require("discord.js"),
  config = require("../../config.json"),
  {checker} = require("../../utils/nsfw-checker"),
  { EmbedBuilder } = require('discord.js'),
  { Pagination } = require('pagination.djs');
module.exports = {
  data: new SlashCommandBuilder()
    .setName("is")
    .setDescription(
      "Image Search - Pesquise Imagens pelo nome"
    )
    .addStringOption(option =>
      option
        .setName("query")
        .setDescription("Imagem de quê você busca?")
        .setRequired(true)
    ),
  execute(interaction) {

    const escolha = interaction.options.getString("query");

    console.log('tem buceta? ' + checker('buceta'));

    if(checker(escolha) && !interaction.channel.nsfw) 
      return interaction.reply({
        content: "EPA, EPA! Essa pesquisa não pode nesse chat. Entre em um chat NSFW.",
        ephemeral: true
      });

    gis(escolha, async (error, results) => {
      const pagination = new Pagination(interaction);

      const embeds = [];

      results.forEach(item => {
        const newEmbed = new EmbedBuilder()
          .setColor(config.botConfig.themeColor)
          .setAuthor({ name: "i.s - Image Search", iconURL: config.imagesLink.infoEmbed })
          .setImage(item.url)
          .setDescription(
            `Resultados para ${escolha}`
          );
        embeds.push(newEmbed);
      });

      pagination.setEmbeds(embeds);
      pagination.setEmbeds(embeds, (embed, index, array) => {
        return embed.setFooter({ text: `Página: ${index + 1}/${array.length}` });
      });
      pagination.render();
    });
  }
};
