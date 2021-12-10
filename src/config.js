const { join } = require('path');
const zeewEco = require('zeew-eco');
const { MessageEmbed } = require('discord.js');

require('dotenv').config({
    path: join(__dirname, '../.env')
});

module.exports = {
    TOKEN: process.env.TOKEN,
    PREFIX: process.env.PREFIX,
    IDGUILD: "739306480586588241",
    URL: 'mongodb://localhost:27017/zeew',
    economia: new zeewEco.Economia(),
    banco: new zeewEco.Banco(),
    tienda: new zeewEco.Tienda(),
    inventario: new zeewEco.Inventario(),
    embed: (title, desc, color = "GREEN") => {
        const embed = new MessageEmbed()
            .setColor(color)
            .setTitle(title)
            .setDescription(desc)
            .setTimestamp();
        return embed;
    }
}