const { Client, Collection, Intents } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
const config = require('./config.js');
const zeewEco = require('zeew-eco');
new zeewEco.Options(config.URL) // si tiene ya una conexion con mongoose, eliminar esta linea

const ZeewEconomi = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS] });
ZeewEconomi.commands = new Collection();
ZeewEconomi.config = config

// Load commands
const fileCommands = readdirSync(join(__dirname, 'commands'));
for (const file of fileCommands) {
    const command = require(join(__dirname, 'commands', file));
    ZeewEconomi.commands.set(command.name, command);
}

// Load events
const fileEvents = readdirSync(join(__dirname, 'events'));
for (const file of fileEvents) {
    const event = require(join(__dirname, 'events', file));
    ZeewEconomi.on(event.name, (...args) => event.zeewRun(ZeewEconomi, ...args));
}

ZeewEconomi.login(config.TOKEN);