const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'chokeMePlz',
    description: 'choke',
    execute(msg, args) {
        if (msg.mentions.users.size) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('ChokeMePlz')
                .setDescription(msg.mentions.users.array().join('\n'))
                .setFooter(`Calling these people to choke you!`)
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('ChokeMePlz')
                .setColor(Status.StatusColor('OK'))
                .setDescription(`${msg.author} was choked!`)
            );
        }

        return true;
    }
}