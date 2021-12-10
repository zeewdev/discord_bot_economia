const { Client } = require('discord.js');
const { IDGUILD } = require('../config');

module.exports = {
	name: 'ready',
	description: 'Evento ready',
	/**
	 *
	 * @param {Client} client
	 */
	zeewRun: async client => {
		const bot = client.user;
		const commands = client.commands.map(c => c);

		// if ((await client.guilds.resolve(IDGUILD).commands.fetch()).size === 0) {
		//     client.guilds.resolve(IDGUILD).commands.create(commands)
		// } else {
		client.guilds.resolve(IDGUILD).commands.set(commands);
		// }

		console.log(`${bot.username} está online!`);
	}
};
