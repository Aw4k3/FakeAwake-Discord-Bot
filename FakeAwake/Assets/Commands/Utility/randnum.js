const Discord = require('discord.js');
const Status = require('../../include/status.js');
const Random = require('../../include/random');

module.exports = {
    name: 'randnum',
    description: 'Returns a random number',
    execute(msg, args) {
        if (args[1] && args[2]) {
            var lower = parseInt(args[1]),
                upper = parseInt(args[2]),
                result = Random.RandInt(lower, upper + 1);

            switch (args[3]) {
                default:
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Generate Random Number')
                        .setColor(Status.StatusColor('OK'))
                        .addFields(
                            { name: 'Number', value: result }
                        )
                    );
                    break;

                case '-f':
                    lower = parseFloat(args[1]);
                    upper = parseFloat(args[2]);
                    result = Random.RandFloat(lower, upper + 1.0);
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Generate Random Number')
                        .setColor(Status.StatusColor('OK'))
                        .addFields(
                            { name: 'Number', value: result }
                        )
                    );
                    break;

                case '-bin':
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Generate Random Number')
                        .setColor(Status.StatusColor('OK'))
                        .addFields(
                            { name: 'Number', value: result.toString(2) }
                        )
                    );
                    break;

                case '-hex':
                    msg.channel.send(new Discord.MessageEmbed()
                        .setTitle('Generate Random Number')
                        .setColor(Status.StatusColor('OK'))
                        .addFields(
                            { name: 'Number', value: result.toString(16) }
                        )
                    );
                    break;
            }
        } else {
            msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Generate Random Int')
                .setColor(Status.StatusColor('ERROR'))
                .addFields(
                    { name: 'Bracket Definitions', value: '{Required} [optional]' },
                    { name: 'randnum {min} {max} [-f | -bin | -hex]', value: 'Returns a random number between the given range. Inclusive.' }
                )
                    .setFooter(Status.InvalidCommandMessage())
                );
        }

        return true;
    }
}