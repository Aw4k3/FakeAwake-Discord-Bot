const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random.js');
const WeeWoo = require('./weewoo.js');
const FileSystem = require('fs');

module.exports = {
    name: 'howhorny',
    description: 'You ever just wanted to know how horny someone is?',
    execute(msg, args) {
        var HornyRating = 0;
        var UpperLimit = 101;
        if (msg.mentions.members.size) {
            if (msg.content.includes('-overload')) {
                UpperLimit = Number.MAX_SAFE_INTEGER;
            }
            msg.mentions.members.forEach(user => {
                //Log User
                var JObject = JSON.parse(FileSystem.readFileSync('./Assets/Data/HornyJail.json', 'utf8'));
                //console.log(JObject);
                if (!JObject['Inmates'].hasOwnProperty(user.user.username)) {
                    JObject['Inmates'][user.user.username] = 1;
                    console.log('[JSON] Logged ' + user.user.username + 'to ./Assets/Data/HornyJail.json with value' + JObject['Inmates'][user.user.username]);
                } else {
                    JObject['Inmates'][user.user.username] = JObject['Inmates'][user.user.username] + 1;
                }

                //Rating
                HornyRating = Random.RandInt(0, UpperLimit);
                msg.channel.send(new Discord.MessageEmbed()
                    .setTitle('Horny Check')
                    .setColor('#ff00c3')
                    .attachFiles(['./Assets/Images/awakeGasm.png'])
                    .setThumbnail('attachment://awakeGasm.png')
                    .addFields(
                        { name: user.displayName, value: HornyRating + '% horny' }
                    )
                );
                if (args[2] === '-trial' && HornyRating > parseInt(args[3])) {
                    WeeWoo.execute(msg, args);
                }
            });
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Usage')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'howhorny  {@username} [@username2] [@username3]...', value: 'Returns how horny the mentioned user is.' }
                )
                .setFooter(Status.InvalidCommandMessage())
            );
        }

        return true;
    }
}