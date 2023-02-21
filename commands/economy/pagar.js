const { SlashCommandBuilder } = require('@discordjs/builders');
const { updateItem, getItems } = require('../../database');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pagar')
		.setDescription(
			'Está devendo alguém? Use esse comando!',
		)
		.addUserOption(option =>
			option
				.setName('usuario')
				.setDescription('Selecine para quem você deseja enviar Lennies')
				.setRequired(true),
		)
		.addNumberOption(option =>
			option
				.setName('valor')
				.setDescription('Digite o valor que quer enviar.')
				.setRequired(true),
		),
	async execute(interaction) {
		const dest = interaction.options.getMember('usuario');
		const value = interaction.options.getNumber('valor');

		if (dest.user.id === interaction.user.id) {
			return interaction.reply({
				content: 'Você não pode movimentar dinheiro a si mesmo.',
			});
		}

		const moneyDest = await getItems({ path: `users/${dest.user.id}/economy` });
		const moneyUser = await getItems({ path: `users/${interaction.user.id}/economy` });

		updateItem({
			path: `users/${dest.user.id}/economy`,
			params: {
				money: moneyDest.money + value,
			},
		});

		updateItem({
			path: `users/${interaction.user.id}/economy`,
			params: {
				money: moneyUser.money - value,
			},
		});

		return interaction.reply({
			content: `Você enviou L$${value} para <@${dest.user.id}>. Saldo atual: L$${moneyUser.money - value}`,
		});
	},
};