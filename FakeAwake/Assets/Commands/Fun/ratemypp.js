const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'ratemypp',
    description: 'PP Rater (does not make your PP bigger tho :(',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('PP Rater')
                    .setColor('#ff0000')
                    .attachFiles(['./Assets/Images/awakeGasm.png'])
                    .setThumbnail('attachment://awakeGasm.png')
                    .addFields(
                        { name: user.displayName, value: Random.RandInt(0, 101) + '% PP Rating' }
                    )
                ));
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: prefix + 'ratemypp  {@username} [@username2] [@username3]...', value: 'How good is your PP.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}