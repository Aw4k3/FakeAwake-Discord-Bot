const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'about',
    description: 'Returns bot infos',
    execute(msg, args, client) {
        msg.channel.send(new Discord.MessageEmbed()
            .setTitle('FakeAwake Discord Bot')
            .setColor(Status.StatusColor('OK'))
            .addFields(
                { name: 'Version', value: '2.0.4' },
                { name: 'Created On', value: 'February 24, 2021' },
                { name: 'Created By', value: 'Awake#4642' },
                { name: 'Server Count', value: client.guilds.cache.size }
            )
            .setFooter('I exist :)')
        );

        return true;
    }
}