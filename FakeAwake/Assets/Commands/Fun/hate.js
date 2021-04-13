const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'hate',
    description: 'hateometer',
    execute(msg, args) {
        var UpperLimit = 101,
            StringResult = msg.cleanContent.replace('.hate ', '');
        if (args.length > 1) {
            if (msg.content.includes('-overload')) {
                UpperLimit = Number.MAX_SAFE_INTEGER;
                StringResult = StringResult.replace('-overload', '').trim();
            }

            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Hateometer')
                .setColor('#5e6d61')
                .attachFiles(['./Assets/Images/hateIcon.png'])
                .setThumbnail('attachment://hateIcon.png')
                .addFields(
                    { name: `${msg.author.username} x ${StringResult}`, value: `Share ${Random.RandInt(0, UpperLimit)}% hate.` }
                )
                .setFooter('*Death Stare*')
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'hate [flags] {Subject}', value: 'Returns how much you hate something or someone.' },
                    { name: 'Available Flags', value: '-overload' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}