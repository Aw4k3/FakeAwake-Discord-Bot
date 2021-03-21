const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'love',
    description: 'loveometer',
    execute(msg, args) {
        if (args.length > 1) {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Loveometer')
                .setColor('#ff00c3')
                .attachFiles(['./Assets/Images/LoveIcon.png'])
                .setThumbnail('attachment://LoveIcon.png')
                .addFields(
                    { name: `${msg.author.username} x ${msg.content.replace('.love ', '')}`, value: `Share ${Random.RandInt(0, 101)}% love. UwU.` }
                )
            );
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'love {Subject}', value: 'Returns how much you love something or someone.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}