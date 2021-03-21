const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'roll',
    description: 'Returns a random number between 0 and 100.',
    execute(msg, args) {
        msg.reply('you rolled a ' + Random.RandInt(0, 101));

        return true;
    }
}