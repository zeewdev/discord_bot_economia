const { Client, Interaction } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    description: "Evento ready",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} int
     */
    zeewRun: (client, int) => {

        if (int.isCommand()) {

            try {
                const command = client.commands.get(int.commandName);
                if (!command) return int.reply('Comando no encontrado');

                command.zeewRun(client, int);
            } catch (error) {
                console.error(error);
                int.reply('Ocurrió un error');
            }

        }


    }
}