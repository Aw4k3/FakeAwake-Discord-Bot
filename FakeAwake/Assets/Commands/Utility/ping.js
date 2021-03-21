const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'ping',
    description: 'Returns bot and API latency',
    execute(msg, args, client) {
        msg.channel.send(new Discord.MessageEmbed()
            .addFields(
                { name: 'Waiting for response', value: 'Waiting for response' }
            )
        ).then(PreMessage => {
            var BotLatency = PreMessage.createdTimestamp - msg.createdTimestamp;
            PreMessage.edit(
                new Discord.MessageEmbed()
                    .setTitle('Pong!')
                    .setColor(Status.StatusColor('OK'))
                    .addFields(
                        { name: 'Bot Latency', value: BotLatency + ' ms' },
                        { name: 'API Latency', value: client.ws.ping + ' ms' }
                    )
                    .setFooter("Latency Info")
            )
        });

        return true;
    }
}