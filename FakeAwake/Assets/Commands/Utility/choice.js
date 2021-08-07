const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'choice',
    description: 'Pick a random item in a list',
    execute(msg, args) {
        var entities = msg.content.replace('.choice ', '').split(',');

        if (entities.length > 0) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Choice')
                .setColor(Status.StatusColor('OK'))
                .addFields(
                    { name: 'Entites', value: entities.join('\n') },
                    { name: 'Choice', value: entities[Random.RandInt(0, entities.length)] }
                )
                .setFooter('I make desicions for you since you can\'t decide for yourself')
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'choice {comma seperated list]', value: 'Picks a random item from a given list.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}