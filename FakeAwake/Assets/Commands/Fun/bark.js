const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'bark',
    description: 'Barks back at you.',
    execute(msg, args) {
        msg.reply('Woof Woof Motherfucker! :)');

        return true;
    }
}