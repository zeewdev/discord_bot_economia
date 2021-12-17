// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js');
const { IDGUILD } = require('../config')

module.exports = {
    name: "ready",
    description: "Evento ready",
    /**
     * 
     * @param {Client} client 
     */
    zeewRun: async (client) => {
        try {
            const bot = client.user;
            const commands = client.commands.map(c => c);
            console.log({ commands, guild: await client.guilds.resolve(IDGUILD).commands.fetch() });

            // client.guilds.resolve(IDGUILD).commands.set([])

            if ((await client.guilds.resolve(IDGUILD).commands.fetch()).size === 0) {
                client.guilds.resolve(IDGUILD).commands.create(commands[0])
            } else {
                client.guilds.resolve(IDGUILD).commands.set(commands)
            }

            console.log(`${bot.username} está online!`);
        } catch (error) {
            console.log(error);
        }
    }
}