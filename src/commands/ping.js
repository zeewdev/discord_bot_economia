const { Client, Interaction } = require('discord.js');
module.exports = {
    name: "ping",
    description: "Ping!",
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} int 
     */
    zeewRun(client, int) {
        int.reply("Pong!");
    }
}