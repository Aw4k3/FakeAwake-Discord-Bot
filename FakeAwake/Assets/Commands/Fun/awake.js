const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'awake',
    description: 'Returns links to Awake\'s stuff',
    execute(msg, args) {
        msg.channel.send(new Discord.MessageEmbed()
            .setTitle('Awake\'s Links')
            .setColor(Status.StatusColor('OK'))
            .setURL('https://www.twitch.tv/awake_live')
            .addFields(
                { name: 'Twitch', value: 'https://www.twitch.tv/awake_live' },
                { name: 'YouTube', value: 'https://www.youtube.com/channel/UCIaFBHd0AOddEhocuG3YB5g' }
            )
            .setFooter('Hint: You should follow Awake on Twitch so you don\'t miss a stream')
        );

        return true;
    }
}