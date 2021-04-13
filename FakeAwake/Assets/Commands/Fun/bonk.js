const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'bonk',
    description: 'bonk',
    execute(msg, args) {
        if (msg.mentions.users.size) {
            msg.mentions.users.forEach(user => { msg.channel.send(user.user + ' was bonked by ' + msg.author.member); });
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'bonk  {@username} [@username2] [@username3]...', value: 'Bonks the entered users.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}