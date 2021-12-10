const { Client, Interaction } = require('discord.js');
const { economia, banco, embed } = require('../config');
module.exports = {
    name: 'economia',
    description: 'Comandos de economia',
    /**
    *
    * @param {Client} client 
    * @param {Interaction} int 
    */
    options: [
        {
            name: 'user',
            description: 'Ver el dinero de un usuario',
            type: 6,
        },
        {
            name: 'agregar',
            description: 'Agregar dinero a un usuario',
            type: 10,
        },
        {
            name: 'quitar',
            description: 'Quitar dinero a un usuario',
            type: 10,
        },
        {
            name: 'comprar',
            description: 'Comprar un item',
            type: 3,
        }
    ],
    /**
     * 
     * @param {Client} client 
     * @param {Interaction} int 
     */
    async zeewRun(client, int) {

        const ver = int.options.get('ver');
        const agregar = int.options.get('agregar');
        const quitar = int.options.get('quitar');
        const comprar = int.options.get('comprar');

        if (!ver && agregar) return int.reply('Necesitas mencionar a un usuario para agregarle dinero');
        if (!ver && quitar) return int.reply('Necesitas mencionar a un usuario para quitarle dinero');
        if (!ver && comprar) return int.reply('Necesitas mencionar a un usuario para comprar un item');

        if (ver && agregar) {
            if (!int.memberPermissions.has('ADMINISTRATOR')) return int.reply('No tienes permisos para usar este comando, debes ser administrador')
            const verEco = await economia.ver(ver.user.id, int.guildId)
            const agregarEco = await economia.agregar(ver.user.id, int.guildId, agregar.value)
            console.log({
                verEco,
                agregarEco: agregar.value
            });
            const embedMessage = embed(`${ver.user.username}`, `• Dinero agregado: ${agregar.value} \n • Dinero: ${verEco} \n • Actual Dinero: ${agregarEco}`);
            return int.reply({ embeds: [embedMessage] });
        }

        if (ver && quitar) {
            if (!int.memberPermissions.has('ADMINISTRATOR')) return int.reply('No tienes permisos para usar este comando, debes ser administrador')
            const verEco = await economia.ver(ver.user.id, int.guildId)
            const quitarEco = await economia.remover(ver.user.id, int.guildId, quitar.value)
            const embedMessage = embed(`${ver.user.username}`, `• Dinero removido: ${quitar.value} \n • Dinero: ${verEco} \n • Nuevo Dinero: ${quitarEco}`);
            return int.reply({ embeds: [embedMessage] });
        }

        if (ver) {
            const verEco = await economia.ver(ver.user.id, int.guildId)
            const verBanco = await banco.ver(ver.user.id, int.guildId)
            const embedMessage = embed(`${ver.user.username}`, `• Dinero: ${verEco} \n • Banco: ${verBanco} `);
            return int.reply({ embeds: [embedMessage] });
        }

        int.reply('Comandos de economia');
    }
}