const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'howsus',
    description: 'You ever just wanted to know how sus someone is?',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Sus Check')
                    .setColor(Status.StatusColor('OK'))
                    .attachFiles(['./Assets/Images/MissingTexture.png'])
                    .setThumbnail('attachment://MissingTexture.png')
                    .addFields(
                        { name: user.displayName, value: Random.RandInt(0, 101) + '% sus' }
                    )
                ));
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'howsus {@username} [@username2] [@username3]...', value: 'Returns how sus the mentioned user is.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}