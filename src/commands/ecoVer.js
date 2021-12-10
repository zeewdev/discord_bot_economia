const { Client, CommandInteraction, ApplicationCommandOptionData } = require('discord.js');
const { economia, banco, embed } = require('../config');

module.exports = {
	name: 'economia',
	description: 'Comandos de economia',

	/**
	 * @type {ApplicationCommandOptionData[]}
	 */
	options: [
		{
			name: 'ver',
			description: 'Ver el dinero de un usuario',
			type: 'SUB_COMMAND',
			options: [
				{
					description: 'Selecciona un usuario',
					name: 'user',
					type: 'USER',
					required: false
				}
			]
		},
		{
			name: 'agregar',
			description: 'Agregar dinero a un usuario',
			type: 'SUB_COMMAND',
			options: [
				{
					description: 'Selecciona un usuario',
					name: 'user',
					type: 'USER',
					required: true
				},
				{
					description: 'Selecciona una cantidad',
					name: 'cantidad',
					type: 'INTEGER',
					required: true
				}
			]
		},
		{
			name: 'quitar',
			description: 'Quitar dinero a un usuario',
			type: 'SUB_COMMAND',
			options: [
				{
					description: 'Selecciona un usuario',
					name: 'user',
					type: 'USER',
					required: true
				},
				{
					description: 'Selecciona una cantidad',
					name: 'cantidad',
					type: 'INTEGER',
					required: true
				}
			]
		},
		{
			name: 'comprar',
			description: 'Comprar un item',
			type: 'SUB_COMMAND',
			options: [
				{
					description: 'La ID del item',
					name: 'id',
					type: 'STRING',
					required: true
				}
			]
		}
	],
	/**
	 *
	 * @param {Client} client
	 * @param {CommandInteraction} int
	 */
	async zeewRun(client, int) {
		const comando = int.options.getSubcommand();

		if (comando == 'ver') {
			const usuario = int.options.getUser('user') || int.user;

			const verEco = await economia.ver(usuario.id, int.guildId);
			const verBanco = await banco.ver(usuario.id, int.guildId);
			const embedMessage = embed(
				`${usuario.username}`,
				`• Dinero: ${verEco} \n • Banco: ${verBanco} `
			);
			return int.reply({ embeds: [embedMessage] });
		}

		if (comando == 'agregar') {
			const usuario = int.options.getUser('user');
			const agregar = int.options.getInteger('cantidad');

			if (!int.memberPermissions.has('ADMINISTRATOR'))
				return int.reply(
					'No tienes permisos para usar este comando, debes ser administrador'
				);
			const verEco = await economia.ver(usuario.id, int.guildId);
			const agregarEco = await economia.agregar(usuario.id, int.guildId, agregar);
			console.log({
				verEco,
				agregarEco: agregar
			});
			const embedMessage = embed(
				`${usuario.username}`,
				`• Dinero agregado: ${agregar} \n • Dinero: ${verEco} \n • Actual Dinero: ${agregarEco}`
			);
			return int.reply({ embeds: [embedMessage] });
		}

		if (comando == 'quitar') {
			const usuario = int.options.getUser('user');
			const quitar = int.options.getInteger('cantidad');

			if (!int.memberPermissions.has('ADMINISTRATOR'))
				return int.reply(
					'No tienes permisos para usar este comando, debes ser administrador'
				);
			const verEco = await economia.ver(usuario.id, int.guildId);
			const quitarEco = await economia.remover(usuario.id, int.guildId, quitar);
			const embedMessage = embed(
				`${usuario.username}`,
				`• Dinero removido: ${quitar} \n • Dinero: ${verEco} \n • Nuevo Dinero: ${quitarEco}`
			);
			return int.reply({ embeds: [embedMessage] });
		}

		if (comando == 'comprar') {
		}
	}
};
