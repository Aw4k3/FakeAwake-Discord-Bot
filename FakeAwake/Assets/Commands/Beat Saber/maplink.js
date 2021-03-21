const Discord = require('discord.js');
const Status = require('../../include/status.js');

module.exports = {
    name: 'maplink',
    description: 'Gets link to the specified bsr code.',
    execute(msg, args) {
        if (args[2]) {
            msg.channel.send('https://beatsaver.com/beatmap/' + args[2]);
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('BeatSaver Map Linker Grabber')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'bs maplink {map id}', value: 'Makes a link you can click to take you to the map you desire. This command was made by an idiot and is not idiot proof so you can put what ever you want as the id' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}