const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'love',
    description: 'loveometer',
    execute(msg, args) {
        var UpperLimit = 101,
            StringResult = msg.cleanContent.replace('.love ', '');
        if (args.length > 1) {
            if (msg.content.includes('-overload')) {
                UpperLimit = Number.MAX_SAFE_INTEGER;
                StringResult = StringResult.replace('-overload', '').trim();
            }

            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Loveometer')
                .setColor('#ff00c3')
                .attachFiles(['./Assets/Images/LoveIcon.png'])
                .setThumbnail('attachment://LoveIcon.png')
                .addFields(
                    { name: `${msg.author.username} x ${StringResult}`, value: `${Random.RandInt(0, UpperLimit)}% love.` }
                )
                .setFooter('*UwU*')
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'love [flags] {Subject}', value: 'Returns how much you love something or someone.' },
                    { name: 'Available Flags', value: '-overload' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}