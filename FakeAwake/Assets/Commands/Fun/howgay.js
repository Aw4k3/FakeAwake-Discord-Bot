const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'howgay',
    description: 'You ever just wanted to know how gay someone is?',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Gay Check')
                    .setColor(Math.floor(Math.random() * 16777215).toString(16))
                    .attachFiles(['./Assets/Images/GachiBallPride.png'])
                    .setThumbnail('attachment://GachiBallPride.png')
                    .addFields(
                        { name: user.displayName, value: Random.RandInt(0, 101) + '% gay' }
                    )
                ));
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'howgay {@username} [@username2] [@username3]...', value: 'Returns how gay the mentioned user is.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}