const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');

module.exports = {
    name: 'howdrunk',
    description: 'You ever just wanted to know how drunk someone is?',
    execute(msg, args) {
        if (msg.mentions.members.size) {
            msg.mentions.members.forEach(user =>
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Drunk Check')
                    .setColor('#000000')
                    .attachFiles(['./Assets/Images/Wine.png'])
                    .setThumbnail('attachment://Wine.png')
                    .addFields(
                        { name: user.displayName, value: Random.RandInt(0, 101) + '% drunk' }
                    )
                ));
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'howdrunk {@username} [@username2] [@username3]...', value: 'Returns how drunk the mentioned user(s) is.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}